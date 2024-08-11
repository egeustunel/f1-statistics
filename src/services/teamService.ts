import { client } from "../database/client";
import { executeQuery, Filter, QueryOptions } from "../utils/queryBuilder";

export class TeamService {
  static async searchTeams(filters: Filter[], limit: number, offset: number) {
    try {
      const options: QueryOptions = {
        table: "constructors",
        filters,
        orderBy: "name ASC",
        limit,
        offset,
      };
      const drivers = await executeQuery(options);
      return drivers;
    } catch (e) {
      console.log(e);
    }
  }

  static async mostWins() {
    const query = `
        SELECT
          c.id,
          c.name AS team_name,
          COUNT(cs.id) AS races_won
        FROM
          constructor_standings cs
        JOIN
          constructors c ON cs.id = c.id
        WHERE
          cs.position = 1
        GROUP BY
          c.id, c.name
        ORDER BY
          races_won DESC;
      `;

    const res = await client.query(query);
    return res.rows;
  }

  static async mostPodiums() {
    const query = `
        SELECT
          c.id,
          c.name AS team_name,
          COUNT(cs.id) AS podiums
        FROM
          constructor_standings cs
        JOIN
          constructors c ON cs.constructor_id = c.id
        WHERE
          cs.position IN ('1', '2', '3')
        GROUP BY
          c.id, c.name
        ORDER BY
          podiums DESC;
      `;

    const res = await client.query(query);
    return res.rows;
  }
}
