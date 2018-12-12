import { TeamService } from '../service/team.service';

export class TeamController {
  constructor() {}

  public async getTeamsList(paramEvent?: any): Promise<any> {
    console.log('In controller calling getTeamsList functions');
    let response: any;
    try {
      response = await new TeamService().getTeamsList();
    } catch (error) {
      if (error) {
        console.error('Error in TeamController: ', error);
        response = error;
      }
    }
    console.log('Response from controller: ', JSON.stringify(response));
    return response;
  }
}
