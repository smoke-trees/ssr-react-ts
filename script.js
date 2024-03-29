const webpack = require('webpack')

const webpackConfig = require('./webpack.config')
// const babelServerConfig = require('./.babelrc.server.json')
const nodemon = require('nodemon')

webpackConfig[0].mode = 'development'

console.log(
  '\x1b[38;2;31;240;255mMade By SmokeTrees with \x1b[38;2;250;33;33m%s\x1b[0m\n\n',
  '❤'
)
console.log('\x1b[38;2;31;240;255mAuthors:\x1b[0m')
console.log(
  '\x1b[38;2;31;240;255mAnshuman Chhapolia \thttps://github.com/achhapolia10 \x1b[0m\n\n'
)


nodemon({
  ext: 'css,js,jsx,ejs,cjs,ts,json,mjs,tsx,ts',
  exec: 'babel-node --config-file ./.babelrc.server.json -x ".tsx,.ts"',
  delay: '500ms',
  script: './src/server.ts',
  watch: './src',
  ignore: ['./src/static', './src/pages', './src/components', './src/entrypoints', './src/utils']
})

