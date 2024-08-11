import { IncomingMessage, ServerResponse } from 'http';
import { UserController } from '../controllers/userController';

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

   if (method === 'POST' && url!.startsWith('/user/login')) {
      return UserController.login(req, res);
    } else if (method === 'POST' && url === '/user/register') {
      return UserController.register(req, res);
    }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route Not Found' }));
};