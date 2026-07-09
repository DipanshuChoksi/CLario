import { google } from 'googleapis';
import supabase from '../db.module';
import { BaseError } from '../../shared';

export async function fetchNewslettersForUser(userId: string) {
  // 1. Fetch user's Google OAuth tokens from next_auth.accounts
  const { data: account, error } = await supabase
    .schema('next_auth')
    .from('accounts')
    .select('access_token, refresh_token')
    .eq('userId', userId)
    .eq('provider', 'google')
    .single();

  // TODO: When we throw an error here, we should redirect the user to the login page

  if (error || !account) {
    throw new BaseError('Could not find Google account linked to user, or tokens are missing.');
  }

  const { access_token, refresh_token } = account;

  // 2. Initialize Google OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token,
    refresh_token,
  });

  // 3. Initialize Gmail client
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  // 4. Search for emails. For now, let's look in CATEGORY_PROMOTIONS or a specific label
  // TODO: The user should be able to configure the query in the settings.
  const query = 'category:promotions newer_than:1d';

  const listResponse = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults: 10,
  });

  const messages = listResponse.data.messages || [];
  const fetchedEmails = [];

  // 5. Fetch full payload for each message
  for (const message of messages) {
    if (!message.id) continue;
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
      format: 'full', // Fetch full payload
    });

    const payload = msg.data.payload;
    const headers = payload?.headers || [];
    // TODO: Remove any from here and implement an interface for headers
    const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject';
    const from = headers.find((h: any) => h.name === 'From')?.value || 'Unknown Sender';
    const date = headers.find((h: any) => h.name === 'Date')?.value || '';

    // To get HTML/Text body, we'd need to parse the payload parts, but for testing we'll just return metadata
    // HTML parsing will be handled in a separate utility later.

    fetchedEmails.push({
      id: msg.data.id,
      snippet: msg.data.snippet,
      subject,
      from,
      date,
    });
  }

  return fetchedEmails;
}
