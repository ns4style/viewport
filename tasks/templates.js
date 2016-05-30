var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    data = require('gulp-data'),
    runSequence = require('run-sequence'),
    path = require('path'),
    fs = require('fs');

module.exports = function(buildOptions) {
    var base = 'source/blocks/',
        blocks = [],
        blocksFolder = fs.readdirSync(base);

    blocksFolder.forEach(function(item) {
        var that = path.join(base, item).replace(/\\/, '/');

        if (fs.statSync(that).isDirectory()) {
            blocks.push(that);
        }
    });

    for (var i=0;i<blocks.length;i++)
        blocks[i]=blocks[i].split('\\').join('/');


    gulp.task('templates', function() {
        var options = {
                ignorePartials: true,
                batch : blocks
            };

        return (
            gulp
                .src(['source/templates/*.html'])
                .pipe(handlebars(data, options))
                .pipe(gulp.dest('build/'))
        );
    });

    return function(callback) {
        runSequence('templates', callback);
    };
};