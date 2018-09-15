"use strict";

/**
 * Lambda@Edge origin request function for rewriting request URLs before they
 * hit S3's static website endpoint.
 *
 * - Allows for directory trailing slash to be dropped for cleaner URLs.
 */
exports.handler = async event => {
  const request = event.Records[0].cf.request;

  // Add missing directory trailing slash: /dir -> /dir/
  request.uri = request.uri.replace(/(\/[^./]+)$/, "$1/");

  return request;
};
