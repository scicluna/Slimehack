const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './bundle.js',
        publicPath: '/',
        globalObject: 'this'
    },
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
                test: /\.(png|jpe?g|gif|wav|mp3)$/i, 
                type: 'asset/resource',
                generator: {
                    filename: 'static/assets/[hash][ext][query]'
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            scriptLoading: 'defer'
        }),
        new webpack.ProvidePlugin({
            Phaser: 'phaser',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080
    },
    performance: {
        hints: false
    },
    resolve: {
        alias: {
            phaser: path.join(__dirname, 'node_modules/phaser/dist/phaser.js')
        }
    }
};