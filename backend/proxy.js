/**
 * Reverse proxy using redbird for development.
 */

const redbirdProxy = require('redbird');
const port = 80;
const frontendPort = 8080;
const backendPort = 8081;
const serverUrl = 'localhost';

// for every URL path that starts with /api/, send request to upstream API service
function backendResolver(host, url, req) {
  if (/^\/api\//.test(url)) {
    return `http://127.0.0.1:${backendPort}`;
  }
};

// assign high priority
backendResolver.priority = 100;

// uses the same priority as default resolver, so will be called after default resolver
function frontendResolver(host, url, req) {
  if (host.indexOf(serverUrl) > -1) {
    return `http://127.0.0.1:${frontendPort}`;
  }
}

const proxy = new redbirdProxy({
  port: port,
  resolvers: [
    backendResolver,
    frontendResolver
  ]
})