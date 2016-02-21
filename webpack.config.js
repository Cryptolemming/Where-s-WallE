var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval',
	entry: './index.js',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'build.js',
	},
	resolve: {
		extensions: ['', '.js', '.es6', '.jsx']
	},
	module: {
		loaders: [
			{ 
				test: /\.js?$/,
				loader: ['babel'],
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	]
};