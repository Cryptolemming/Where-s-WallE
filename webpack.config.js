var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval',
	entry: './index.js',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'index.js',
	},
	module: {
		loaders: [
			{ 
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['stage-0', 'es2015', 'react']
				}
			},
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['stage-0', 'es2015', 'react']
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
		],
		resolve: {
			extensions: ['', '.js', '.es6', '.jsx']
		},
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	]
};