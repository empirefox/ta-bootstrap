var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var swig = require('swig');
var express = require('express');
var config = require('../config');
var resource = require('../resource.json');

function scenarioHandler(req, res) {
	var scenario = req.params.scenario,
	    view = req.params.view || scenario,
	    js = req.params.js || view;
	res.render(scenario + '/' + view, {
		mainjs : '/e2e/' + scenario + '/' + js + '.main.js'
	});
};

function mockHandler(vendor) {
	return function(req, res) {
		var act = req.params.act;
		res.setHeader('Content-Type', 'application/json');
		res.render('filemanager/' + vendor + '/' + act + '.json');
	};
}

function deleteOkMockHandler(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send({
		status : 'ok'
	});
}

gulp.task('server', function(done) {
	var app = express();

	var $swig = new swig.Swig({
		cache : false,
		varControls : ['[[', ']]'],
		locals : resource
	}).renderFile;
	app.engine('json', $swig);
	app.engine('html', $swig);
	app.set('view engine', 'html');
	app.set('views', config.render('{{ test }}/e2e'));
	app.set('view cache', false);

	app.get('/scenario/:scenario/:view?/:js?', scenarioHandler);
	'qiniu|tudou|youku'.split('|').forEach(function(vendor) {
		app.get('/' + vendor + '/:act', mockHandler(vendor));
	});
	app.delete('/:vendor/:act', deleteOkMockHandler);

	app.use(express.static(config.dest, {
		index : false
	}));
	app.use(express.static(config.render('{{ test }}')));
	app.use(express.static(config.render('{{ src }}')));
	app.use('/bower_components', express.static('./bower_components'));

	app.listen(config.port);
});
