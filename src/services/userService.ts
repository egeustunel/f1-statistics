import { client } from "../database/client";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export class UserService {
    static async createUser(username: string, password: string, email: string): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *',
        [email, username, hashedPassword]
      );
      console.log(result)
      return result.rows[0];
    }
  
    static async findUserByUsername(username: string): Promise<User | null> {
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      return result.rows[0] || null;
    }
  }