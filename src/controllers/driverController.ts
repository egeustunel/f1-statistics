import { IncomingMessage, ServerResponse } from 'http';
import { DriverService } from '../services/driverService';
import { parse } from 'url';
import { Filter } from '../utils/queryBuilder';
import { client } from "../database/client";


export class DriverController {
  static async searchDrivers(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const limit = Number(url.searchParams.get('limit')) || 10;
      const offset = Number(url.searchParams.get('offset')) || 0;
      const filters: Filter[] = [];

    if (url.searchParams.has('forename')) {
      filters.push({ column: 'forename', operator: 'ILIKE', value: `%${url.searchParams.get('forename')}%` });
    }
    if (url.searchParams.has('surname')) {
      filters.push({ column: 'surname', operator: 'ILIKE', value: `%${url.searchParams.get('surname')}%` });
    }
    if (url.searchParams.has('nationality')) {
      filters.push({ column: 'nationality', operator: '=', value: url.searchParams.get('nationality')! });
    }
    if (url.searchParams.has('code')) {
      filters.push({ column: 'code', operator: '=', value: url.searchParams.get('code')! });
    }
    if (url.searchParams.has('driverref')) {
      filters.push({ column: 'driverref', operator: '=', value: url.searchParams.get('driverref')! });
    }
      const drivers = await DriverService.searchDrivers(filters, limit, offset);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(drivers));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async mostWins(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await DriverService.mostWins();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  static async podiumCounts(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await DriverService.podiumCounts();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  static async dnfCounts(req: IncomingMessage, res: ServerResponse) {
    try {
      const stats = await DriverService.dnfCounts();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }
}