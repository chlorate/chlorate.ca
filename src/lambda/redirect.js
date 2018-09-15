"use strict";

/**
 * Lambda@Edge viewer request function for redirecting requests before they hit
 * CloudFront.
 *
 * - Allows for directory trailing slash to be dropped for cleaner URLs.
 */
exports.handler = async event => {
  const request = event.Records[0].cf.request;

  // Add missing directory trailing slash: /dir -> /dir/
  request.uri = request.uri.replace(/(\/[^./]+)$/, "$1/");

  return request;
};
