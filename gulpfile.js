var gulp = require('gulp');

// Linting..
gulp.task('lint', function() {
  var jshint = require('gulp-jshint');
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Testing..
gulp.task('test', function () {
  var jasmine = require('gulp-jasmine');
  return gulp.src('spec/**/*spec.js')
    .pipe(jasmine({
      'verbose': (process.env['VERBOSE'] == 'true')
    }));
});

gulp.task('default', ['lint', 'test']);
