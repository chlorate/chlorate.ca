HUGO = hugo --source site
NCU = node_modules/.bin/ncu
S3CMD = s3cmd sync --add-header=Cache-Control:max-age=86400 --cf-invalidate --no-mime-magic --no-preserve --no-progress dist/
WEBPACK = node_modules/.bin/webpack

.PHONY: build
build: node_modules
	$(WEBPACK) -p
	rm site/static/static/styles.*.js
	$(HUGO)
	minify --recursive --output dist dist

.PHONY: watch
watch: site/data/static.json
	DEVELOPMENT=true $(WEBPACK) -d --watch & $(HUGO) server

.PHONY: clean
clean: 
	rm --recursive --force dist site/data/static.json site/static/static

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules

.PHONY: deploy-stage
deploy-stage:
	echo "User-agent: *" > dist/robots.txt
	echo "Disallow: /" >> dist/robots.txt
	$(S3CMD) s3://stage.chlorate.ca

.PHONY: deploy-production
deploy-production:
	$(S3CMD) s3://chlorate.ca

.PHONY: upgrade
upgrade:
	$(NCU) --upgrade

node_modules: package.json
	npm install
	touch $@

site/data/static.json: node_modules
	$(WEBPACK) -d
