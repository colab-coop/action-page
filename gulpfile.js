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

var awspublish = require('gulp-awspublish');
var postcssImport = require("postcss-import");

// --- Basic Tasks ---
gulp.task('css', function() {
  var processors = [
    cssreset(),
    postcssImport(),
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
  gulp.watch('src/assets/css/**/*.css',['css']);
  gulp.watch('src/assets/js/*.js',['js']);
  gulp.watch('src/*.pug',['templates']);
  gulp.watch('src/partials/*.*',['templates']);
});

gulp.task('publish', function() {

  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    region: 'us-east-1',
    params: {
      Bucket: 'nosunoco.com'
    }
  }, {
    cacheFileName: '/tmp/nosunoco.cache'
  });

  // define custom headers
  var headers = {
    // 'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src('./dist/**/*')
     // gzip, Set Content-Encoding headers and add .gz extension
    // .pipe(awspublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    // .pipe(publisher.publish(headers))
    .pipe(publisher.publish())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});

// Default Task
gulp.task('default', ['js','css','templates', 'images', 'express', 'watch']);
