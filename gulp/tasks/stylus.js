var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config = require('../config').stylus;
var browserSync = require('browser-sync');

gulp.task('stylus', function() {
	return gulp.src(config.src)
	// stylus
	.pipe(stylus({
		use : nib(),
		compress : false,
		sourcemap : {
			inline : true,
			sourceRoot : '.',
			basePath : config.dest
		}
	}))
	// error
	.on('error', handleErrors)
	// sourcemaps
	.pipe(sourcemaps.init({
		loadMaps : true
	}))
	// external sourcemaps
	.pipe(sourcemaps.write('.', {
		includeContent : false,
		sourceRoot : '.'
	}))
	// output
	.pipe(gulp.dest(config.dest))
	// browserSync
	.pipe(browserSync.reload({
		stream : true
	}));
	;
});