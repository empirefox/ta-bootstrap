'use strict';

angular.module('ta.bootstrap.fm').service('bucket', ['$http',
function($http) {
	var service = {};

	service.getName = function() {
		$http.get('/qiniu/bucket', {
			cache : true
		}).success(function(data) {
			service.name = data.bucket;
		});
	};
	service.getName();

	service.getUrl = function(key) {
		return 'http://' + service.name + '.qiniudn.com/' + key;
	};

	service.delete = function(key) {
		return $http.delete('/qiniu/delete', {
			Bucket : service.name,
			Key : key
		}).then(function(res) {
			return res.data;
		});
	};

	service.list = function(prefix) {
		return $http.get('/qiniu/list', {
			Bucket : service.name,
			Prefix : prefix
		}).then(function(res) {
			return res.data;
		});
	};

	return service;

}]).service('qiniuCdn', ['bucket', '$filter', '$q',
function(bucket, $filter, $q) {
	var $date = $filter('date');
	var parser = function(data) {
		var items = data.items.map(function(v) {
			var item = {
				name : v.key,
				imgSrc : bucket.getUrl(v.key),
				click : function() {
					return angular.element('<img>').attr('src', this.imgSrc).attr('alt', v.key);
				}
			};
			item.delete = function() {
				bucket.delete(v.key).then(function() {
					var i = items.indexOf(item);
					if (i > -1) {
						items.splice(i, 1);
					}
				});
			};
			return item;
		});
		return {
			items : items
		};
	};
	var service = {};

	service.create = function() {
		var now = new Date();

		// years
		var imageYears = {
			items : []
		};

		// create year
		var newYear = function(y) {

			var ydate = new Date(y, 0, 1);
			ydate.name = y;
			ydate.imgSrc = 'https://twemoji.maxcdn.com/svg/1f4c1.svg';
			ydate.click = function() {
				var imageMonths = {
					dir : $date(ydate, 'yyyy'),
					items : [],
					getParent : function() {
						return imageYears;
					}
				};
				// create month
				var newMonth = function(m) {
					var mdate = new Date(y, m, 1);
					mdate.name = $date(mdate, 'MMMM');
					mdate.imgSrc = 'https://twemoji.maxcdn.com/svg/1f4c1.svg';
					mdate.click = function() {
						return bucket.list($date(mdate, 'yyyyMM-')).then(function(data) {
							var result = parser(data);
							result.dir = $date(mdate, 'yyyy/MM');
							result.getParent = function() {
								return imageMonths;
							};
							return result;
						});
					};
					return mdate;
				};

				var to = y === now.getFullYear() ? now.getMonth() : 11;

				for (var m = 0; m <= to; m++) {
					imageMonths.items.push(newMonth(m));
				}

				return $q.when(imageMonths);
			};

			return ydate;
		};

		for (var y = 2014; y <= now.getFullYear(); y++) {
			imageYears.items.push(newYear(y));
		}

		return imageYears;
	};

	return service;
}]).service('fmVendor', ['$http', 'qiniuCdn', '$q',
function($http, qiniuCdn, $q) {
	// list: exist list container
	// parse: http get data then parse to container
	var resource = {
		qiniu : {
			list : qiniuCdn.create,
			title : 'TA_FA_TITLE_IMAGE'
		},
		tudou : {
			parse : function(data) {
				var items = data.results.map(function(v) {
					return {
						name : v.title,
						imgSrc : v.bigPicUrl,
						url : v.outerGPlayerUrl,
						click : function() {
							var embed = '<img class="ta-insert-video" ta-insert-video="' +
							// real url
							this.url + '" contenteditable="false" src="' +
							// show in editor
							this.imgSrc + '" allowfullscreen="true" width="300" frameborder="0" height="250"/>';

							return angular.element(embed);
						}
					};
				});
				return {
					items : items
				};
			},
			title : 'TA_FA_TITLE_VIDEO'
		},
		youku : {
			parse : function(data) {
				var items = data.map(function(v) {
					var item = {
						name : v.title,
						imgSrc : v.thumbnail,
						url : 'http://player.youku.com/embed/' + v.id,
						click : function() {
							var embed = '<img class="ta-insert-video" ta-insert-video="' +
							// real url
							this.url + '" contenteditable="false" src="' +
							// show in editor
							this.imgSrc + '" allowfullscreen="true" width="300" frameborder="0" height="250"/>';

							return angular.element(embed);
						}
					};
					item.delete = function() {
						$http.delete('/youku/delete', {
							id : v.id
						}).then(function() {
							var i = items.indexOf(item);
							if (i > -1) {
								items.splice(i, 1);
							}
						});
					};
					return item;
				});
				return {
					items : items
				};
			},
			title : 'TA_FA_TITLE_VIDEO'
		}
	};

	var service = function(vendor) {
		var r = resource[vendor];
		if (r.list) {
			return $q.when({
				current : r.list(),
				view : {
					title : r.title
				}
			});
		}
		return $http.get('/' + vendor + '/list').then(function(res) {
			return {
				current : r.parse(res.data),
				view : {
					title : r.title
				}
			};
		});
	};

	return service;
}]).factory('videoTransform', ['videoConfig',
function(videoConfig) {
	return function(webUrl) {
		if (!webUrl.url) {
			return {};
		}
		var result = {
			url : webUrl.url
		};
		Object.keys(videoConfig).some(function(vendor) {
			var matchs = webUrl.url.match(videoConfig[vendor].reg);
			if (matchs) {
				result.url = videoConfig[vendor].url + matchs[1];
				result.vendor = vendor;
				// check seq in fmOptions
				// 0 -> video, 1 -> image
				result.type = 0;
				return true;
			}
		});
		return result;
	};
}]);
