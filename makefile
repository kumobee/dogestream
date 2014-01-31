DOC=node_modules/.bin/yuidoc
NODEMON=node_modules/.bin/nodemon
MOCHA=node_modules/.bin/mocha
JADE=node_modules/.bin/jade
SASS=bundle exec sass

PPORT?=1338
DOCSERV=--server $(PPORT)
JS_SOURCE=lib

.PHONY: test preview-docs

install:
	@npm i
	@bundle install

test:
	@$(MOCHA) --reporter spec test/*.js

docs:
	@$(DOC) $(JS_SOURCE)

preview-docs:
	@$(DOC) $(DOCSERV) $(JS_SOURCE)

app:
	@$(NODEMON)

css:
	@$(SASS) --update sass:css

mock-data:
	@NODE_ENV=test node test/mockData.js
