// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

// module.exports = {
//   publicPath: './',
//   // 修改 src 为 examples
//   pages: {
//     index: {
//       entry: 'examples/main.js',
//       template: 'public/index.html',
//       filename: 'index.html'
//     }
//   },
//   // 扩展 webpack 配置，使 packages 加入编译
//   chainWebpack: config => {
//     config.module
//       .rule('js')
//       .include
//       .add('/packages')
//       .end()
//       .use('babel')
//       .loader('babel-loader')
//       .tap(options => {
//         return options
//       })
//   }
// }

const fs = require('fs')
const path = require('path')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}
const join = path.join
function getEntries (path) {
  let files = fs.readdirSync(resolve(path))
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  return entries
}

console.log('packages entry', getEntries('packages'))
// 开发环境配置
const devConfig = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages'),
        'assets': resolve('examples/assets'),
        'views': resolve('examples/views')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}
// 生成环境配置
const buildConfig = {
  css: {
    sourceMap: true,
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: {
      // ...getEntries('packages')
      button: resolve(join('packages/button', 'index.js')),
      icon: resolve(join('packages/icon', 'index.js')),
      input: resolve(join('packages/input', 'index.js')),
      index: resolve(join('packages', 'index.js'))
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  },
  outputDir: 'lib',
  productionSourceMap: false
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig
