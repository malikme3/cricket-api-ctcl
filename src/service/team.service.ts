import { DbQueriesUtils } from '../utils/db-queries.utils';

export class TeamService {
  constructor() {}
  public async getTeamsList(params?: any): Promise<any> {
    console.log('In service calling getTeamsList functions');
    let response;
    response = await new DbQueriesUtils().getQuery('SELECT * from teams');

    console.log('!!! Response from Service: ', JSON.stringify(response));
    return response;
  }
}
