const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Входной файл
  entry: {
    'main' : './src/js/index.js',
    'menu': './src/js/menu.js',
    'slider' : './src/js/slider.js'
  },

  // Выходной файл
  output: {
    filename: './js/[name].js'
  },

  // Source maps для удобства отладки
  devtool: "source-map",

  module: {
    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },

      // Компилируем SCSS в CSS
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },

      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },

      // Подключаем шрифты из css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=./fonts/[name].[ext]'
          },
        ]
      },

      // Подключаем картинки из css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: 'file-loader?name=./static/[name].[ext]'
          },
        ]
      },
    ],
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
      chunks: ['main'],
    }),

    // Подключаем файл с меню
    new HtmlWebpackPlugin({
      filename: 'menu.html',
      template: './src/menu.html',
      chunks: ['menu'],
    }),

    // Подключаем файл со слайдером
    new HtmlWebpackPlugin({
      filename: 'slider.html',
      template: './src/slider.html',
      chunks: ['slider'],
    }),

    // Кладем стили в отдельный файлик
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    // Копируем картинки
    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: 'img',
      },
      {
        from: './src/files',
        to: 'files',
      }
    ])
  ],
};
