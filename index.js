var http  = require('http');
var https = require('https');
var qs    = require('querystring');

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

      https.get(getHttpOptions(method, params), function (res) {
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
      }).on('error', function(e) {
        return callback(e);
      });
    };

    function getHttpOptions(method, params) {
      return {
        host: 'api.vk.com',
        path: '/method/' + method + '?' + qs.stringify(params)
      };
    }
  }

  function byApp(clientID, clientSecret) {
    return function (method, params, callback) {
      callback(new Error('not implemented'));
    }
  }

};
