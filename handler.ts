import { APIGatewayProxyHandler } from 'aws-lambda';
import { TeamController } from './src/contorller/team.controller';

export const hello: APIGatewayProxyHandler = async (event, context) => {
  let response = await new TeamController().getTeamsList();
  console.log;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: 'response ' + response,
    }),
  };
};
