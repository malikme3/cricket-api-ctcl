import { Mysqldb } from '../events/config';
var mysqlPool = require('mysql');

export class DbQueriesUtils {
  //private static instance: DbQueriesUtils = null;

  private dbPool: any;

  constructor() {
    //DbQueriesUtils.getInstance();
    this.createDbPool();
  }

  // static getInstance() {
  //   DbQueriesUtils.instance = DbQueriesUtils.instance ? DbQueriesUtils.instance : new DbQueriesUtils();
  //   return DbQueriesUtils.instance;
  // }

  private createDbPool(): void {
    if (this.dbPool == null) {
      this.dbPool = mysqlPool.createPool({
        host: Mysqldb.host,
        user: Mysqldb.user,
        password: Mysqldb.password,
        database: Mysqldb.database,
      });
    }
  }

  public getQuery = async (query: string) => {
    console.log('In sqlUtil calling getTeamsList functions');

    return new Promise((resolve: any, reject: any) => {
      try {
        this.dbPool.getConnection(function(err: any, connection: any) {
          // send back in connection failed
          if (err) {
            console.error('Error is mysql connection:' + err);
            reject('Error is mysql connection:' + err);
            return 'Error is mysql connection: ' + err;
          }

          connection.query(query, function(error: any, results: any, fields: any) {
            // And done with the connection.
            connection.release();
            // Handle error after the release.
            if (error) {
              console.error('Error is mysql processing query:' + error);
              reject(error);
              return 'Error is mysql processing query:' + error;
            } else {
              console.log('For mysql query : ' + query + '\n Data: ' + JSON.stringify(results[4]));
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
