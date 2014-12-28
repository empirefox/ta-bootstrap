var changed = require('gulp-changed');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../config').images;

gulp.task('images', function() {
	return gulp.src(config.src)
	// Ignore unchanged files
	.pipe(changed(config.dest))
	// Optimize
	.pipe(imagemin())
	// output
	.pipe(gulp.dest(config.dest));
});
