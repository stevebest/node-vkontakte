assert = require 'assert'
stream = require 'stream'

vkontakte = require '..'

# Accessing `vkontakte` with user token
describe 'vk = vkontakte(access-token)', ->
	vk = vkontakte 'access-token'

	it 'returns a function', ->
		assert.equal typeof vk, 'function'

	describe 'vk(method)', ->
		it 'returns a stream', ->
			str = vk 'users.get'
			assert str instanceof stream.Stream

# Accessing `vkontakte` as a server app
describe 'vk = vkontakte(clientID, clientSecret)', ->
	vk = vkontakte 'client-id', 'client-secret'

	it 'returns a function', ->
		assert.equal typeof vk, 'function'

	describe 'vk(method)', ->
		it 'returns a stream', ->
			str = vk 'users.get'
			assert str instanceof stream.Stream

# Sanity checks
describe 'calling vkontakte() without arguments', ->
	it 'throws TypeError', ->
		assert.throws vkontakte, TypeError
