process.env.NODE_ENV = 'test';

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
        config.set({

            basePath: '',
            port: 9876,
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,
            browsers: ['Chrome'],
            singleRun: false,
            autoWatchBatchDelay: 300,

            frameworks: ['jasmine'],
            reporters: ['progress', 'coverage'],

            // list of files / patterns to load in the browser
            files: [
                //                './src/tests/**/*.js',
                './specs.webpack.js'
            ],

            // list of files to exclude
            plugins: [
                'karma-coverage',
                'karma-webpack',
                'karma-jasmine',
                'karma-chrome-launcher',
                'karma-sourcemap-loader',
                'karma-babel-preprocessor'
            ],
            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                //            '/src/js/**/*.js': ['coverage'],
                '*.js': ['webpack', 'babel', 'source-map']
            },

            coverageReporter: {
                type: 'html',
                dir: 'coverage/',
                subdir: '.',
                instrumenterOptions: {
                    istanbul: {
                        noCompact: true
                    },
                },
                reporters: [{
                    type: 'text-summary'
                }, {
                    type: 'html'
                }, ]
            },

            htmlReporter: {
                outputFile: 'units.html',
                pageTitle: 'Testes Unitários',
                subPageTitle: 'Previsão do Tempo Tests'
            },

            webpack: webpackConfig,

            webpackMiddleware: {
                noInfo: true,
                stats: {
                    colors: true,
                    chunks: false,
                    modules: false,
                    reasons: false
                },
            }

            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter

            //     webpack: {
            //         module: {
            //             entry: [''],
            //             resolve: {
            //                 root: __dirname + './src/tests',
            //                 modulesDirectories: ['node_modules'],
            //             },
            //             output: {
            //                 path: __dirname + './dist/tests',
            //                 filename: 'bundle.aspec.[hash].js',
            //             },
            //             preLoaders: [{
            //                     test: /\.js$/,
            //                     include: [
            //                         __dirname + "/src/tests/", // My tests are under src folder :(
            //                         __dirname + "/src/js/"
            //                     ],
            //                     loader: 'babel'
            //                 },
            //                 // transpile and instrument only testing sources with babel-istanbul
            //                 {
            //                     test: /\.js$/,
            //                     include: __dirname + "/src/tests/",
            //                     loader: 'babel-istanbul',
            //                     query: {
            //                         cacheDirectory: true
            //                             // see below for possible options
            //                     }
            //                 }
            //             ],
            //             postLoaders: [{
            //                 test: /\.js$/,
            //                 exclude: /(node_modules)/,
            //                 loader: 'istanbul-instrumenter'
            //             }]
            //         }
            //     },
            //     concurrency: Infinity
        })

    }
    // },
