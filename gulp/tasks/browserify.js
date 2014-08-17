/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
//var stringify    = require('stringify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var glob         = require('glob');
var partialify   = require('partialify');

gulp.task('browserify', function() {

  var bundleMethod = global.isWatching ? watchify : browserify;

  var bundle = function(filePath, index) {
    var splitPath = filePath.split('/');
    var bundler = bundleMethod({
      // Specify the entry point of your app
      entries: [filePath],
      // Add file extentions to make optional in your requires
      extensions: ['.coffee', '.hbs', '.html'],
      // Enable source maps!
      debug: true
    });

    if( index === 0 ) {
      // Log when bundling starts
      bundleLogger.start();
    }

    bundler
      .transform(partialify)
      //.transform(stringify(['.html']))
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source( splitPath[splitPath.length - 1] ))
      // Specify the output destination
      .pipe(gulp.dest('./build/js/pages'));

    if( index === (files.length - 1) ) {
      // Log when bundling completes!
      bundler.on('end', bundleLogger.end);
    }

    if(global.isWatching) {
      // Rebundle with watchify on changes.
      bundler.on('update', function(changedFiles) {
        // Passes an array of changed file paths
        changedFiles.forEach(function(filePath, index) {
          bundle(filePath, index);
        });
      });
    }
  }

  // Use globbing to create multiple bundles
  var files = glob('src/js/pages/*.js', function(err, files) {
    files.forEach(function(file, index) {
      bundle(process.cwd() + '/' + file, index);
    })
  });

});
