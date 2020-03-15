const path = require('path')
module.exports = {
    entry: './src/app.js',
    output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js/,  //use REGEX to point to all the .js files
            exclude: /node_modules/,  
            //use REGEX to exclude the files in node_modules
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"] //normally use 'env'
                }
            }
        }]
    },
    devtool: 'source-map'
}