import * as sql from "mssql";
import dotenv from "dotenv";
import { dbConfig } from "../config/config";

dotenv.config();

const pool = new sql.ConnectionPool(dbConfig);
// console.log(pool);

const poolConnect = pool.connect();

export async function query(queryString: string): Promise<sql.IResult<any>> {
  await poolConnect;

  try {
    const request = new sql.Request(pool);
    const result = await request.query(queryString);
    return result;
  } catch (error) {
    throw new Error(`Error executing SQL query: ${error}`);
  }
}

export const execute = async (
  procedureName: string,
  params: { [key: string]: any } = {}
) => {
  await poolConnect;

  try {
    const request = new sql.Request(pool);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        request.input(key, params[key]);
      }
    }

    const result = await request.execute(procedureName);
    return result;
  } catch (error) {
    throw new Error(`Error executing stored procedure: ${error}`);
  }
};
