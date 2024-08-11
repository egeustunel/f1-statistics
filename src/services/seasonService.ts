import { client } from "../database/client";
import { executeQuery, Filter, QueryOptions } from "../utils/queryBuilder";

export class SeasonService {
  static async searchSeasons(filters: Filter[], limit: number, offset: number) {
    try {
      const options: QueryOptions = {
        table: "seasons",
        filters,
        orderBy: "year ASC",
        limit,
        offset,
      };
      const seasons = await executeQuery(options);
      return seasons;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async mostPodiums() {
    const res = await client.query(`
      SELECT
        d.forename || ' ' || d.surname AS driver_name,
        r.year,
        COUNT(*) AS podiums
      FROM
        results res
      JOIN
        drivers d ON res.driver_id = d.id
      JOIN
        races r ON res.race_id = r.id
      WHERE
        res.position IN ('1', '2', '3')
      GROUP BY
        d.id, r.year, d.forename, d.surname
      HAVING
        COUNT(*) = (
          SELECT MAX(podium_count)
          FROM (
            SELECT COUNT(*) AS podium_count
            FROM results res2
            JOIN races r2 ON res2.race_id = r2.id
            WHERE r2.year = r.year AND res2.position IN ('1', '2', '3')
            GROUP BY res2.driver_id
          ) AS podiums_per_year
        )
      ORDER BY
        r.year, podiums DESC
    `);
    return res.rows;
  }

  static async mostWins() {
    const query = `
      SELECT DISTINCT ON (r.year)
        r.year,
        d.forename || ' ' || d.surname AS driver_name,
        COUNT(*) OVER (PARTITION BY r.year, d.id) AS wins
      FROM
        results res
      JOIN
        drivers d ON res.driver_id = d.id
      JOIN
        races r ON res.race_id = r.id
      WHERE
        res.position = '1'
      ORDER BY
        r.year, wins DESC;
    `;
  
    const res = await client.query(query);
    return res.rows;
  }
}
