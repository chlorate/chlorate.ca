HUGO = hugo --source src/site
JASMINE = node_modules/.bin/jasmine
NPM_CHECK = node_modules/.bin/npm-check
PB = node src/pb/main.js
PRETTIER = node_modules/.bin/prettier
S3CMD = s3cmd
TSC = node_modules/.bin/tsc
WEBPACK = node_modules/.bin/webpack

# Cache static files for 30 days.
S3CMD_SYNC_STATIC = $(S3CMD) sync \
	--add-header=Cache-Control:max-age=2592000 \
	--exclude="*" \
	--include="favicon.ico" \
	--include="robots.txt" \
	--include="static/*" \
	--no-mime-magic \
	--no-preserve \
	--no-progress \
	dist/

# Cache pages for 1 day.
S3CMD_SYNC_PAGES = $(S3CMD) sync \
	--add-header=Cache-Control:max-age=86400 \
	--exclude="favicon.ico" \
	--exclude="robots.txt" \
	--exclude="static/*" \
	--no-mime-magic \
	--no-preserve \
	--no-progress \
	dist/

.PHONY: build
build: build-pb build-webpack
	$(HUGO) --minify

.PHONY: build-pb
build-pb: src/pb/main.js
	$(PB) "https://docs.google.com/spreadsheets/d/e/2PACX-1vQh8WejDYgdyaj-yKQ33pt3n5lrvBkWjquQ5AH3DUQBfyZ9wP7B6Ojgs_UdosZktv_iQQK-3T3rce0m/pub?gid=0&single=true&output=csv" src/site/data/speedruns.json

.PHONY: build-webpack
build-webpack: node_modules
	$(WEBPACK) -p
	rm src/site/static/static/styles.*.js

.PHONY: test
test: node_modules
	$(JASMINE) --config=jasmine.json

.PHONY: watch-hugo
watch-hugo: src/site/data/static.json
	$(HUGO) server

.PHONY: watch-webpack
watch-webpack: node_modules
	$(WEBPACK) -d --watch

.PHONY: format
format: node_modules
	$(PRETTIER) --write {*,.circleci/**/*,src/**/*}.{js,json,md,scss,ts,yml}

.PHONY: clean
clean: 
	-rm src/site/data/static.json src/pb/*.js
	-rm --recursive dist src/site/static/static

.PHONY: clean-deps
clean-deps:
	-rm --recursive node_modules

.PHONY: deploy-stage
deploy-stage:
	echo "User-agent: *" > dist/robots.txt
	echo "Disallow: /" >> dist/robots.txt
	$(S3CMD_SYNC_STATIC) s3://stage.chlorate.ca
	$(S3CMD_SYNC_PAGES) s3://stage.chlorate.ca

.PHONY: deploy-production
deploy-production:
	$(S3CMD_SYNC_STATIC) s3://chlorate.ca
	$(S3CMD_SYNC_PAGES) s3://chlorate.ca

.PHONY: upgrade
upgrade:
	$(NPM_CHECK) --update --save-exact

node_modules: package.json
	npm install
	touch $@

src/site/data/static.json: node_modules
	$(WEBPACK) -d

src/pb/main.js: node_modules src/tsconfig.json $(wildcard src/pb/*.ts)
	$(TSC) --project src
