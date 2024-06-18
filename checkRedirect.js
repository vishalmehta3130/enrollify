const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual'
    });

    if (response.status === 301 || response.status === 302) {
      return {
        statusCode: 200,
        body: JSON.stringify({ location: response.headers.get('location') }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ location: null }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
