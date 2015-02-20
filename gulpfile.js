var gulp = require('gulp');

// Linting..
gulp.task('lint', function() {
  var jshint = require('gulp-jshint');
  return gulp.src(['./lib/**/*.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Testing..
var istanbul = require('gulp-istanbul'),
    jasmine = require('gulp-jasmine');
gulp.task('test', function (cb) {
  gulp.src('lib/**/*.js')
    .pipe(istanbul({
      'includeUntested': true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['test/**/*spec.js'])
        .pipe(jasmine({
          'verbose': (process.env['VERBOSE'] == 'true')
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('default', ['test']);
