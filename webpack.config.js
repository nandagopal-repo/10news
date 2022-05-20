const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          { 
            test: /\.css$/, 
            use: ["style-loader", "css-loader"] 
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : 'src/index.html',
            title: "10news",
        }),
    ],
};