import { Mysqldb } from '../events/config';
var mysqlPool = require('mysql');

export class DbQueriesUtils {
  private dbPool: any;

  constructor() {
    this.createDbPool();
  }

  private createDbPool(): void {
    if (this.dbPool == null) {
      this.dbPool = mysqlPool.createPool({
        host: Mysqldb.host,
        port: Mysqldb.port,
        user: Mysqldb.user,
        password: Mysqldb.password,
        database: Mysqldb.database,
      });
    }
  }

  public getQuery = async (query: string) => {

    return new Promise((resolve: any, reject: any) => {
      try {
        this.dbPool.getConnection(function(err: any, connection: any) {
          // send back in connection failed
          if (err) {
            console.error('Error is mysql connection:' + err);
            reject('Error is mysql connection:' + err);
          }

          connection.query(query, function(error: any, results: any, fields: any) {
            // And done with the connection.
            connection.release();
            // Handle error after the release.
            if (error) {
              console.error('Error is mysql processing query:' + error);
              reject(`'Error is mysql processing query: ${error}`);
            } else {
              resolve(results);
            }
          });
        });
      } catch (err) {
        console.log('rr ', err);
        reject('Error in Db Queries: ', err);
      }
    });
  };
}
