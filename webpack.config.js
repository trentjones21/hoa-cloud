var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
	context: __dirname + "/app",
	entry: {
		javascript: "./components/main.js",
		html: "./index.html",
		vendor: ["jquery","react","react-router"],
	},
	output: {
		filename: "js/app.js",
		path: __dirname + "/public",
	},
	plugins: [
		new ExtractTextPlugin("./css/styles.css"),
		new CommonsChunkPlugin("vendor", "./js/vendor.js"),
	],
	module: {
		loaders: [
			// loader for React JSX
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ['react']
				}
			},
			// loader for HTML
			{
				test: /\.html$/,
				loader: "file?name=[name].[ext]",
			},
			// loader for images
            { 
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
				loader: "file-loader?name=[path][name].[ext]",
				exclude: /node_modules/
			},
			// loaders for Bootstrap CSS
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap") },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=assets/[name].[ext]" },
			{ test: /\.(woff|woff2)$/, loader:"url?name=assets/[name].[ext]&prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=assets/[name].[ext]&limit=10000000&mimetype=image/svg+xml" }
		],
	},
}
