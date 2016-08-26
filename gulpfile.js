// instanciando módulos
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var babel = require("gulp-babel");
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var open = require('gulp-open');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); // requires browserify and vinyl-source-stream

var files = '*/**/*.js';


//
// var browserified = function() {
//     var b = browserify({
//         insertGlobals: true,
//         debug: !gulp.env.production
//     });
//     b.plugin('tsify', {
//         noImplicitAny: true,
//         target: 'ES5'
//     });
//     b.transform('debowerify');
//     return b.bundle();
// };

// //
// gulp.task('roda-browserify', ['lint'], function() {
//     // Single entry point to browserify
//     gulp.src(files)
//         .pipe(browserify()).pipe(concat('all.browserify.js'))
//         .pipe(gulp.dest('dist/browserify'))
// });

var clean = require('gulp-clean');

gulp.task('clean', function() {
    // return gulp.src(['dist/all.min.js', 'dist/browserify/all.browserify.js'], {
    //     read: false,
    //
    //
    // }).pipe(clean());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
    return gulp.src('*.html').pipe(connect.reload());
})



gulp.task('lint', ['clean'], function() {
    // return gulp.src('js/**/*.js').pipe(eslint('.eslintrc')) // ta errado o src
    //     .pipe(eslint.format())
    //     .pipe(eslint.failOnError());
});



gulp.task('roda-browserify', ['lint'], function() {
    // Grabs the app.js file
    return browserify('./js/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('all.browserify.js'))
        .pipe(gulp.dest('./dist/browserify/'));
})


gulp.task("babel-test", ['roda-browserify'], function() {
    return gulp.src('tests/**/*.js').pipe(concat('all.aspec.js'))
        .pipe(babel())
        .pipe(gulp.dest("dist/"));
});


gulp.task("babel", ['babel-test'], function() {
    return gulp.src("dist/browserify/all.browserify.js")
        .pipe(concat('all.min.js'))
        .pipe(babel())
        // .pipe(rename('all.min.js'))
        .pipe(gulp.dest("dist/"));
});


gulp.task('test', ['babel'], function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        preprocessors: {
            'dist/all.min.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: '.'
        }

    }, function(exit) {
        gutil.log('[ACABOU OS TESTES]', 'http://localhost:8080/');
        done();
    }).on('error', function(err) {
        throw err;
    }).start();
});

gulp.task('coverage', ['test'], function() {
    gulp.src('./coverage/index.html').pipe(open());
});

gulp.task('dist', ['test'], function() {
    return gulp.src('dist/all.min.js').pipe(uglify({
        mangle: false
    })).pipe(gulp.dest("dist/"));
});

gulp.task('observa', ['dist'], function() {
    gulp.watch('js/**/*.js', function(event) {
        gutil.log('Arquivo ' + event.path + ' foi ' + event.type + ', rodando as tasks...');
        gulp.run('dist');
        connect.reload();
    });;
});

gulp.task('tdd', function(done) {
    new Server({
            configFile: __dirname + '/karma.conf.js'
        },
        function(error) {
            gutil.log(error);
        }).start();
});


gulp.task('default', ['connect', 'observa']);
