import { Client } from 'pg';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}
