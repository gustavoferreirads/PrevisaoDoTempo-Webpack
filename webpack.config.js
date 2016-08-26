/* Criando minha configuração de WebPack Programaticamente*/

var webpack = require('webpack'); //Importando outros módulos para ajudar na minha Stack
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//Capturando o evento do npm node;
var ENV = process.env.NODE_ENV;

var ehTeste = ENV === 'test' || ENV === 'test-watch';
var ehBuildProducao = ENV === 'build';

//Exportando módulo de configuração para o webpack
module.exports = (function configuracaoDeWebpack() {
    var portaServidor = 8080;
    var configuracao = {};

    //Ponto de partida do webpack
    configuracao.entry = ehTeste ? { /*nao faz nada se for uma execução de testes */ } : {
        app: ['./js/app.js', './css/index.css']
    };

    //Configuracao de publicação do nosso projeto
    configuracao.output = ehTeste ? {} : {
        path: __dirname + '/dist', //Vamos jogar na nossa pasta dist
        filename: ehBuildProducao ? 'previsaoDoTempo.js' : 'previsaoDoTempo.bundle.js', //Nome do nosso arquivo compilado
        //chunkFilename: ehBuildProducao ? 'previsaoDoTempo.js' : 'previsaoDoTempo.bundle.js', //         Não entendi ao certo pra que serve essa propriedade
        publicPath: ehBuildProducao ? '/' : 'http://localhost:' + portaServidor + '/', //Se for uma build de produção vamos publicar no servidor usando o caminho e  a porta:

    };
    /**  Configurações a serem usadas na build, corresponde a forma de mimificar tamanho de arquivo e modos de depuração   */
    if (ehTeste) {
        configuracao.devtool = 'inline-source-map';
    }
    if (ehBuildProducao) {
        configuracao.devtool = 'source-map';
    }

    if (!ehTeste && !ehBuildProducao) {
        configuracao.devtool = 'eval-source-map';
    }
    //Inicializando os módulos  e configurando nossos loaders e preloaders

    /** Initialize module */
    configuracao.module = {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint'
        }],
        loaders: [{
            test: /\.js$/,
            loaders: ['ng-annotate', 'babel'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ehTeste ? 'style!css!sass' : ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]')
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            include: /images/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'html'
        }]
    };

    configuracao.jshint = {
        esversion: 6
    };

    /**
     * ISPARTA LOADER
     * Reference: https://github.com/ColCh/isparta-instrumenter-loader
     * Instrument JS files with Isparta for subsequent code coverage reporting
     * Skips node_modules and files that end with .spec.js and .e2e.js
     */
    if (ehTeste) {
        configuracao.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\tests\.js$/
            ],
            loader: 'istanbul-instrumenter'
        });
    }

    /** Compressing classNames on production */
    if (ehBuildProducao) {
        configuracao.module.loaders[1].loader = ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]');
    }

    // config.postcss = function(bundler) {
    //     return [
    //         require('postcss-import')({
    //             addDependencyTo: bundler
    //         }),
    //         require('postcss-inline-comment')(),
    //         require('postcss-hexrgba'),
    //         require('postcss-size'),
    //         require('precss')(),
    //         require('postcss-functions')({
    //             functions: {}
    //         }),
    //         require('css-mqpacker')(),
    //         require('postcss-discard-comments/dist/index')(),
    //         require('autoprefixer')({
    //             browsers: ['last 2 version']
    //         })
    //     ];
    // };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    configuracao.plugins = [];

    /** Skip rendering index.html in test mode */
    if (!ehTeste) {
        configuracao.plugins.push(

            new ExtractTextPlugin('styles.css', {
                disable: !ehBuildProducao
            })
        );
    }
    ///Especificacoes de build
    if (ehBuildProducao) {
        configuracao.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output.
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                beautify: false,
                compress: {
                    warnings: false,
                },
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            })
        );
    }

    configuracao.devServer = {
        //contentBase: './',
        stats: 'minimal',
        port: portaServidor
    };

    return configuracao;

})();

// Comandos do webpack
// npm install webpack -g
// webpack main.js bundle.js
// depois do bundle webpack
//npm install webpack-dev-server -g
//webpack-dev-server / /cria um server
//
//
// module.exports = {
//     entry: ['./js/app.js', './css/index.css'],
//     output: {
//         filename: 'bundle.js'
//     },
//     devtool: 'source-map',
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'babel',
//             query: {
//                 presets: ['es2015']
//             }
//         }, {
//             test: /\.css$/,
//             exclude: /node_modules/,
//             loader: 'style!css'
//         }, {
//             test: /\.scss$/,
//             exclude: /node_modules/,
//             loader: 'style!css!sass'
//         }, {
//             test: /\.(jpg|png|gif)$/,
//             include: /images/,
//             loader: 'url'
//         }],
//
//     }
// };
