var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');

gulp.task('sass', ['images'], function () {
  return gulp.src('src/sass/app.scss')
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'map'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('build/css'));
});
