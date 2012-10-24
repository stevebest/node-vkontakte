# node-vkontakte

VK.com API for Node.

## Usage

Using signed requests.

```javascript
var vkontakte = require('vkontakte');

var vk = vkontakte('CLIENT ID', 'CLIENT SECRET');
vk('users.get', { uid: 1, fields: 'uid,first_name,photo' }, function (err, user) {
  console.log(user);
});
```

Using OAuth access token.

```javascript
var vkontakte = require('vkontakte');

var vk = vkontakte('ACCESS TOKEN');
vk('friends.get', { fields: 'uid,first_name,photo' }, function (err, friends) {
  console.log(friends);
});
```

## Streaming

Results of making the API requests are returned in form of Node streams, and
can be piped and whatnot.

```javascript
vk('friends.get', { /* snip */ }).pipe(process.stdout);
```

## Author

Stepan Stolyarov (stepan.stolyarov@gmail.com)

&copy; 2012

## License

MIT