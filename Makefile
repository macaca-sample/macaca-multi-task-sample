git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
	${npm_bin}/macaca install android
	${npm_bin}/macaca doctor
test: install
	${npm_bin}/macaca run --verbose -d ./macaca-test/macaca-mobile-browser-sample.test.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
