var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    clean   = require('gulp-clean'),
    changed = require('gulp-changed'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    less    = require('gulp-less'),
    csso    = require('gulp-csso'),
    jade    = require('gulp-jade'),
    es      = require('event-stream'),
    flatten = require('gulp-flatten'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    express = require('express'),
    http    = require('http'),
    lr      = require('tiny-lr')();

gulp.task('clean', function () {
    // Clear the destination folder
    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});



// Compile JS

gulp.task('scripts', function () {
    return es.concat(
        // Detect errors and potential problems in your JavaScript code
        // You can enable or disable default JSHint options in the .jshintrc file


        // Concatenate, minify and copy all JavaScript (except vendor scripts)
        gulp.src(['./src/js/**/*.js'])
            .pipe(concat('main.js'))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('./dist/js'))
            .pipe(refresh(lr))


    
)});



// Compile LESS files
gulp.task('styles', function () {
return gulp.src('./src/less/styles.less')
    .pipe(less())
    .pipe(rename('styles.css'))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
    .pipe(refresh(lr));
});

gulp.task('templates', function () {
// Compile Jade files
var YOUR_LOCALS = {};
return gulp.src('./src/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(refresh(lr));
});

gulp.task('vendors', function() {
return gulp.src('bower_components/**/*.min.js')
    .pipe(flatten())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('assets', function() {
return gulp.src('bower_components/zeroclipboard/ZeroClipboard.swf')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('fonts', function() {
return gulp.src('bower_components/bootstrap/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('server', function () {
    // Create a HTTP server for static files
    var port = 3000;
    var app = express();
    var server = http.createServer(app);

    app.use(express.static(__dirname + '/dist'));

    server.on('listening', function () {
        gutil.log('Listening on http://locahost:' + server.address().port);
    });

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            gutil.log('Address in use, retrying...');
            setTimeout(function () {
                server.listen(port);
            }, 1000);
        }
    });

    server.listen(port);
});

gulp.task('lr-server', function () {
    // Create a LiveReload server
    lr.listen(35729, function (err) {
        if (err) {
            gutil.log(err);
        }
    });
});

gulp.task('watch', function () {

    // Watch .less files and run tasks if they change
    gulp.watch('./src/less/**/*.less', ['styles']);

    // Watch .jade files and run tasks if they change
    gulp.watch('./src/jade/index.jade', ['templates']);

    // Watch .js files
    gulp.watch('./src/js/**/*.js', ['scripts']);

});

// The dist task (used to store all files that will go to the server)
gulp.task('dist', ['clean', 'styles', 'templates', 'scripts', 'vendors', 'assets', 'fonts']);

// The default task (called when you run `gulp`)
gulp.task('default', ['clean', 'styles', 'templates', 'scripts', 'vendors', 'assets', 'fonts', 'lr-server', 'server', 'watch']);