
build: components template index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

template:
	@component convert lib/template.html

test:
	open test/index.html

.PHONY: clean test
