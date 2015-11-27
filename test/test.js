define(function (require) {
	QUnit.module('cjs')

	QUnit.test('config: map', function (assert) {
		assert.equal(require('cjs!test/modules/x'), 'xa')
	})

	QUnit.test('config: paths', function (assert) {
		assert.equal(require('cjs!test/modules/y'), 'yb')
	})

	QUnit.test('relative', function (assert) {
		assert.equal(require('cjs!test/modules/z'), 'zc')
	})
})