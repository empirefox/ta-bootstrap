var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var streamqueue = require('streamqueue');
var config = require('../../config').scripts;
var file = plugins.file;
var ngConstant = plugins.ngConstant;
var reader = require('file-reader');
var Lazy = require("lazy.js");
var request = require('request');
var cheerio = require('cheerio');
var S = require('string');
var fs = require('fs');
var del = require('del');

// copy from http://0xcc.net/jsescape/
// "あい" => [ 0x3042,  0x3044 ]
var convertStringToUnicodeCodePoints = function(str) {
	var surrogate_1st = 0;
	var unicode_codes = [];
	for (var i = 0; i < str.length; ++i) {
		var utf16_code = str.charCodeAt(i);
		if (surrogate_1st != 0) {
			if (utf16_code >= 0xDC00 && utf16_code <= 0xDFFF) {
				var surrogate_2nd = utf16_code;
				var unicode_code = (surrogate_1st - 0xD800) * (1 << 10) + (1 << 16) + (surrogate_2nd - 0xDC00);
				unicode_codes.push(unicode_code);
			} else {
				// Malformed surrogate pair ignored.
			}
			surrogate_1st = 0;
		} else if (utf16_code >= 0xD800 && utf16_code <= 0xDBFF) {
			surrogate_1st = utf16_code;
		} else {
			unicode_codes.push(utf16_code);
		}
	}
	return unicode_codes;
};

// "9⃣" => "39-20e3"
var escapeToScssName = function(str) {
	return convertStringToUnicodeCodePoints(str).map(function(code) {
		return code.toString(16);
	}).join('-');
};

var getRawTwas = function() {
	var twasContent = reader(config.twaList.src)[config.twaList.file].match(/\$emoji-map\:\s*\(\S*([^\)]+)\)/)[1];
	return JSON.parse('{' + twasContent + '}');
};

var getParsedTwas = function() {
	var twas = getRawTwas();
	var emoji = require('./emoji.json');
	for (var categoryName in emoji) {
		var category = emoji[categoryName];
		for (var groupName in category) {
			category[groupName] = Lazy(category[groupName].split('\n')).map(escapeToScssName).map(function(sname) {
				return twas[sname];
			}).compact().map(function(name) {
				return 'twa-' + name;
			}).toArray();
			if (category[groupName].length === 0) {
				delete category[groupName];
			}
		}
		if (Object.keys(category).length === 0) {
			delete emoji[categoryName];
		}
	}
	return emoji;
};

gulp.task('twa:emoji', function(done) {

	var getKey = function(title, hasPrefix) {
		return S(( hasPrefix ? 'EMOJI_' : '') + title.toUpperCase()).chompRight(' EMOJI').replaceAll(',', '').replaceAll(' ', '_').s;
	};

	request('http://getemoji.com/', function(err, resp, body) {
		var emojis = {};
		var categoryies = body.split('<h2>').slice(1);
		categoryies.forEach(function(category) {
			var segs = ('<h2>' + category).split('<h3>');
			var h2a = cheerio.load(segs.shift())('h2 a');
			var h2 = emojis[getKey(h2a.text(), true)] = {};
			segs.forEach(function(seg) {
				$ = cheerio.load('<h3>' + seg);
				h2[getKey($('h3').text())] = $('p.emoji').text().trim();
			});
		});
		delete emojis.EMOJI_;

		del([__dirname + '/emoji.json'], function() {
			fs.writeFile(__dirname + '/emoji.json', JSON.stringify(emojis, null, '\t'));
			done();
		});
	});
});

module.exports = function() {
	var twas = getParsedTwas();
	var options = {
		name : config.twaList.module,
		deps : config.twaList.deps,
		constants : {}
	};
	options.constants[config.twaList.constant] = twas;

	return file(config.twaList.module + '.js', JSON.stringify(options), {
		src : true
	}).pipe(ngConstant());
};
