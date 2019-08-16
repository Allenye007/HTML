const path = require('path')
const utils = require('./utils')
var ExtractTextPlugin = require("extract-text-webpack-plugin");   //打包css的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');//打包html的插件
module.exports = {
	mode: 'development',
	entry: {
		a: '../src/js/index.js',
		b: '../src/css/index.scss',
		c: '../src/css/index2.css'
	},
	// entry: ['../src/js/index.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.[chunkHash:5].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.scss', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			},
			{
				// this should be /\.handlebars$/
				test: /\.hbs$/,
				exclude: /(node_modules)/,
				loader: 'handlebars-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
}
