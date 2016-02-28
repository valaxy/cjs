// @日志
// - anonymous的sourceMappingURL要用绝对路径，只有console.log打印出来有映射位置

define(['amd-loader'], function (amdLoader) {
	"use strict"

	let defaultSourceMapUrl = function (name) {
		return name
	}

	const cjsRequireRegExp = /[ \t]*require\s*\(\s*["']([^'"\s]+)["'][ \t]*\)/g
	return amdLoader('cjs', 'js', function (name, source, req, callback, errback, config) {
		let cjsConfig = config.cjs || {}
		let cjsPaths = cjsConfig.cjsPaths || []
		let addSourceMap = typeof cjsConfig.addSourceMap != 'boolean' ? false : cjsConfig.addSourceMap
		let sourceMapUrl = cjsConfig.sourceMapUrl || defaultSourceMapUrl

		let getSourceMap = function () {
			if (addSourceMap) {
				return `\n//# sourceMappingURL=${sourceMapUrl(name)}\n`
			} else {
				return ''
			}
		}

		// replace internal relative requires with commonJS requires themselves
		// global requires are replaced depended
		source = source.replace(cjsRequireRegExp, function (match, dep) {
			if (dep[0] == '.') {
				return ` require('cjs!${dep}')`
			} else {
				var slashIndex = dep.indexOf('/')
				var prefix = slashIndex >= 0 ? dep.slice(0, slashIndex) : dep
				if (cjsPaths.indexOf(prefix) >= 0) {
					return ` require('cjs!${dep}') `
				} else {
					return ` require('${dep}')`
				}
			}
		})

		// wrap up in common js wrapper
		var code = `define(function(require, exports, module) {"use strict"; var define=undefined; ${source}\n});${getSourceMap()}`
		callback(code)
	})
})
