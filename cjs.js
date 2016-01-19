define(['amd-loader'], function (amdLoader) {
	var cjsRequireRegExp = /[ \t]*require\s*\(\s*["']([^'"\s]+)["'][ \t]*\)/g
	return amdLoader('cjs', 'js', function (name, source, req, callback, errback, config) {
		// replace internal relative requires with commonJS requires themselves
		// global requires are replaced depended
		source = source.replace(cjsRequireRegExp, function (match, dep) {
			if (dep.substr(0, 1) == '.') {
				return " require('cjs!" + dep + "')"
			} else {
				var cjsConfig = config.cjs || []
				var slashIndex = dep.indexOf('/')
				var prefix = slashIndex >= 0 ? dep.slice(0, slashIndex) : dep
				if (cjsConfig.indexOf(prefix) >= 0)
					return ' require(\'cjs!' + dep + '\')'
				else
					return ' require(\'' + dep + '\')'
			}
		})
		// wrap up in common js wrapper
		callback('"use strict"\ndefine(function(require, exports, module) { (function(){var define=undefined;' + source + ' \n//# sourceURL=' + req.toUrl(name) + '\n})() });')
	})
})
