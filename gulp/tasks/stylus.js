var gulp = require('gulp');
var nib = require('nib');
var plugins = require('gulp-load-plugins')();
var stylus = plugins.stylus;
var sourcemaps = plugins.sourcemaps;
var concat = plugins.concat;
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
    // concat
    .pipe(concat(config.name))
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
});