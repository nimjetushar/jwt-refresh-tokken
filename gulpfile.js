const gulp = require('gulp'),
    babel = require('gulp-babel'),
    del = require('del'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./config/webpack.prod');

const buildPath = './dist';

function buildServer() {
    return gulp.src('src/**/*')
        .pipe(babel({ presets: ['es2015', 'stage-2'] }))
        .pipe(gulp.dest(buildPath));
}

function buildClient() {
    return gulp.src('client')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./dist/client'));
}

function clean() {
    return del([buildPath], { force: true });
}

exports.default = gulp.series(clean, buildServer, buildClient);