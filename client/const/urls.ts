export const API_URLS = {
  BACKEND_BASE_URL: 'http://localhost:8080',

  GMAIL_FETCH: (userId: string) => `http://localhost:8080/api/gmail/fetch?userId=${userId}`,
};
