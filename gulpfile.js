var gulp = require('gulp'),
    args = require('yargs').argv,
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    config = require('./config.js');

var buildOptions = {
        release: 'r' in args || 'release' in args
    };


gulp.task('default', function() {
    return gulp.start('build');
});


gulp.task('d', ['dev']);
gulp.task('dev', function(callback) {
    return runSequence('build', 'connect', 'watch', callback);
});


gulp.task('build', function(callback) {
    return runSequence(
        'build-templates',
        'build-scripts',
        'build-assets',
        'build-icons',
        'build-styles',
        callback
    );
});


gulp.task('watch', function(callback) {

    // Templates
    gulp.watch('./source/blocks/**/*.html', function() {
        return runSequence('build-templates', 'reload');
    });
    gulp.watch('./source/templates/**/*.html', function() {
        return runSequence('build-templates', 'reload');
    });
    gulp.watch('./source/data/*.json', function() {
        return runSequence('build-templates', 'build-scripts', 'reload');
    });

    // Scripts
    gulp.watch('./source/blocks/**/*.js', function() {
        return runSequence('build-scripts', 'reload');
    });
    gulp.watch('./source/js/**/*.js', function() {
        return runSequence('build-scripts', 'reload');
    });

    // Styles
    gulp.watch('./source/blocks/**/*.less', function() {
        return runSequence('build-styles', 'reload');
    });
    gulp.watch('./source/less/**/*.less', function() {
        return runSequence('build-styles', 'reload');
    });

    // Assets
    gulp.watch('./source/fonts/**/*.{eot|woff}', function() {
        return runSequence('build-assets', 'reload');
    });
    gulp.watch('./source/images/**/*.{png,jpg,jpeg,gif,webm}', function() {
        return runSequence('build-assets', 'reload');
    });
    gulp.watch('./source/map/**/*.svg', function() {
        return runSequence('build-assets', 'reload');
    });

    // Icons
    gulp.watch('./source/svg/**/*.svg', function() {
        return runSequence('build-icons', 'reload');
    });

});


gulp.task('connect', function() {
    connect.server({
        root: __dirname + '/' + config.root,
        port: config.port,
        hostname: config.hostname,
        livereload: config.livereload
    });
});

gulp.task('reload', function() {
    return (
        gulp.src('build/*')
            .pipe(connect.reload())
    );
});

gulp.task('build-scripts', require('./tasks/scripts')(buildOptions));
gulp.task('build-templates', require('./tasks/templates')(buildOptions));
gulp.task('build-styles', require('./tasks/styles')(buildOptions));
gulp.task('build-assets', require('./tasks/assets')(buildOptions));
gulp.task('build-icons', require('./tasks/icons')(buildOptions));