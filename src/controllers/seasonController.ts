import { IncomingMessage, ServerResponse } from "http";
import { SeasonService } from "../services/seasonService";
import { Filter } from "../utils/queryBuilder";

export class SeasonController {
  static async searchSeasons(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const limit = Number(url.searchParams.get("limit")) || 10;
      const offset = Number(url.searchParams.get("offset")) || 0;
      const filters: Filter[] = [];

      if (url.searchParams.has("forename")) {
        filters.push({
          column: "forename",
          operator: "ILIKE",
          value: `%${url.searchParams.get("forename")}%`,
        });
      }
      if (url.searchParams.has("surname")) {
        filters.push({
          column: "surname",
          operator: "ILIKE",
          value: `%${url.searchParams.get("surname")}%`,
        });
      }
      if (url.searchParams.has("nationality")) {
        filters.push({
          column: "nationality",
          operator: "=",
          value: url.searchParams.get("nationality")!,
        });
      }
      if (url.searchParams.has("code")) {
        filters.push({
          column: "code",
          operator: "=",
          value: url.searchParams.get("code")!,
        });
      }
      if (url.searchParams.has("driverref")) {
        filters.push({
          column: "driverref",
          operator: "=",
          value: url.searchParams.get("driverref")!,
        });
      }

      const drivers = await SeasonService.searchSeasons(filters, limit, offset);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(drivers));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async mostPodiums(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await SeasonService.mostPodiums();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async mostWins(req: IncomingMessage, res: ServerResponse) {
    try {
      const drivers = await SeasonService.mostWins();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(drivers));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}
