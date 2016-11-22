var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    // cssnext     = require("gulp-cssnext"),
    postcss     = require("gulp-postcss"),
    cssreset    = require('postcss-css-reset'),
    cssnext     = require('postcss-cssnext'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    pug         = require('gulp-pug'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in pug
    path        = require('path'),
    server      = tinylr(),
    image       = require('gulp-image');


// --- Basic Tasks ---
gulp.task('css', function() {
  var processors = [
    cssreset(),
    cssnext({browsers: ['last 1 version']}),
    // opacity,
  ];
  return gulp.src('src/assets/css/styles.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(livereload( server));
});

gulp.task('js', function() {
  return gulp.src('src/assets/js/*.js')
    .pipe( uglify() )
    .pipe( concat('all.min.js'))
    .pipe( gulp.dest('dist/js'))
    .pipe( livereload( server));
});

gulp.task('templates', function() {
  return gulp.src('src/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe( livereload( server ));
});

gulp.task('images', function() {
  gulp.src('./src/assets/img/*')
      .pipe(image())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('express', function() {
  app.use(require('connect-livereload')());
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/assets/css/*.css',['css']);
  gulp.watch('src/assets/js/*.js',['js']);
  gulp.watch('src/*.pug',['templates']);
  gulp.watch('src/partials/*.*',['templates']);
});

// Default Task
gulp.task('default', ['js','css','templates', 'images', 'express', 'watch']);
