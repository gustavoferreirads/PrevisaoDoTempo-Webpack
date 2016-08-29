/* Criando minha configuração de WebPack Programaticamente*/
 var settings = require('./settings.js'); // minhas configuração
var webpack = require('webpack'); //Importando outros módulos para ajudar na minha Stack
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


//Exportando módulo de configuração para o webpack
module.exports = (function configuracaoDeWebpack() {
   var ehTeste = process.env.NODE_ENV === 'test'; //Capturando o evento do npm node;
   var ehBuildProducao = process.env.NODE_ENV === 'build';
   var portaServidor = 8080;

  //Ponto de partida do webpack
   var configuracao = {
     entry: ['./src/js/app.js','./src/css/index.css'], // ,'bootstrap-loader' ponto de partida
     resolve: {
        root: __dirname + '/src',
        modulesDirectories: ['node_modules'],
      },
     output: { // saída
       path: __dirname + '/dist',
       filename: 'previsaoDoTempo.bundle.[hash].js', //Nome do nosso arquivo compilado
       //chunkFilename: ehBuildProducao ? 'previsaoDoTempo.js' : 'previsaoDoTempo.bundle.js', //         Não entendi ao certo pra que serve essa propriedade
       publicPath: 'http://localhost:' + portaServidor + '/' }, //Se for uma build de produção vamos publicar no servidor usando o caminho e  a porta:
       module : {  //Inicializando os módulos  e configurando nossos loaders e preloaders
           preLoaders: [{
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'jshint'
           }],
           loaders: [{
               test: /\.js$/,
               loaders: ['ng-annotate', 'babel'],
               include: __dirname + '/src',
               exclude: /node_modules/
           }, {
               test: /\.css$/,
               exclude: /node_modules/,
               //ehTeste ? ['style','css','sass'] :
               loader:  ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]')
           },
           {
             test: /\.scss$/,
             loaders: ['style', 'css'],
           },
            {
               test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
               include: /images/,
               loader: 'file'
           }, {
               test: /\.html$/,
               loader: 'html'
           },
           { test: /bootstrap-sass\/assets\/javascripts\//,
             loader: 'imports',
          }]
       },
       jshint : {
           esversion: 6
       },
       devtool : 'source-map'
   };

   if (ehTeste) {
     console.log('~funcionou a variavel')
       configuracao.module.preLoaders.push({
           test: /\.js$/,
           exclude: [
               /node_modules/,
               /\tests\.js$/
           ],
           loader: 'istanbul-instrumenter'
       });
   }

    /**  Configurações a serem usadas na build, corresponde a forma de mimificar tamanho de arquivo e modos de depuração   */
    if (ehTeste) {
        configuracao.devtool = 'inline-source-map';
    }

    if (!ehTeste && !ehBuildProducao) {
        configuracao.devtool = 'eval-source-map';
    }

    /** Compressing classNames on production */
    if (ehBuildProducao) {
        configuracao.module.loaders[1].loader = ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]');
    }

    configuracao.plugins = [];
    /** Pula a renderização do HTMl em modo de teste'*/

        configuracao.plugins.push(
            new ExtractTextPlugin('styles.css', {
                disable: (!ehTeste && !ehBuildProducao)
            })
        );

    ///Especificacoes de build
    if (ehBuildProducao) {
        configuracao.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(), // Search for equal or similar files and deduplicate them in the output.
            new webpack.optimize.UglifyJsPlugin({comments: false, beautify: false, compress: {warnings: false}}),
            new webpack.ProvidePlugin({ // Definindo nomes para o Jquery
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
