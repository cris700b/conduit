
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

// @@ plugin used for prepending
// the jade mixin include statement to all jade view files
var insert = require('gulp-insert');

// @@ plugin for file concatenation
// used for concatenting the jade mixins
var concat = require('gulp-concat');

// @@ node path module
// used for getting the relative path
// between the concatenated mixins file
// and the currently working file
var path = require('path');

// @@ node module for clearing thr previous compilation
var del = require('del');

// Where our files are located
var dirs = {

    src: 'src/js/**',
    compiled: './compiled',
    build: './build',
    mixins: 'src/mixins'
};

var files = {

    js: dirs.src + '/*.js',
    view: dirs.src + '/*.jade',
    mixins: dirs.mixins + '/**/*.jade'
};

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

// @@ cleaning task
gulp.task('clean', function(){

    return gulp.src([dirs.compiled, dirs.build, dirs.src + '/configuration/app.templates.js', dirs.mixins + '/jade_components.jade'])
                .pipe(del())
                .on('errors', interceptErrors)
                .pipe(gulp.dest(dirs.compiled))

});

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

gulp.task('concatMixins', ['clean'], function(){

    return gulp.src(files.mixins)
                .pipe(concat("jade_components.jade"))
                .on('error', interceptErrors)
                .pipe(gulp.dest(dirs.mixins))
});

// jade templates task
// this task compiles the jade templates
// and copies the generated files in the compiled directory
gulp.task('compileTpls', ['concatMixins'], function(){

                // jade templates source files
    return gulp.src([files.view, 'src/index.jade', '!' + files.mixins])

                // before jade compilation, add the include statement
                // for the jade mixin files
                .pipe(insert.transform(function(contents, file) {

                    var includePath = path.relative(file.path, dirs.mixins);

                    includePath = includePath.replace('.', '') + '/jade_components';

                    var mixinsIncluded = 'include ' + includePath  + '\n' + contents;

                    return mixinsIncluded;
                }))

                // compile the jade templates
                .pipe(jade({pretty: true}))
                .on('error', interceptErrors)

                // copy the compiled html files
                // to the appropriate component folder
                .pipe(gulp.dest(dirs.compiled))
});

// this task is replaced by a newer one that uses jade(pug)
gulp.task('views', ['compileTpls'], function() {

    return gulp.src(dirs.compiled + '/**/*.html')
                .pipe(templateCache({

                    standalone: true
                }))
                .on('error', interceptErrors)
                .pipe(rename("app.templates.js"))
                .pipe(gulp.dest(dirs.src.replace('**', 'config/')));
});

gulp.task('html', ['compileTpls'], function() {

    return gulp.src("src/index.jade")
                .pipe(jade({pretty: true, doctype: 'html'}))
                .on('error', interceptErrors)
                .pipe(gulp.dest(dirs.build));
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

    gulp.watch(files.mixins, ['compileTpls']);

    gulp.watch("src/index.html", ['html']);
    gulp.watch(files.view, ['views']);
    gulp.watch(files.js, ['browserify']);

});
