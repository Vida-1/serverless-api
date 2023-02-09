// code is from lecture recording (2:02:50)

import DynamoDB from "@aws-sdk/client-dynamodb";
import DynamoDBLib from "@aws-sdk/lib-dynamodb";
const { DynamoDBClient } = DynamoDB;
const ddbClient = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = new DynamoDBLib.DynaDBDocumentClient(ddbClient, {
  marshallOptions: {
    removeUndefinedValues: true
    }
  });

export const handler = async (event) => {
  const { book_id } = Number(event.pathParameters);

  const { Item } = await ddbDocClient.send(
    new DynamoDBLib.GetCommand({
      TableName: 'Books',
      Key: {
        book_id
      }
    }));
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(Item),
  };
  return response;
};