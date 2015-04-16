'use strict';

// require jquery
angular.module('ta.bootstrap.alert', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.tpl', 'pascalprecht.translate', 'ui.bootstrap']);
angular.module('ta.bootstrap.alert').directive('alertChooser', function() {
	return {
		restrict : 'A',
		link : function(scope, element) {
			scope.ok = function(name) {
				var node = angular.element(element.find('[name="' + name + '"]').get(0).outerHTML);
				node.removeAttr('ng-class').removeAttr('name');
				node.find('i').removeAttr('ng-class').removeAttr('ng-if').removeClass('ng-binding').removeClass('ng-scope');
				node.find('strong,span').removeAttr('class').removeAttr('ng-binding').removeAttr('ng-if');
				scope.confirm(node);
			};
		}
	};
}).controller('alertModalInstanceCtrl', ['$scope', '$modalInstance', 'alertOptions', 'data',
function($scope, $modalInstance, alertOptions, alert) {
	angular.extend($scope, alertOptions);
	alert.type = alert.type || $scope.types[1];
	$scope.alert = alert;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.confirm = function(item) {
		$modalInstance.close(item);
	};
}]).run(['taRegisterTool', '$translate', '$modal', 'helper',
function(taRegisterTool, $translate, $modal, helper) {
	var name = 'alert';
	taRegisterTool(name, {
		iconclass : "fa fa-warning",
		tooltiptext : $translate.instant('TA_ALERT_TOOLTIP'),
		action : helper.replaceWith($modal, {
			name : name,
			html : '<br> | <br>'
		})
	});
}]);

