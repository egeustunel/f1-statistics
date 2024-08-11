import { createServer, IncomingMessage, ServerResponse } from 'http';
import { driverRoutes } from './routes/driverRoutes';
import { teamRoutes } from './routes/teamRoutes';
import { seasonRoutes } from './routes/seasonRoutes';
import { userRoutes } from './routes/userRoutes';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/drivers')) {
    driverRoutes(req, res);
  }
  if (req.url?.startsWith('/seasons')) {
    seasonRoutes(req, res);
  }
  if (req.url?.startsWith('/teams')) {
    teamRoutes(req, res);
  }
  if (req.url?.startsWith('/user')) {
    userRoutes(req, res);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});