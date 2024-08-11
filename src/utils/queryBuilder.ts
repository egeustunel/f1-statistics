import { query } from '../database/client';

export interface Filter {
  column: string;
  operator: '=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'ILIKE';
  value: string | number;
}

export interface QueryOptions {
  table: string;
  filters?: Filter[];
  orderBy?: string;
  limit?: number;
  offset?: number;
}

export const buildQuery = ({ table, filters = [], orderBy, limit, offset }: QueryOptions) => {
  let queryString = `SELECT * FROM ${table}`;
  const queryParams: any[] = [];

  if (filters.length > 0) {
    const whereClauses = filters.map((filter, index) => {
      queryParams.push(filter.value);
      return `${filter.column} ${filter.operator} $${index + 1}`;
    });
    queryString += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  if (orderBy) {
    queryString += ` ORDER BY ${orderBy}`;
  }

  if (limit) {
    queryString += ` LIMIT ${limit}`;
  }

  if (offset) {
    queryString += ` OFFSET ${offset}`;
  }

  return { queryString, queryParams };
};

export const executeQuery = async (options: QueryOptions) => {
    try {
        const { queryString, queryParams } = buildQuery(options);
        const { rows } = await query(queryString, queryParams)!;
        return rows;
    } catch (e) {
        console.log(e)
        return e;
    }
};
