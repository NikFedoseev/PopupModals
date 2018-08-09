const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'./src/js/index.js',
		'./src/scss/style.scss',
	],
	output: {
		path: path.join(__dirname,'/dist'),
		filename: './js/bundle.js',
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname,'src/js'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: 'env'
					}
				}
			},
			{
				test: /\.scss$/,
				include: path.resolve(__dirname,'src/scss'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
					})
				
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './css/style.bundle.css',
			allChunks: true,
		}),
		/*new CopyWebpackPlugin([{
	        from: './src/fonts',
	        to: './dist/fonts'
	      },
	      {
	        from: './src/img',
	        to: './dist/img'
	      },
	      {
	        from: './src/assets',
	        to: './dist/assets'
	      },
	    ]),*/
	    new HtmlWebpackPlugin({
            template: './src/index.html'
        })
	]
};