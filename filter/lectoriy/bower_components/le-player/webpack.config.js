'use strict';

const path = require('path');

module.exports = {
    entry: './source/js/le-player.es6.js',

    output: {
        path: path.join(__dirname, 'dist', 'js'),
        filename: 'le-player.js',
    },

    module: {
        loaders: [
            {
                test: /(\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components|jquery)/,
                include: path.join(__dirname, 'source', 'js'),
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
          // For libs from node_modules or bower_components
          //'jquery': 'jquery/dist/jquery.min'
        }
    },
    externals: {
        jquery: "$"
    },
};


