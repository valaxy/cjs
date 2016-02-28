> Inspired by [guybedford/cjs](https://github.com/guybedford/cjs)

[![devDependency Status](https://david-dm.org/valaxy/cjs/dev-status.svg?style=flat-square)](https://david-dm.org/valaxy/cjs#info=devDependencies)

Load CommonJS modules without needing to convert them to AMD

# What is the differences about origin repo [guybedford/cjs](https://github.com/guybedford/cjs)
- can transform non-relative require to CommonJS require by configuration
- npm support and npm support only
- qunit test support
- some bugs fix

# Install
```bash
npm install --save github:valaxy/cjs
```

# Usage example
```javascript
// config.js
requirejs.config({
    paths: {
        p1: 'node_modules/a/',
        p2: 'node_modules/b/'
    },
    maps: {
        m1: 'node_modules/a/x',
        m2: 'node_modules/b/y'
    },
    cjs: {
        addSourceMap: true，
        cjsPaths: [
            'p1',
            'm1'
        ]
    }
})

// main.js
require(['cjs!client'])

// client.js
require('./x')
require('p1/m')
require('p2/m')
require('m1')
require('m2')


// client.dest.js
require('cjs!./x')
require('cjs!p1/m')
require('p2/m')
require('cjs!m1')
require('m2')
```
