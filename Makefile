HUGO=hugo --source site
WEBPACK=node_modules/.bin/webpack

EXTERNAL_FILES=styles/retro8.ttf styles/retro16.ttf

.PHONY: build
build: $(EXTERNAL_FILES) node_modules
	$(WEBPACK) -p
	rm site/static/static/styles.*.js
	$(HUGO)
	minify --recursive --output dist dist

.PHONY: watch
watch: $(EXTERNAL_FILES) site/data/static.json
	$(WEBPACK) -d --watch & $(HUGO) server

.PHONY: clean
clean: 
	rm --recursive --force dist site/data/static.json site/static/static

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules styles/*.ttf

node_modules: package.json
	npm install
	touch $@

site/data/static.json: node_modules styles/retro8.ttf styles/retro16.ttf
	$(WEBPACK) -d

styles/retro8.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro8/master/dist/retro8.ttf > $@

styles/retro16.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro16/master/dist/retro16.ttf > $@
