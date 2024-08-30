import { defineEventHandler, setResponseHeaders } from 'h3';

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
  });

  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.end();
    return;
  }
});
