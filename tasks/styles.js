var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer');

module.exports = function(buildOptions) {
    gulp.task('styles.modern', function() {
        return (
            gulp
                .src([
                    'node_modules/fotorama/fotorama.css',
                    'temp/sprite.less',
                    'source/less/mixins.less',
                    'source/less/svg.less',
                    'source/less/fonts.less',
                    'source/less/common.less',
                    'source/blocks/**/*.less',
                    '!source/blocks/**/*.ie.less'
                ])
                .pipe(concat('app.css'))
                .pipe(plumber())
                .pipe(less())
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'ie 8', 'last 2 versions']
                }))
                .pipe(buildOptions.release ? csso() : gutil.noop())
                .pipe(gulp.dest('build/assets/'))
                .pipe(gulp.dest('www/assets/ver2/'))
        );
    });

    gulp.task('styles.ie', function() {
        return (
            gulp
                .src([
                    'node_modules/fotorama/fotorama.css',
                    'temp/sprite.less',
                    'source/less/mixins.less',
                    'source/less/png.less',
                    'source/less/fonts.less',
                    'source/less/common.less',
                    'source/blocks/*/*.less'
                ])
                .pipe(concat('app.ie.css'))
                .pipe(plumber())
                .pipe(less())
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'ie 8', 'last 2 versions']
                }))
                .pipe(buildOptions.release ? csso() : gutil.noop())
                .pipe(gulp.dest('build/assets/'))
                .pipe(gulp.dest('www/assets/ver2/'))
        );
    });

    return function(callback) {
        runSequence(['styles.ie', 'styles.modern'], callback);
    };
};