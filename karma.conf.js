// Karma configuration

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.0/ui-bootstrap-tpls.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-mocks.js',
            'src/test/**/*.js'
        ],

        reporters: ['progress', 'coverage'],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '/src/js/**/*.js': ['coverage'],
            '/src/tests/**/*.js': ['webpack']
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: '.',
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                },
            }
        },

        webpack: {
            module: {
                preLoaders: [{
                        test: /\.js$/,
                        exclude: [
                            path.resolve('node_modules/')
                        ],
                        include: [
                            path.resolve(__dirname, "/src/tests/"), // My tests are under src folder :(
                        ],
                        loader: 'babel'
                    },
                    // transpile and instrument only testing sources with babel-istanbul
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, "/src/tests/"),
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true
                                // see below for possible options
                        }
                    }
                ],
                postLoaders: [{
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'istanbul-instrumenter'
                }]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-webpack'
        ],

        htmlReporter: {
            outputFile: 'units.html',
            pageTitle: 'Testes Unitários',
            subPageTitle: 'Previsão do Tempo Tests'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
