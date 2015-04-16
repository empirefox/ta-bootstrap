'use strict';

angular.module('ta.bootstrap.helper', ['textAngular']).factory('helper', ['taSelection',
function(taSelection) {
	var htmlTplSplitReg = /(\s+)|<br>|\|/g;
	var helper = {
		getElement : function(scope) {
			var _selection = taSelection.getSelectionElement();
			if (angular.isDefined(_selection)) {
				var element = angular.element(_selection);
				return _selection === scope.$editor().displayElements.text[0] ? element.children().eq(0) : element;
			}
		},
		getRange : function() {
			var sel = rangy.getSelection();
			if (sel.rangeCount) {
				return sel.getRangeAt(0);
			}
		},
		getRangeText : function() {
			var sel = rangy.getSelection();
			if (sel.rangeCount) {
				var range = sel.getRangeAt(0);
				return range.toString();
			}
		},
		newPopBtn : function(icon) {
			return angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="' + icon + '"></i></button>');
		}
	};

	helper.replaceWith = function($modal, ops) {
		var defaultOps = {
			templateUrl : '/views/' + ops.name + '/' + ops.name + '.html',
			controller : ops.name + 'ModalInstanceCtrl',
			resolve : {
				data : function() {
					return {
						text : helper.getRangeText()
					};
				}
			}
		};
		return function(deferred, restoreSelection) {
			$modal.open(angular.extend(defaultOps, ops)).result.then(function($element) {
				restoreSelection();
				var range = helper.getRange();
				if (range) {
					range.deleteContents();

					var tempNode = document.createElement('div');
					range.insertNode(tempNode);

					var nodes = ops.html.match(htmlTplSplitReg).map(function(seg) {
						switch (seg) {
							case '|':
								return $element[0];
							case '<br>':
								return document.createElement('br');
						}
						return document.createTextNode(seg.replace(/\s/g, '\xa0'));
					});
					for (var i = nodes.length - 1; i >= 0; i--) {
						range.insertNode(nodes[i]);
					};

					range = rangy.createRange();
					range.selectNode(tempNode);
					rangy.getSelection().setSingleRange(range);
					range.deleteContents();
				}
				// also can use
				// http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div/6691294#6691294
				// like this
				// pasteHtmlAtCaret(selectedItem.outerHTML);
			}).finally(function() {
				restoreSelection();
				deferred.resolve();
			});
			return false;
		};
	};
	return helper;
}]);
