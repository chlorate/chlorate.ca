HUGO=hugo --source site
WEBPACK=node_modules/.bin/webpack
FONTS=styles/retro8.ttf styles/retro16.ttf

.PHONY: build
build: $(FONTS)

.PHONY: watch
watch: node_modules site/static/static $(FONTS)
	$(WEBPACK) --watch & $(HUGO) server

.PHONY: clean
clean: 
	rm --recursive --force site/data/static.json site/public site/static

node_modules: package.json
	npm install
	touch $@

site/static/static:
	mkdir --parents $@

styles/retro8.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro8/master/dist/retro8.ttf > $@

styles/retro16.ttf:
	curl https://raw.githubusercontent.com/chlorate/retro16/master/dist/retro16.ttf > $@
