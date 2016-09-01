/* Criando minha configuração de WebPack Programaticamente*/
var settings = require('./settings.js'); // minhas configuração
var webpack = require('webpack'); //Importando outros módulos para ajudar na minha Stack
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//Exportando módulo de configuração para o webpack
module.exports = (function configuracaoDeWebpack() {
    var ehTeste = process.env.NODE_ENV === 'test'; //Capturando o evento do npm node;
    var ehBuildProducao = process.env.NODE_ENV === 'build';
    var bootstrapEntryPoint = !ehBuildProducao ? 'bootstrap-loader' : 'bootstrap-loader/extractStyles';
    var portaServidor = 8080;

    //Ponto de partida do webpack
    var configuracao = {
        entry: ['font-awesome-loader', bootstrapEntryPoint, './src/js/app.js', './src/css/index.css'], // ,'bootstrap-loader' ponto de partida, './src/css/index.css'
        resolve: {
            root: __dirname + '/src',
            modulesDirectories: ['node_modules']
        },
        output: { // saída
            path: __dirname + '/dist',
            filename: 'previsaoDoTempo.bundle.[hash].js', //Nome do nosso arquivo compilado
        }, //Se for uma build de produção vamos publicar no servidor usando o caminho e  a porta:
        module: { //Inicializando os módulos  e configurando nossos loaders e preloaders
            preLoaders: [],
            loaders: [{
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel'],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                include: /images/,
                loader: 'file'
            }, {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000',
            }, {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file',
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports',
            }]
        },
        jshint: {
            esversion: 6
        },
        devtool: 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                AP_ANGULAR_DEFAULT_DEBOUNCE: settings.AP_ANGULAR_DEFAULT_DEBOUNCE,
                AP_ANGULAR_DEFAULT_BLUR: settings.AP_ANGULAR_DEFAULT_BLUR,
            }),
        ]
    };


    if (ehBuildProducao) {
        configuracao.module.loaders.push({
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style',
                loader: 'css!sass',
            })
        });

        configuracao.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                beautify: false,
                compress: {
                    warnings: false
                }
            }), new ExtractTextPlugin('styles.css'));

    } else {
        // configuracao.module.preLoaders.push({
        //     test: /\.js$/,
        //     exclude: [
        //         /node_modules/,
        //         /\tests\.js$/
        //     ],
        //     loader: 'istanbul-instrumenter'
        // });

        configuracao.module.loaders.push({
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        });

        configuracao.entry.unshift('webpack-dev-server/client?http://localhost:' + portaServidor + '/', 'webpack/hot/dev-server'); //
        configuracao.plugins.push(new webpack.HotModuleReplacementPlugin(),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/'
            }, {
                reload: false,
            })
        );

        configuracao.devServer = {
            hot: true,
            stats: 'minimal',
            publicPath: 'http://localhost:' + portaServidor + '/',
            contentBase: '/dist/',
            stats: {
                colors: true,
            }
        };
    };

    /**  Configurações a serem usadas na build, corresponde a forma de mimificar tamanho de arquivo e modos de depuração   */
    if (ehTeste && !ehBuildProducao) {
        configuracao.devtool = 'inline-source-map';
    } else {
        configuracao.devtool = 'eval-source-map';
    }

    ///Especificacoes de build

    return configuracao;

})();

// Comandos do webpack
// npm install webpack -g
// webpack main.js bundle.js
// depois do bundle webpack
//npm install webpack-dev-server -g
//webpack-dev-server / /cria um server
