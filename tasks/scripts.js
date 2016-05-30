var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');

module.exports = function(buildOptions) {

    gulp.task('jshint', function() {
        return (
            gulp
                .src([
                    'source/blocks/**/*.js',
                    'tasks/*.js',
                    'gulpfile.js'
                ])
                .pipe(jshint())
                .pipe(jshint.reporter())
        );
    });

    gulp.task('scripts', function() {
        return (
            gulp
                .src([
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/fotorama/fotorama.js',
                    'node_modules/masonry-layout/dist/masonry.pkgd.js',
                    'source/js/*.js',
                    'source/blocks/**/*.js'
                ])
                .pipe(concat('app.js'))
                .pipe(buildOptions.release ? uglify() : gutil.noop())
                .pipe(gulp.dest('build/assets/'))
                .pipe(gulp.dest('www/assets/ver2/'))
        );
    });

    return function(callback) {
        runSequence('jshint', 'scripts', callback);
    };
};