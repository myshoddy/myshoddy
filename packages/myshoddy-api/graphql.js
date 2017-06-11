'use strict';

export function main(event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Gogo myshoddy!',
      input: event,
    }),
  };

  callback(null, response);
}