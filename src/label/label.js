'use strict';

// require jquery
angular.module('ta.bootstrap.label', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.tpl', 'pascalprecht.translate', 'ui.bootstrap']);
angular.module('ta.bootstrap.label').controller('labelModalInstanceCtrl', ['$scope', '$translate', '$modalInstance', 'labelOptions', 'data',
function($scope, $translate, $modalInstance, labelOptions, label) {
	angular.extend($scope, labelOptions);
	label.type = label.type || $scope.types[1];
	$scope.label = label;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.ok = function() {
		var item = angular.element('<span>').addClass(label.type.name).text(label.text || $translate.instant(label.type.text));
		$modalInstance.close(item);
	};
}]).run(['taRegisterTool', '$translate', '$modal', 'helper',
function(taRegisterTool, $translate, $modal, helper) {
	var name = 'label'
	taRegisterTool(name, {
		iconclass : "fa fa-warning",
		tooltiptext : $translate.instant('TA_ALERT_TOOLTIP'),
		action : helper.replaceWith($modal, {
			name : name,
			html : ' | '
		})
	});
}]);

