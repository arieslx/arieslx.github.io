---
title: 2025年｜webpack复习题
date: 2025-10-31 17:17:59
tags:
  - 2025
---

### 问题1：请解释webpack的核心概念及其作用

```js
// 期待回答包含：
// - Entry: 打包入口起点
// 单入口：entry: './src/index.js'
// 多入口：entry: { app: './src/app.js', admin: './src/admin.js' }
entry: {
    app: './src.app.js',
    admin: './src/admin.js'
}
// - Output: 输出配置,指定打包后文件的存放位置和命名规则
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true //webpack5特有，代替clean-webpack-plugin插件
}
// - Loader: 处理非JS文件转换，将不同类型的文件转换为webpack能够处理的模块
// loader的执行顺序是从右到左，从下到上。
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ]
}
// - Plugin: 执行更广泛的任务（打包优化、资源管理等）
// 作用：自动生成 HTML 文件，并自动注入打包后的 JS/CSS 资源
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: '.src/index.html',
            minify: true //打包优化，压缩html
        })
    ]
}
//将 CSS 从 JS 中提取为独立文件，支持 CSS 代码分割
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}
//压缩优化
module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin(), //js压缩
            new CssMinimizerPlugin() //css压缩
        ]
    }
        
}
//代码分割
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                common: {
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    minSize: 0, //10000 -》 10kb
                    minChunks: 2 //被两个以上的chunks引用才提取
                }
            },
        },
    },
}
//bundle分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
//静态资源管理
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    plugins: [
        new CopyWebpackPlugins({
            patterns: [
                {
                    from: 'public',
                    to: 'assets'
                }
            ]
        })
    ]
}
//环境变量注入
cosnt webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//文本替换
        })
    ]
}
// - Mode: 开发/生产模式
module.exports = {
    mode: 'development',
}
// - Module: 模块系统
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
// - Chunk: 代码块，模块的集合，webpack 内部的中间构建产物
module.exports = {
    optimization: {
        slitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}

// - Bundle: 最终输出文件
module.exports = {
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

### 问题2：Webpack 5 相比 Webpack 4 有哪些重大改进？请举例说明
```js
// 期待回答：
// 1. 模块联邦 (Module Federation)
// 2. 持久化缓存改进
// 3. Tree Shaking 增强
// 4. 资源模块 (Asset Modules)
// 5. 更好的Tree Shaking
// 6. 移除Node.js polyfills

// 编码题：演示Webpack 5的模块联邦配置
// micro-frontend-app/webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      remotes: {
        mfeApp: 'mfeApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};
```
### 问题3：请解释loader的执行顺序和编写自定义loader
```js
// 问题：以下loader的执行顺序是什么？
module: {
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader', 
        'sass-loader'
      ]
    }
  ]
}

// 答案：从右到左，从下到上执行
// sass-loader → css-loader → style-loader

// 编码题：编写一个简单的自定义loader
// my-loader.js
module.exports = function(source) {
  // 实现简单的文本替换
  return source.replace(/console\.log\(.*\);/g, '');
};

// 使用自定义loader
module: {
  rules: [
    {
      test: /\.js$/,
      use: path.resolve(__dirname, 'my-loader.js')
    }
  ]
}
```
### 问题4：请解释webpack插件机制并编写一个简单插件
```js
// 插件编写示例
class MyCleanPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyCleanPlugin', (compilation, callback) => {
      // 清理构建前删除旧文件
      const fs = require('fs');
      const outputPath = compiler.options.output.path;
      
      if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true });
      }
      
      console.log('清理完成');
      callback();
    });
  }
}

// 使用插件
plugins: [
  new MyCleanPlugin()
]
```
### 问题5：如何优化webpack构建性能？请结合具体npm包说明
```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    // Webpack 4 vs Webpack 5 差异点
    minimize: true,
    minimizer: [
      // Webpack 5 推荐使用TerserPlugin
      new TerserPlugin({
        parallel: true,  // 开启多进程
        terserOptions: {
          compress: {
            drop_console: true, // 生产环境移除console
          }
        }
      }),
      new CssMinimizerPlugin(),
    ],
    // 代码分割策略
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        }
      }
    }
  },
  plugins: [
    new SpeedMeasurePlugin(), // 构建速度分析
    new BundleAnalyzerPlugin({ // 包体积分析
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  // Webpack 5 持久化缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
};
```
### 问题6：请解释Tree Shaking原理及如何确保其有效性
```js
// package.json 配置
{
  "sideEffects": false,
  // 或指定有副作用的文件
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}

// webpack.config.js 配置
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // 标记使用到的导出
    minimize: true,    // 压缩时删除未使用代码
    sideEffects: true  // 识别package.json中的sideEffects
  }
};

// 示例：确保ES6模块语法
// utils.js - 可以Tree Shaking
export const util1 = () => console.log('util1');
export const util2 = () => console.log('util2');

// main.js - 只使用util1
import { util1 } from './utils'; // 只有util1被打包
```
### 问题7：请配置一个支持React + TypeScript + styledcss的webpack配置

### 问题8：请解释以下概念并说明其应用场景
```js
// Module Federation: 微前端架构，多个独立构建的应用共享代码
// Host（宿主）：消费远程模块的应用
// Remote（远程）：暴露模块给其他应用使用的应用
// Shared（共享）：在应用间共享的依赖
// 场景1：微前端架构 - 多个团队独立开发
// app1 (产品团队) 暴露产品相关模块
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductList': './src/components/ProductList',
    './ProductDetail': './src/components/ProductDetail'
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true }
  }
});

// app2 (订单团队) 消费产品模块
new ModuleFederationPlugin({
  name: 'app2',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js'
  }
});

// 在app2中使用远程组件
const ProductList = React.lazy(() => import('app1/ProductList'));
// Code Splitting: 代码分割，按需加载
// 1. 动态导入 - 路由级别分割
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './pages/About'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './pages/Contact'));

// 2. 组件级别分割 - 大型组件按需加载
const HeavyComponent = lazy(() => 
  import(/* webpackChunkName: "heavy-component" */ './components/HeavyComponent')
);

// 3. 第三方库分割 - webpack配置
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // React相关库
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react-vendor',
        priority: 40
      },
      // 工具库
      utils: {
        test: /[\\/]node_modules[\\/](lodash|moment|axios)[\\/]/,
        name: 'utils-vendor',
        priority: 30
      },
      // 公共模块
      common: {
        minChunks: 2,
        name: 'common',
        priority: 20,
        reuseExistingChunk: true
      }
    }
  }
}
// Hot Module Replacement: 热模块替换，开发时保持状态
// 在应用程序运行过程中，替换、添加或删除模块，而无需完全重新加载页面。
// webpack.config.js - 开发环境配置
module.exports = {
  devServer: {
    hot: true, // 开启HMR
    liveReload: false, // 禁用全页面刷新
  },
  // 针对不同文件类型的HMR处理
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // 支持CSS HMR
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // React组件热更新
              isDevelopment && 'react-refresh/babel'
            ].filter(Boolean)
          }
        }
      }
    ]
  }
};

// 在代码中处理HMR
if (module.hot) {
  // 接受当前模块的热更新
  module.hot.accept();
  
  // 接受特定依赖的热更新
  module.hot.accept('./dep.js', () => {
    // 依赖更新后的回调
    console.log('依赖已更新');
  });
  
  // React组件热更新
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
// Scope Hoisting: 作用域提升，减少闭包，优化包体积
// webpack.config.js
module.exports = {
  optimization: {
    concatenateModules: true, // 开启Scope Hoisting
    usedExports: true,        // 标记未使用代码
    sideEffects: true         // 识别副作用
  }
};

// package.json - 帮助webpack识别无副作用的模块
{
  "sideEffects": false,
  // 或指定有副作用的文件
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfill.js"
  ]
}
// webpack的构建流程是怎样的？
/**
1. 初始化阶段
   ↓
2. 编译阶段
   ↓
3. 模块构建阶段
   ↓
4. 完成编译阶段
   ↓
5. 输出阶段
**/
// 如何实现按需加载和预加载？

// 如何处理webpack打包时的内存溢出？

// 如何自定义webpack的解析(resolve)规则？
const path = require('path');

module.exports = {
  resolve: {
    // 1. 路径别名 - 简化导入路径
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      // 针对特定包的别名
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    },
    
    // 2. 扩展名解析顺序
    extensions: [
      '.tsx', '.ts',           // TypeScript
      '.jsx', '.js',           // JavaScript  
      '.mjs', '.cjs',          // ES模块和CommonJS
      '.json',                  // JSON文件
      '.css', '.scss', '.sass' // 样式文件
    ],
    
    // 3. 模块解析目录
    modules: [
      path.resolve(__dirname, 'src'),    // 优先从src目录解析
      path.resolve(__dirname, 'node_modules'), // 然后是node_modules
      'node_modules'                     // 最后是全局node_modules
    ],
    
    // 4. package.json主字段解析顺序
    mainFields: [
      'browser',    // 浏览器特定版本
      'module',     // ES6模块版本
      'main'        // CommonJS版本
    ],
    
    // 5. 包的主文件名称
    mainFiles: ['index', 'main'],
    
    // 6. 不跟随符号链接（提升构建性能）
    symlinks: false,
    
    // 7. 缓存解析结果（提升构建性能）
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.resolve-cache')
    }
  },
  
  // 8. 条件性解析配置
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders') // 自定义loader目录
    ]
  }
};

// 使用示例
// 配置前
import Button from '../../../components/Button';
import utils from '../../../../utils/helpers';

// 配置后
import Button from '@components/Button';
import utils from '@utils/helpers';
```