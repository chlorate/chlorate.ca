"use strict";

const appRoutes = [
  /^(\/input-display\/)(?:config|controller|help)\/?$/,
  /^(\/input-display\/)config\/(?:advanced|appearance|controller|controls)\/?$/,
  /^(\/input-display\/)config\/controls\/(?:\d+|new)\/?$/
];

/**
 * Lambda@Edge origin request function for rewriting request URLs before they
 * hit S3's static website endpoint.
 */
exports.handler = async event => {
  const request = event.Records[0].cf.request;

  // Single-page app routing: rewrite routes to the app root directory.
  appRoutes.forEach(route => {
    request.uri = request.uri.replace(route, "$1");
  });

  // Add missing directory trailing slash: /dir -> /dir/
  request.uri = request.uri.replace(/(\/[^./]+)$/, "$1/");

  return request;
};
