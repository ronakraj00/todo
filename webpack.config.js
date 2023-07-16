const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:"development",
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'main.js',
        publicPath: 'pathOrUrlWhenProductionBuild',
    },
    module: {
        rules: [
        ]
    },
    resolve: {
    },
    devtool: 'source-map',
    plugins: [
    ]
};
