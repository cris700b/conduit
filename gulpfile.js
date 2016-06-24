var gulp          = require('gulp');
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

// Where our files are located
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

// @@ jade templates location
var tplFiles = "src/js/**/*.pug";
var tplCompileDir = "src/js";

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
        .pipe(gulp.dest('./build/'));
});

// jade templates task
gulp.task('jade', function(){

                // jade templates source files
    return gulp.src(tplFiles)

                // pipe to jade plugin
                .pipe(jade({

                            locals: tplFiles,
                            pretty: true
                        })
                    )

                // copy the compiled html files
                // to the appropriate component folder
                .pipe(gulp.dest(tplCompileDir));
});

gulp.task('html', function() {

    return gulp.src("src/index.html")
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {

    return gulp.src(viewFiles)
                .pipe(templateCache({

                    standalone: true
                }))
                .on('error', interceptErrors)
                .pipe(rename("app.templates.js"))
                .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['jade', 'html', 'browserify'], function() {

    var html = gulp.src("build/index.html")
                    .pipe(gulp.dest('./dist/'));

    var js = gulp.src("build/main.js")
                .pipe(uglify())
                .pipe(gulp.dest('./dist/'));

    return merge(html,js);
});

gulp.task('default', ['jade', 'html', 'browserify'], function() {

    browserSync.init(['./build/**/**.**'], {

        server: "./build",
        port: 4000,
        notify: false,
        ui: {

            port: 4001
        }
    });

    // jade templates update task
    gulp.watch(tplFiles, ['jade']);

    gulp.watch("src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['browserify']);

});
