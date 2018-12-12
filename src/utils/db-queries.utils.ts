import { Mysqldb } from '../events/config';
var mysqlPool = require('mysql');

export class DbQueriesUtils {
  private dbPool: any;

  constructor() {
    this.dbPool = mysqlPool.createPool({
      host: Mysqldb.host,
      user: Mysqldb.user,
      password: Mysqldb.password,
      database: Mysqldb.database,
    });
  }

  public getQuery = async (query: string) => {
    console.log('In sqlUtil calling getTeamsList functions');

    return new Promise((resolve: any, reject: any) => {
      try {
        this.dbPool.getConnection(function(err: any, connection: any) {
          // send back in connection failed
          if (err) {
            console.log({ code: 100, status: 'Error in connection database' });
            reject({ code: 100, status: 'Error in connection database' });
          }

          connection.query(query, function(error: any, results: any, fields: any) {
            // And done with the connection.
            connection.release();
            // Handle error after the release.
            if (error) {
              reject(error);
            } else {
              console.log('Data from Database : ' + JSON.stringify(results[4]));
              resolve(results[5]);
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
