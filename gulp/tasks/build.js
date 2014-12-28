var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
	runSequence(['clean', 'jshint'], ['browserify', 'stylus', 'images'], done);
});