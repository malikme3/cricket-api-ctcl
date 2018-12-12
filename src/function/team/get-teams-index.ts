import { APIGatewayProxyHandler } from 'aws-lambda';
import { TeamController } from '../../contorller/team.controller';

export const getTeams: APIGatewayProxyHandler = async (event, context) => {
  let response = await new TeamController().getTeamsList();
  console.log;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: response,
      input: 'event: ' + event,
    }),
  };
};
