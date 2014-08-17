var gulp   = require('gulp');
var concat = require('gulp-concat-sourcemap');
//grab the bower paths
var bower = require('wiredep')({
  //exclude: [ /ractive/, /vue/ ]
}); 
//concat all bower JS files
gulp.task('libs', function() {
    gulp.src( bower.js )
       .pipe(concat('libs.js'))
       .pipe(gulp.dest('build/js'));
});