var swig = require('swig');
var r = new swig.Swig({
	locals : {
		src : './src',
		dest : './dist',
		test : './test',
		views : 'views'
	}
}).render;

var config = {
	browserSync : {
		port : 3000,
		server : {
			// We're serving the src folder as well
			// for sourcemap linking
			baseDir : [dest, src]
		},
		files : ["{{ dest }}/**",
		// Exclude Map files
		"!{{ dest }}/**.map"]
	},
	stylus : {
		src : "{{ src }}/stylus/*.styl",
		dest : "{{ dest }}"
	},
	images : {
		src : "{{ src }}/images/**",
		dest : "{{ dest }}/images"
	},
	test : {
		fixtures : '{{ test }}/fixtures/**/*.json',
		unit : ['{{ test }}/unit/helper.js', '{{ test }}/unit/**/*.js'],
		e2e : '{{ test }}/e2e/**/*.scenario.js'
	},
	browserify : {
		// Enable source maps
		debug : true,
		// A separate bundle will be generated for each
		// bundle config in the list below
		bundleConfigs : [{
			entries : '{{ src }}/scripts/app.coffee',
			dest : "{{ dest }}",
			outputName : 'app.js'
		}, {
			entries : '{{ src }}/scripts/head.coffee',
			dest : "{{ dest }}",
			outputName : 'head.js'
		}]
	}
};

config = JSON.parse(r(JSON.stringify(config)));
module.exports = config;