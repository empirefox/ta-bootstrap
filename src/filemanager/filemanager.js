'use strict';

// require jquery
angular.module('ta.bootstrap.fm', ['ta.bootstrap.tpl', 'ui.bootstrap', 'pascalprecht.translate'])
// $sce
.config(['$sceDelegateProvider',
function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	// Allow same origin resource loads.
	'self',
	// Allow loading from our assets domain.  Notice the difference between * and **.
	'http://*.tudou.com/**', 'http://*.youku.com/**']);
}])

// current: responsed data that contains file list
.controller('fmModalInstanceCtrl', ['$scope', '$modalInstance', 'videoTransform', 'fmOptions', 'data',
function($scope, $modalInstance, videoTransform, fmOptions, data) {
	$scope.ops = fmOptions;
	angular.extend($scope, data);
	$scope.type = 0;
	$scope.webUrl = {};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.onClick = function(item) {
		var result = item.click();
		// this is the actual result to add
		if (angular.isElement(result)) {
			$modalInstance.close(result);
			// this is the current view data from vendor
		} else if (result && result.then) {
			result.then(function(current) {
				$scope.current = current;
			});
		}
	};

	$scope.insertUrl = function() {
		switch($scope.ops.types[$scope.type].name) {
			case 'video':
				var embed = '<img class="ta-insert-video" ta-insert-video="' +
				// real url
				$scope.webUrl +
				//
				'" contenteditable="false" src="https://twemoji.maxcdn.com/svg/1f3a5.svg" allowfullscreen="true" width="300" frameborder="0" height="250"/>';
				$modalInstance.close(angular.element(embed));
				break;
			case 'image':
				$modalInstance.close(angular.element('<img>').attr('src', $scope.webUrl));
                break;
		}
	};

	$scope.transform = function() {
		$scope.webUrl = videoTransform($scope.webUrl);
		if (angular.isDefined($scope.webUrl.type)) {
			$scope.type = $scope.webUrl.type;
		}
	};
}]);

