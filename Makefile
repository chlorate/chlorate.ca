HUGO=hugo --source site
WEBPACK=node_modules/.bin/webpack
DEPS=node_modules site/static/static styles/retro8.ttf styles/retro16.ttf

.PHONY: build
build: $(DEPS)
	$(WEBPACK)
	$(HUGO)

.PHONY: watch
watch: $(DEPS)
	$(WEBPACK) --watch & $(HUGO) server

.PHONY: clean
clean: 
	rm --recursive --force dist site/data/static.json site/static styles/*.ttf

node_modules: package.json
	npm install
	touch $@

site/static/static:
	mkdir --parents $@

styles/retro8.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro8/master/dist/retro8.ttf > $@

styles/retro16.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro16/master/dist/retro16.ttf > $@
