var swig = require('swig');
var r = new swig.Swig({
	locals : {
		src : './src',
		dest : './dist',
		test : './test',
		bower : './bower_components'
	}
}).render;

var config = {
	dest : '{{ dest }}',
	src : '{{ src }}',
	port : 8080,
	browserSync : {
		port : 3000,
		server : {
			// We're serving the src folder as well
			// for sourcemap linking
			baseDir : ['{{ dest }}', '{{ src }}']
		},
		files : ["{{ dest }}/**",
		// Exclude Map files
		"!{{ dest }}/**.map"]
	},
	scripts : {
		src : '{{ src }}/**/*.js',
		dest : '{{ dest }}',
		name : 'app.js',

		tpl : {
			src : '{{ src }}/**/*.html',
			standalone : true,
			module : 'ta.bootstrap.tpl',
			root : '/views'
		},

		faList : {
			src : '{{ bower }}/font-awesome/**/variables.less',
			file : 'variables',
			module : 'ta.bootstrap.fa.list',
			constant : 'fas'
		},
		twaList : {
			src : '{{ bower }}/twa/twemoji-awesome.scss',
			file : 'twemojiAwesome',
			module : 'ta.bootstrap.twa.list',
			constant : 'twas'
		}
	},
	stylus : {
		src : ["{{ src }}/**/*.styl", "{{ bower }}/twa/twemoji-awesome.css"],
		dest : "{{ dest }}",
		name : "app.css"
	},
	test : {
		dir : '{{ test }}/e2e',
		fixtures : '{{ test }}/fixtures/**/*.json',
		unit : ['{{ test }}/unit/helper.js', '{{ test }}/unit/**/*.js'],
		e2e : '{{ test }}/e2e/**/*.scenario.js'
	}
};

config = JSON.parse(r(JSON.stringify(config)));
config.render = r;

module.exports = config;