import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/userService";

export class UserController {
  static async login(req: any, res: any) {
    let body = "";
    req.on("data", (chunk: any) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const parsedData = JSON.parse(body);
      const { username, password } = parsedData;
      const user = await UserService.findUserByUsername(username);

      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          { username: user.username, id: user.id },
          process.env.BCRYPT_SECRET!
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(accessToken));
      } else {
        res.send("Username or password incorrect");
      }
    });
  }

  static async register(req: any, res: any) {
    let body = "";
    req.on("data", (chunk: any) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const parsedData = JSON.parse(body);
      const { username, password, email } = parsedData;
      try {
        const newUser = await UserService.createUser(username, password, email);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      } catch (error) {
        res.status(500).send("Error creating user");
      }
    });
  }
}
