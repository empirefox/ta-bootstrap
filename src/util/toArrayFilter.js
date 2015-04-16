angular.module('angular-toArrayFilter', []).filter('toArray', function() {
	var filter = function(key) {
		return !key.startsWith('$');
	};
	return function(obj, addKey) {
		if (addKey === false) {
			return Object.keys(obj).filter(filter).map(function(key) {
				return obj[key];
			});
		} else {
			return Object.keys(obj).filter(filter).map(function(key) {
				return Object.defineProperty(obj[key], '$key', {
					enumerable : false,
					value : key
				});
			});
		}
	};
});