'use strict';

// should not use it!!!
// warning: need modify ng-sanitize module
angular.module('ta.bootstrap.spectrum', ['textAngular', 'pascalprecht.translate']).run(['$q', 'taRegisterTool', '$translate',
function($q, taRegisterTool, $translate) {

	taRegisterTool('spectrum', {
		display : '<button spectrum-picker type="button"><i class="fa fa-stop" ng-style="{color:foreColor}"></i></button>',
		tooltiptext : $translate.instant('TA_SPECTRUM_TOOLTIP'),
		action : function(deferred, restoreSelection) {
			var $scope = this;
			$scope.onHide = function(color) {
				restoreSelection();
				$scope.setColor(color);
				// $scope.$editor().wrapSelection('forecolor', $scope.foreColor);
				deferred.resolve();
			};
			return false;
		}
	});
}]).directive('spectrumPicker', ['spectrumOptions',
function(spectrumOptions) {
	var spectrumOps = angular.extend({}, spectrumOptions);
	return {
		restrict : 'A',
		link : function(scope, element) {
			// init spectrum
			spectrumOps.hide = function(color) {
				scope.onHide(color);
			};
			element.spectrum(spectrumOps);
			scope.$on('$destroy', function() {
				element.spectrum('destroy');
			});

			// init classApplier
			var tempCssClass = "rangyTemp_" + (+new Date());
			var classApplier;
			var getClassApplier = function() {
				if (!classApplier) {
					classApplier = rangy.createClassApplier(tempCssClass, true);
				}
				return classApplier;
			};

			var cleanAttrs = function(target) {
				if (target.attr('class').trim() === '') {
					target.removeAttr('class');
				}
				if (target.attr('style').trim() === '') {
					target.removeAttr('style');
				}
			};

			var getTarget = function() {
				getClassApplier().applyToSelection();
				return scope.$editor().displayElements.text.find('.' + tempCssClass).removeClass(tempCssClass);
			};

			scope.setColor = function(color) {
				scope.foreColor = !color ? color : color.toString();
				var target = getTarget();
				target.css({
					color : color || ''
				});
				cleanAttrs(target);
			};
		}
	};
}]);
