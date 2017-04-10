var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    // cssnext     = require("gulp-cssnext"),
    postcss     = require("gulp-postcss"),
    cssreset    = require('postcss-css-reset'),
    cssnext     = require('postcss-cssnext'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    pug         = require('gulp-pug'),
    template    = require('gulp-template'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    path        = require('path'),
    server      = tinylr(),
    image       = require('gulp-image'),
    config      = require('./config.js');

var awspublish = require('gulp-awspublish'),
    cloudfront = require('gulp-cloudfront-invalidate-aws-publish');
var postcssImport = require("postcss-import");

// --- Basic Tasks ---
gulp.task('css', function() {
  var processors = [
    postcssImport(),
    cssreset(),
    cssnext({browsers: ['last 1 version']})
  ];
  return gulp.src('content/assets/css/styles.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(livereload(server));
});

gulp.task('js', function() {
  return gulp.src('content/assets/js/*.js')
    .pipe(template(config))
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload(server));
});

gulp.task('templates', function() {
  return gulp.src('content/index.pug')
    .pipe(pug({
      pretty: true,
      locals: config
    }))
    .pipe(template(config))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(server));
});

gulp.task('images', function() {
  gulp.src('content/assets/img/*')
      .pipe(image())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('express', function() {
  app.use(require('connect-livereload')());
  app.use(express.static(path.resolve('./dist')));
  app.listen(config.port);
  gutil.log('Listening on port: ' + config.port);
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('content/assets/img/**/*.*',['images']);
  gulp.watch('content/assets/css/**/*.css',['css']);
  gulp.watch('content/assets/js/*.js',['js']);
  gulp.watch('content/*.*',['templates']);
});

gulp.task('css:prod', function() {
  var processors = [
    cssreset(),
    postcssImport(),
    cssnext({browsers: ['last 1 version']}),
    // opacity,
  ];
  return gulp.src('content/assets/css/styles.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('dist/css'))
});

// create a new publisher using S3 options
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
var publisher = awspublish.create({
  region: config.awsRegion,
  params: {
    Bucket: config.awsBucket
  }
}, {
  cacheFileName: config.awsCache
});

// define custom headers
var headers = {
  // 'Cache-Control': 'max-age=315360000, no-transform, public'
  // ...
};

gulp.task('publish', function() {
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

var cfSettings = {
  distribution: config.cloudFrontDistID, // Cloudfront distribution ID
  wait: true,                            // Whether to wait until invalidation is completed (default: false)
  indexRootPath: true                    // Invalidate index.html root paths (`foo/index.html` and `foo/`) (default: false)
}

gulp.task('invalidate', function () {
  return gulp.src('./dist/**/*')
    .pipe(publisher.publish())
    .pipe(cloudfront(cfSettings))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

gulp.task('deploy', ['js','css:prod','templates'], function() {
  gulp.start('invalidate');
});


// Default Task
gulp.task('default', ['js','css','templates', 'images', 'express', 'watch']);
