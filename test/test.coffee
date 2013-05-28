assert = require 'assert'
stream = require 'stream'
nock = require 'nock'

vkontakte = require '..'

# Accessing `vkontakte` with user token
describe 'vk = vkontakte(access-token)', ->
	vk = vkontakte 'access-token'
	api = null

	beforeEach ->
		api = nock('https://api.vk.com')
			.filteringPath(/\?.*/, '') # cut off query string, because nock can't handle random query params order

	afterEach ->
		nock.cleanAll()

	it 'returns a function', ->
		assert.equal typeof vk, 'function'

	describe 'vk(method)', ->
		it 'returns a stream', ->
			str = vk 'users.get'
			assert str instanceof stream.Stream

		it 'sends HTTPS request and passes returned json to callback', (done) ->
			api.get('/method/users.get')
				.reply(200, {response: {id: 1}})

			vk 'users.get', {uid: 1}, (err, response) ->
				assert.strictEqual err, null
				assert.deepEqual response, {id: 1}
				api.done()
				done()

		it 'passes error to callback if there is invalid JSON in response', (done) ->
			api.get('/method/users.get')
				.reply(200, 'not_json')

			vk 'users.get', {uid: 1}, (err, response) ->
				assert err instanceof SyntaxError
				assert.strictEqual response, undefined
				api.done()
				done()

# Accessing `vkontakte` as a server app
describe 'vk = vkontakte(clientID, clientSecret)', ->
	vk = vkontakte 'client-id', 'client-secret'
	api = null

	beforeEach ->
		api = nock('http://api.vk.com')
			.filteringPath(/\?.*/, '') # cut off query string, because nock can't handle random query params order

	afterEach ->
		nock.cleanAll()

	it 'returns a function', ->
		assert.equal typeof vk, 'function'

	describe 'vk(method)', ->
		it 'returns a stream', ->
			str = vk 'users.get'
			assert str instanceof stream.Stream

		it 'sends HTTPS request and passes returned json to callback', (done) ->
			api.get('/api.php')
				.reply(200, {response: {id: 1}})

			vk 'users.get', {uid: 1}, (err, response) ->
				assert.strictEqual err, null
				assert.deepEqual response, {id: 1}
				api.done()
				done()

		it 'passes error to callback if there is invalid JSON in response', (done) ->
			api.get('/api.php')
				.reply(200, 'not_json')

			vk 'users.get', {uid: 1}, (err, response) ->
				assert err instanceof SyntaxError
				assert.strictEqual response, undefined
				api.done()
				done()

# Sanity checks
describe 'calling vkontakte() without arguments', ->
	it 'throws TypeError', ->
		assert.throws vkontakte, TypeError
