'use strict';

// require jquery
angular.module('ta.bootstrap.fa', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.fa.list', 'ta.bootstrap.tpl', 'pascalprecht.translate', 'ui.bootstrap']);
angular.module('ta.bootstrap.fa').directive('faPicker', function() {
	return {
		restrict : 'A',
		link : function(scope, element) {
			scope.add = function(name) {
				var i = angular.element(element.find('[name="' + name + '"]').get(0).outerHTML + ' ');
				i.removeAttr('ng-class').removeAttr('name');
				i.find('i').removeAttr('ng-class');
				scope.comfirm(i);
			};
		}
	};
}).controller('faModalInstanceCtrl', ['$scope', '$modalInstance', 'faOptions', 'fas',
function($scope, $modalInstance, faOptions, fas) {
	angular.extend($scope, faOptions);
	$scope.current = faOptions.front;
	$scope.fas = fas;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.comfirm = function(node) {
		$modalInstance.close(node);
	};
}]).run(['taRegisterTool', '$translate', '$modal', 'helper',
function(taRegisterTool, $translate, $modal, helper) {
	var name = 'fa';
	taRegisterTool(name, {
		iconclass : "fa fa-flag",
		tooltiptext : $translate.instant('TA_FA_TOOLTIP'),
		action : helper.replaceWith($modal, {
			name : name,
			html : ' | ',
			size : 'lg'
		})
	});
}]);

