import Connection from "./Connection";
import pgp from "pg-promise";
export default class PgPromiseAdapter implements Connection {
  pgp: any;
  constructor() {
    this.pgp = pgp()("postgres://postgres:postgres@localhost:5432/clean_code");
  }

  /**
   * Execute a database query
   */
  async query(statement: string, params: any) {
    return await this.pgp.query(statement, params);
  }

  /**
   * Close the database connection
   */
  async close() {
    this.pgp.$pool.end();
  }
}
