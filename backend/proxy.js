/**
 * Reverse proxy using redbird for development.
 */

const redbirdProxy = require('redbird');
const port = 80;
const frontendPort = 8080;
const backendPort = 8081;

const {serverUrl, backendIp, frontendIp} = getEnv();

function getEnv() {
  let serverUrl, backendIp, frontendIp;

  if (process.env.ENV === 'PROD') {
    serverUrl = 'localhost';
    backendIp = 'polls-backend';
    frontendIp = 'polls-frontend';
  } else {
    serverUrl = 'localhost';
    backendIp = 'localhost';
    frontendIp = 'localhost';
  }

  return {serverUrl, backendIp, frontendIp};
}

// for every URL path that starts with /api/, send request to upstream API service
function backendResolver(host, url, req) {
  if (/^\/api\//.test(url)) {
    return `http://${backendIp}:${backendPort}`;
  }
};

// assign high priority
backendResolver.priority = 100;

// uses the same priority as default resolver, so will be called after default resolver
function frontendResolver(host, url, req) {
  if (host.indexOf(serverUrl) > -1) {
    return `http://${frontendIp}:${frontendPort}`;
  }
}

const proxy = new redbirdProxy({
  port: port,
  resolvers: [
    backendResolver,
    frontendResolver
  ]
})