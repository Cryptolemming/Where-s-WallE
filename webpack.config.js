var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'eval',
	entry: {
		path: path.join(__dirname, './Components/App'),
		filename: './Components/App/index.js',
	},
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
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ["transform-decorators-legacy"]
				}
			},
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'stage-0'],
					plugins: ["transform-decorators-legacy"]
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