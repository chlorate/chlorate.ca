HUGO=hugo --source site
NCU=node_modules/.bin/ncu
WEBPACK=node_modules/.bin/webpack

.PHONY: build
build: node_modules
	$(WEBPACK) -p
	rm site/static/static/styles.*.js
	$(HUGO)
	minify --recursive --output dist dist

.PHONY: watch
watch: site/data/static.json
	$(WEBPACK) -d --watch & $(HUGO) server & wait

.PHONY: clean
clean: 
	rm --recursive --force dist site/data/static.json site/static/static

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules

.PHONY: upgrade
upgrade:
	$(NCU) --upgrade

node_modules: package.json
	npm install
	touch $@

site/data/static.json: node_modules
	$(WEBPACK) -d
