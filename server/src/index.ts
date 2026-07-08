import http from 'http';
import { applicationModule } from './modules';
import { getEnvVariable } from './env';
import { BaseError } from './shared';

export const startServer = async () => {
  const PORT: number = Number(getEnvVariable('PORT') ?? '');
  if (!PORT) {
    throw new BaseError('Port not specified, create variable PORT in .env (see .env.example)');
  }


  const app = applicationModule();
  const server = http.createServer(app);


  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });
};

startServer();
