import { Router } from 'express';
import { fetchNewslettersForUser } from './fetch';
import { BaseError } from '../../shared';

export const gmailRouter = Router();

// Test endpoint to trigger a fetch for a specific user ID
gmailRouter.get('/fetch', async (req, res, next) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      throw new BaseError('Missing userId query parameter', 400);
    }

    const emails = await fetchNewslettersForUser(userId);
    res.json({ success: true, count: emails.length, emails });
  } catch (error) {
    next(error);
  }
});
