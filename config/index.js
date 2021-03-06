import path from "path";

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  projectName: 'taro-miniprogram-template@3.0.5',
  date: '2020-8-14',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  sass: {
    resource: path.resolve(__dirname, '..', 'src/assets/style/mixins.scss')
  },
  plugins: [],
  defineConstants: {
  },
  alias: {
    '@': resolve('src')
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    webpackChain(chain, webpack) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('linaria/loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production',
        })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  // 注入自定义变量
  const injectConfig = {
    env: {
      CONFIG_ENV: '"production"' // 注入的环境变量 默认生产环境 默认值不可更改
    }
  }

  process.argv.forEach((el) => {
    if (el.indexOf('CONFIG_ENV=') > -1) {
      injectConfig.env.CONFIG_ENV = `'${el.split('=')[1]}'`
      return false;
    }
  })

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'), injectConfig)
  }
  return merge({}, config, require('./prod'), injectConfig)
}
