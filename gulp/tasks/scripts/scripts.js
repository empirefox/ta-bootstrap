var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var config = require('../../config').scripts;
var file = plugins.file;
var ngConstant = plugins.ngConstant;
var angularFilesort = plugins.angularFilesort;
var reader = require('file-reader');
var Lazy = require("lazy.js");

var faStream = function() {
	var start = '@fa-var'.length;
	var fas = Lazy(reader(config.faList.src)[config.faList.file].match(/@fa-var-.*(?=\:)/gi)).compact().map(function(item) {
		// @fa-var-adjust
		return 'fa' + item.substr(start);
	}).toArray();
	var options = {
		name : config.faList.module,
		deps : config.faList.deps,
		constants : {}
	};
	options.constants[config.faList.constant] = fas;

	return file(config.faList.module + '.js', JSON.stringify(options), {
		src : true
	}).pipe(ngConstant());
};

var twaStream = require('./twa-stream');

var tplStream = gulp.src(config.tpl.src).pipe(plugins.angularTemplatecache(config.tpl));

gulp.task('scripts', function() {
	return streamqueue({
		objectMode : true
	}, faStream(), twaStream(), gulp.src(config.src), tplStream)
	// sort files
	.pipe(angularFilesort())
	// cancat
	.pipe(plugins.concat(config.name))
	//.pipe(plugins.uglify())
	.pipe(gulp.dest(config.dest));
});