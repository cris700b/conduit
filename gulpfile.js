
var gulp          = require('gulp');
//var pluginsLoader = require('gulp-load-plugins');

var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');

// @@ jade support
var jade = require('gulp-jade');
var path = require('path');
var fs = require('fs');

// Where our files are located
var dirs = {

    src: 'src/js/**',
    compile: './compiled',
    build: './build'
};

var files = {

    js : dirs.src + '/*.js',
    view : dirs.src + '/*.pug'
};

//var jsFiles   = 'src/js/**/*.js';
//var viewFiles = 'src/js/**/*.pug';

// @@ jade templates location
//var tplFiles = 'src/js/**/*.jade';
//var tplCompileDir = "src/js";

var interceptErrors = function(error) {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({

        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};


gulp.task('browserify', ['views'], function() {

    return browserify('./src/js/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)

        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))

        // Start piping stream to tasks!
        .pipe(gulp.dest(dirs.build));
});

// jade templates task
// this task replaces the views task
gulp.task('jade', function(){

                // jade templates source files
    return gulp.src(files.view)

                // pipe to jade plugin
                .pipe(jade({pretty: true}))
                .on('error', interceptErrors)

                // copy the compiled html files
                // to the appropriate component folder
                .pipe(gulp.dest(dirs.compile));
});

gulp.task('html', function() {

    return gulp.src("src/index.jade")
                .pipe(jade())
                .on('error', interceptErrors)
                .pipe(gulp.dest(dirs.build));
});

// this task is replaced by a newer one that uses jade(pug)
gulp.task('views', function() {

    return gulp.src(files.view)
                .pipe(jade())
                .pipe(templateCache({

                    standalone: true
                }))
                .on('error', interceptErrors)
                .pipe(rename("app.templates.js"))
                .pipe(gulp.dest(dirs.src.replace('**', 'config/')));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function() {

    var html = gulp.src("build/index.html")
                    .pipe(gulp.dest(dirs.dist));

    var js = gulp.src("build/main.js")
                .pipe(uglify())
                .pipe(gulp.dest(dirs.dist));

    return merge(html,js);
});

gulp.task('default', ['html', 'browserify'], function() {

    browserSync.init([dirs.build + '/**/**.**'], {

        server: dirs.build,
        port: 4000,
        notify: false,
        ui: {

            port: 4001
        }
    });

    // jade templates update task
    //gulp.watch(tplFiles, ['views']);

    gulp.watch("src/index.html", ['html']);
    gulp.watch(files.view, ['views']);
    gulp.watch(files.js, ['browserify']);

});
