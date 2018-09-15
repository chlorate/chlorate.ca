HUGO = hugo --source src/site
JASMINE = node_modules/.bin/jasmine
NCU = node_modules/.bin/ncu
PRETTIER = node_modules/.bin/prettier
S3CMD = s3cmd
WEBPACK = node_modules/.bin/webpack

S3CMD_SYNC_ARGS = sync \
	--add-header=Cache-Control:max-age=86400 \
	--cf-invalidate \
	--no-mime-magic \
	--no-preserve \
	--no-progress \
	dist/

.PHONY: build
build: node_modules
	$(WEBPACK) -p
	rm src/site/static/static/styles.*.js
	$(HUGO) --minify

.PHONY: test
test: node_modules
	$(JASMINE) --config=jasmine.json

.PHONY: watch
watch: src/site/data/static.json
	DEVELOPMENT=true $(WEBPACK) -d --watch & $(HUGO) server

.PHONY: format
format: node_modules
	$(PRETTIER) --write {*,.circleci/**/*,src/**/*}.{js,json,md,scss,yml}

.PHONY: clean
clean: 
	rm --recursive --force dist src/site/data/static.json src/site/static/static

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules

.PHONY: deploy-stage
deploy-stage:
	echo "User-agent: *" > dist/robots.txt
	echo "Disallow: /" >> dist/robots.txt
	$(S3CMD) $(S3CMD_SYNC_ARGS) s3://stage.chlorate.ca

.PHONY: deploy-production
deploy-production:
	$(S3CMD) $(S3CMD_SYNC_ARGS) s3://chlorate.ca

.PHONY: upgrade
upgrade:
	$(NCU) --upgrade

node_modules: package.json
	npm install
	touch $@

src/site/data/static.json: node_modules
	$(WEBPACK) -d
