/// <binding AfterBuild='libs' Clean='clean' />
/// <reference path="node_modules/bluebird/js/browser/bluebird.js" />
/// <reference path="node_modules/bluebird/js/browser/bluebird.core.js" />

var gulp = require("gulp");
var concat = require('gulp-concat');
var karma = require("gulp-karma");
var gulpUtil = require("gulp-util");
var webpack = require("gulp-webpack");
var rename = require("gulp-rename");
var rimraf = require("rimraf");
var clean = require('gulp-clean');
var child_process = require("child_process");
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


var paths = {
    npm: './node_modules/',
    vendor: './vendor/'
};

var libs = [
    paths.npm + 'jquery/dist/jquery.js',
    paths.npm + 'rx/dist/rx.all.compat.js',
    paths.npm + 'fastclick/lib/fastclick.js',
    paths.npm + 'moment/moment.js',
    paths.npm + 'bluebird/js/browser/bluebird.js',
    paths.npm + 'bluebird/js/browser/bluebird.core.js',
    paths.npm + 'handlebars/dist/handlebars.js'
];


gulp.task("typedoc", function () {
    child_process.exec("typedoc --out ./docs/ ./lib/ --module commonjs --experimentalDecorators --ignoreCompilerErrors --exclude node_module");
});

gulp.task('vendor', function () {
    return gulp.src(libs).pipe(gulp.dest(paths.vendor));
});

gulp.task('remove-compiled-js', function () {
    return gulp.src(["./lib/**/*.js", "./lib/**/*.js.map"], { read: false })
    .pipe(clean());
});

gulp.task('clean', function (callback) {
    rimraf(paths.vendor, callback);
});

gulp.task("webpack", ['remove-compiled-js'], function () {
    return gulp.src('lib/main.ts')
    .pipe(webpack({
        output: {
            library: "ui"
        },
        resolve: {
            extensions: ["", ".js", ".ts"]
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/, loader: "ts", exclude: [/node_modules/]
                },
                {
                    test: /\.css$/, exclude: [/node_modules/], loader: "style-loader!css-loader"
                },
                {
                    test: /\.html$/, loader: "raw"
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }
            ]
        }
    }))
    .pipe(rename("handlebars.rx.ui.js"))
    .pipe(gulp.dest('dist/'));
});

gulp.task('run-unit-tests', ['compile-ts-tests'], function () {
    return gulp.src([
        './vendor/fastclick.js',
        './venodor/rx.all.compat.js',
        './venodor/handlebars.js',
        './dist/handlebars.rx.ui.js',
        './test/handlebars.rx.ui.spec.js'
    ])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        });
});


gulp.task('compile-ts-tests', ['remove-compiled-js'], function () {
    var sourceTsFiles = [config.appTypeScriptReferences,
                        './lib/**/*.spec.ts'];

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

    return tsResult.js
        .pipe(concat('handlebars.rx.ui.spec.js'))
        .pipe(gulp.dest('./test/'));
});


gulp.task('watch', function () {
    gulp.watch([
        './lib/**/*.ts', './lib/**/*.html', './lib/**/*.css', './lib/**/*.scss'
    ], ['remove-compiled-js', 'webpack']);
});

gulp.task('default', ['remove-compiled-js', 'vendor', 'webpack', 'watch']);