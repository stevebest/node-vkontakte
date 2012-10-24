MOCHA = ./node_modules/.bin/mocha

test:
	@${MOCHA} --compilers coffee:coffee-script

.PHONY: test
