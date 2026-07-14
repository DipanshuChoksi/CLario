import { google } from 'googleapis';
import supabase from '../db.module';
import { BaseError } from '../../shared';
import { cleanHtml } from '../../utils';

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

    // Extract and decode body
    //  TODO: Remove any from here and implement an interface for headers
    let rawBody = '';
    const extractBody = (part: any) => {
      if (part.parts) {
        for (const p of part.parts) {
          extractBody(p);
        }
      } else {
        if (part.mimeType === 'text/html') {
          rawBody = part.body?.data || '';
        } else if (part.mimeType === 'text/plain' && !rawBody) {
          rawBody = part.body?.data || '';
        }
      }
    };

    if (payload?.parts) {
      extractBody(payload);
    } else if (payload?.body?.data) {
      rawBody = payload.body.data;
    }

    const decodedStr = rawBody ? Buffer.from(rawBody, 'base64').toString('utf-8') : '';
    // Clean HTML to Markdown using Turndown
    const cleanedBody = decodedStr ? cleanHtml(decodedStr) : msg.data.snippet;

    fetchedEmails.push({
      id: msg.data.id,
      snippet: msg.data.snippet,
      subject,
      from,
      date,
      body: cleanedBody,
    });
  }

  return fetchedEmails;
}
