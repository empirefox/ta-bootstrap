'use strict';

// require jquery
angular.module('ta.bootstrap.twa', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.twa.list', 'ta.bootstrap.tpl', 'angular-toArrayFilter', 'pascalprecht.translate', 'ui.bootstrap']);
angular.module('ta.bootstrap.twa').controller('twaModalInstanceCtrl', ['$scope', '$modalInstance', 'twaOptions', 'twas', 'data',
function($scope, $modalInstance, twaOptions, twas, data) {
	angular.extend($scope, twaOptions);
	$scope.current = twaOptions.front;
	$scope.icon = data;
	$scope.twas = twas;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.ok = function() {
		if ((data.name || '') === '') {
			return $scope.cancel();
		}
		var item = angular.element('<a class="twa">');
		item.addClass(data.size).addClass(data.name);
		$modalInstance.close(item);
	};
}]).run(['taRegisterTool', '$translate', '$modal', 'helper',
function(taRegisterTool, $translate, $modal, helper) {
	var name = 'twa';
	taRegisterTool(name, {
		iconclass : "twa twa-stuck-out-tongue-winking-eye",
		tooltiptext : $translate.instant('TA_TWA_TOOLTIP'),
		action : helper.replaceWith($modal, {
			name : name,
			html : ' | '
		})
	});
}]);

