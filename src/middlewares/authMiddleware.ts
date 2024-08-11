import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from "http";


export function authenticateToken(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.writeHead(401, { 'Content-Type': 'text/plain' }).end('Unauthorized');

    jwt.verify(token, process.env.BCRYPT_SECRET!, (err: any, user: any) => {
      if (err) return res.writeHead(403, { 'Content-Type': 'text/plain' }).end('Forbidden');
      (req as any).user = user;
      next();
    });
  }
  
