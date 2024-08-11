import { IncomingMessage, ServerResponse } from "http";
import { TeamService } from "../services/teamService";
import { Filter } from "../utils/queryBuilder";

export class TeamController {
  static async searchTeams(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const limit = Number(url.searchParams.get("limit")) || 10;
      const offset = Number(url.searchParams.get("offset")) || 0;
      const filters: Filter[] = [];

      if (url.searchParams.has("name")) {
        filters.push({
          column: "name",
          operator: "ILIKE",
          value: `%${url.searchParams.get("name")}%`,
        });
      }
      if (url.searchParams.has("nationality")) {
        filters.push({
          column: "nationality",
          operator: "=",
          value: url.searchParams.get("nationality")!,
        });
      }

      const teams = await TeamService.searchTeams(filters, limit, offset);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(teams));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async mostWins(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await TeamService.mostWins();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async mostPodiums(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await TeamService.mostPodiums();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
