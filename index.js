var http   = require('http');
var https  = require('https');
var qs     = require('querystring');
var crypto = require('crypto');

module.exports = function vkontakte(clientID, clientSecret) {

  if (typeof clientSecret === 'undefined') {
    var accessToken = clientID;
    return byToken(accessToken);
  } else {
    return byApp(clientID, clientSecret);
  }

  function byToken(accessToken) {

    // vk(method, [params,] callback)
    return function vk(method, params, callback) {
      if (typeof params == 'function') {
        callback = params;
        params = {};
      }

      params.access_token = accessToken;

      var options = {
        host: 'api.vk.com',
        path: '/method/' + method + '?' + qs.stringify(params)
      };

      doRequest(https, options, callback);
    };
  }

  function byApp(clientID, clientSecret) {

    // signedRequest(method, [params, [httpMethod = 'GET',]] callback)
    return function signedRequest() {
      var _ref, _ref1;
      var method = arguments[0],
          options = 2 <= arguments.length ? [].slice.call(arguments, 1) : [],
          callback = options.pop(),
          params = (_ref = options.shift()) != null ? _ref : {},
          httpMethod = (_ref1 = options.shift()) != null ? _ref1 : 'GET';

      params.v = '3.0';
      params.format = 'json';
      params.api_id = clientID;
      params.method = method;
      params.sig = sign(params, clientSecret);

      var options = {
        method: httpMethod,
        host: 'api.vk.com',
        path: '/api.php?' + qs.stringify(params)
      };

      doRequest(http, options, callback);
    };

    function sign(params, clientSecret) {
      // Compute the signature as MD5 of request parameters joined together
      // with a secret key, as described in VK API documentation.

      var keys = Object.keys(params).sort();

      var md5sum = crypto.createHash('md5');
      for (var i = 0; i < keys.length; i++) {
        md5sum.update('' + keys[i] + '=' + params[keys[i]]);
      }
      md5sum.update(clientSecret);

      // Return a signature as a hex string of a MD5 hash.
      return md5sum.digest('hex');
    }

  }

  function doRequest(httpClient, options, callback) {
    var req = httpClient.request(options, function (res) {
      var responseData = '';
      res.on('data', function (data) {
        responseData += data.toString();
      });

      res.on('end', function() {
        try {
          var result = JSON.parse(responseData);

          if (result.error) {
            return callback(result.error);
          }

          return callback(null, result.response);
        } catch (e) {
          return callback(e);
        }
      });
    });

    req.on('error', function(e) {
      return callback(e);
    });
    req.end();
  }

};
