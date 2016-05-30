var gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    newer = require('gulp-newer');

module.exports = function(buildOptions) {
    gulp.task('copy-images', function() {
        return (
            gulp
                .src([
                    'source/images/**/*.{jpg,jpeg,gif,png}',
                    '!source/images/**/_*'
                ])
                .pipe(newer('build/assets/images/'))
                .pipe(buildOptions.release ? imagemin() : gutil.noop())
                .pipe(gulp.dest('build/assets/images/'))
                /**.pipe(newer('www/assets/ver2/images/'))
                .pipe(buildOptions.release ? imagemin() : gutil.noop())
                .pipe(gulp.dest('www/assets/ver2/images/'))*/
        );
    });

    gulp.task('copy-fonts', function() {
        return (
            gulp
                .src(['source/fonts/**/*.{eot,woff,woff2}'])
                .pipe(gulp.dest('build/assets/fonts/'))
                .pipe(gulp.dest('www/assets/ver2/fonts/'))
        );
    });

    return function(callback) {
        runSequence('copy-images', 'copy-fonts', callback);
    };
};