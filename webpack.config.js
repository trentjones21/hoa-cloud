var path = require('path');

module.exports = {  
	entry: path.resolve(__dirname, 'app/js/app.jsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel']
		}]
	},

};