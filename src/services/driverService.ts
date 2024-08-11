import { client } from '../database/client';
import { executeQuery, Filter, QueryOptions } from '../utils/queryBuilder';

export class DriverService {
  static async searchDrivers(filters: Filter[], limit: number, offset: number) {
    try {
      const options: QueryOptions = {
        table: 'drivers',
        filters,
        orderBy: 'surname ASC',
        limit,
        offset,
      };
      const drivers = await executeQuery(options)
      return drivers;
    } catch (e) {
      console.log(e)
    }
  }

  static async mostWins() {
    const res = await client.query(`
     SELECT
        d.id,
        d.forename || ' ' || d.surname AS driver_name,
        COUNT(r.id) AS races_won
      FROM
        results r
      JOIN
        drivers d ON r.driver_id = d.id
      WHERE
        r.position_order = '1'
      GROUP BY
        d.id, d.forename, d.surname
      ORDER BY
        races_won DESC;
    `);
    return res.rows;
  }

  static async podiumCounts() {
    const res = await client.query(`
      SELECT
        d.id,
        d.forename || ' ' || d.surname AS driver_name,
        COUNT(r.id) AS podiums
      FROM
        results r
      JOIN
        drivers d ON r.driver_id = d.id
      WHERE
        r.position_order IN ('1', '2', '3')
      GROUP BY
        d.id, d.forename, d.surname
      ORDER BY
        podiums DESC;
    `);
    return res.rows;
  }

  static async dnfCounts() {
    const res = await client.query(`
      SELECT
        d.id,
        d.forename || ' ' || d.surname AS driver_name,
        COUNT(r.id) AS races_not_finished
      FROM
        results r
      JOIN
        drivers d ON r.driver_id = d.id
      WHERE
        r.position IS NULL
      GROUP BY
        d.id, d.forename, d.surname
      ORDER BY
        races_not_finished DESC;
    `);
    return res.rows;
  }
}