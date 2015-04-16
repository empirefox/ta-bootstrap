'use strict';

// require jquery
angular.module('ta.bootstrap.button', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.tpl', 'pascalprecht.translate', 'ui.bootstrap'])
// btn: [type:Object, size:Object, block:string, url:string, text:string,
// target:string]
.controller('buttonModalInstanceCtrl', ['$scope', '$translate', '$modalInstance', 'buttonOptions', 'data',
function($scope, $translate, $modalInstance, buttonOptions, data) {
	angular.extend($scope, buttonOptions);
	data.type = data.type || buttonOptions.types[0];
	data.size = data.size || buttonOptions.sizes[1];
	$scope.btn = data;

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.ok = function() {
		var item = angular.element('<a class="btn">');
		item.addClass(data.type.name).addClass(data.size.name).addClass(data.block).attr('href', data.url).text(data.text || $translate.instant(data.type.text));
		if (data.target) {
			item.attr('target', '_black');
		}
		$modalInstance.close(item);
	};
}]).run(['taRegisterTool', '$translate', '$modal', 'buttonOptions', 'helper',
function(taRegisterTool, $translate, $modal, buttonOptions, helper) {
	var name = 'button';
	taRegisterTool(name, {
		iconclass : "fa fa-link",
		tooltiptext : $translate.instant('TA_BTN_TOOLTIP'),
		action : helper.replaceWith($modal, {
			name : name,
			html : ' | '
		}),
		activeState : function(commonElement) {
			if (commonElement)
				return commonElement[0].tagName === 'A';
			return false;
		},
		onElementSelect : {
			element : 'a',
			action : function(event, $element, editorScope) {
				// setup the editor toolbar
				// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar
				// logic
				event.preventDefault();
				editorScope.displayElements.popover.css('width', '435px');
				var container = editorScope.displayElements.popoverContainer;
				container.empty();
				container.css('line-height', '28px');
				var link = angular.element('<a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('href') + '</a>');
				link.css({
					'display' : 'inline-block',
					'max-width' : '260px',
					'overflow' : 'hidden',
					'text-overflow' : 'ellipsis',
					'white-space' : 'nowrap',
					'vertical-align' : 'middle'
				});
				container.append(link);
				var buttonGroup = angular.element('<div class="btn-group pull-right">');
				var reLinkButton = helper.newPopBtn('fa fa-edit');
				reLinkButton.on('click', function(event) {
					event.preventDefault();

					// btn properties: [type:Object, size:Object, block:string, url:string,
					// text:string, target:string]
					var btn = {
						url : $element.attr('href'),
						target : $element.attr('target') === '_blank',
						text : $element.text(),
						block : $element.hasClass('btn-block') ? 'btn-block' : ''
					};
					buttonOptions.types.some(function(type) {
						if ($element.hasClass(type.name)) {
							btn.type = type;
							return true;
						}
						return false;
					});
					buttonOptions.sizes.some(function(size) {
						if ($element.hasClass(size.name)) {
							btn.size = size;
							return true;
						}
						return false;
					});

					var tempCssClass = "btnTargetTemp_" + (+new Date());
					$element.addClass(tempCssClass);
					var getElement = function() {
						return editorScope.displayElements.text.find('.' + tempCssClass);
					};

					$modal.open({
						windowTemplateUrl : '/views/util/modal-window.html',
						templateUrl : "/views/button/button.html",
						controller : 'buttonModalInstanceCtrl',
						resolve : {
							data : function() {
								return btn;
							}
						}
					}).result.then(function(item) {
						getElement().replaceWith(item);
					}).finally(function() {
						getElement().removeClass(tempCssClass);
						editorScope.updateTaBindtaTextElement();
						editorScope.hidePopover();
					});
				});
				buttonGroup.append(reLinkButton);
				var unLinkButton = helper.newPopBtn('fa fa-unlink');
				// directly before this click event is fired a digest is fired off whereby the
				// reference to $element is orphaned off
				unLinkButton.on('click', function(event) {
					event.preventDefault();
					$element.replaceWith($element.contents());
					editorScope.updateTaBindtaTextElement();
					editorScope.hidePopover();
				});
				buttonGroup.append(unLinkButton);
				container.append(buttonGroup);
				editorScope.showPopover($element);
			}
		}
	});
}]);

