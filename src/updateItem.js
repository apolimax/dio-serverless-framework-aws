"use strict";

const AWS = require("aws-sdk");

const fetchItem = async (event) => {
  const { id } = event.pathParameters;
  const { itemStatus } = JSON.parse(event.body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  try {
    await dynamoDB
      .update({
        TableName: "ItemTableNew",
        Key: { id },
        UpdateExpression: "set itemStatus = :itemStatus",
        ExpressionAttributeValues: {
          ":itemStatus": itemStatus,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "updated successfully",
    }),
  };
};

module.exports = {
  handler: fetchItem,
};
