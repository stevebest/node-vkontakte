var fs = require('fs');
var http = require('http');
var vkontakte = require('../..');

function returnUserProfile(access_token, res) {
  var vk = vkontakte(access_token);
  vk('users.get').pipe(res);
}

var server = http.createServer(function (req, res) {
  var url = require('url').parse(req.url, true);

  if (url.pathname == '/me') {
    return returnUserProfile(url.query.access_token, res);
  }

  res.writeHead(200, 'text/html');
  fs.createReadStream(__dirname +'/index.html').pipe(res);
});
server.listen(8080);
