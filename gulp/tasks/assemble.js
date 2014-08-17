var gulp       = require('gulp');
var assemble   = require('gulp-assemble');
var gulpif     = require('gulp-if');
var tap        = require('gulp-tap');
var glob       = require('glob');
var rename     = require('gulp-rename');
var buildPath, replacedPath;

var options = {
  data: 'src/pages/**/*.{json,.yml}',
  partials: 'src/templates/partials/*.hbs',
  layoutdir: 'src/templates/layouts/'
};

// gulp.task('assemble', function () {
//   glob('src/pages/**/*.hbs', function(err, files) {
//     files.forEach(function(filePath, index) {

//       replacedPath = filePath.replace('src/pages/', '');

//       if ( /\//.test(replacedPath) ) {
//         buildPath = replacedPath.substr(0, replacedPath.lastIndexOf('/')) + '/';
//       } else {
//         buildPath = '';
//       }
//       console.log('index', index);
//       gulp.src(filePath)
//         .pipe(assemble(options))
//         .pipe(gulp.dest('build/' + buildPath));
//     });
//   });

// });

gulp.task('assemble', function () {
     gulp.src('src/pages/**/**.hbs')
        .pipe(assemble(options))
        .pipe(gulp.dest('build/'));
});