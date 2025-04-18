// import awsServerlessExpress from "aws-serverless-express";
// import app from "./app.mjs"

// /**
//  * @type {import('http').Server}
//  */
// const server = awsServerlessExpress.createServer(app);

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = (event, context) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
// };

import awsServerlessExpress from "aws-serverless-express";
import app from "./app.mjs";

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};

// Export the handler as an ES module export
export { handler };
