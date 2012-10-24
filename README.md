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

## Author

Stepan Stolyarov (stepan.stolyarov@gmail.com)

&copy; 2012

## License

MIT