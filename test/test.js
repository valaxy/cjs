define(function (require) {
	QUnit.module('cjs')

	QUnit.test('config: map', function (assert) {
		assert.equal(require('cjs!test/modules/x'), 'xa')
	})

	QUnit.test('config: cjsPaths', function (assert) {
		assert.equal(require('cjs!test/modules/y'), 'yb')
	})

	QUnit.test('relative', function (assert) {
		assert.equal(require('cjs!test/modules/z'), 'zc')
	})

	QUnit.test('inline-require', function (assert) {
		assert.deepEqual(require('cjs!test/modules/inline-require/index'), {
			data: 'index'
		})
	})

	var error = require('cjs!./modules/run-error').default
	error()
	//require('cjs!./modules/load-error')
})