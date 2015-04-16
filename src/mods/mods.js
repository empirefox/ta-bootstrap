'use strict';

angular.module('ta.bootstrap.mods', ['textAngular', 'pascalprecht.translate', 'ta.bootstrap.helper'])
// mod
.run(['helper', 'taSelection', 'taTools', 'taRegisterTool', 'taTranslations', '$translate',
function(helper, taSelection, taTools, taRegisterTool, taTranslations, $translate) {
	var as = {
		left : 'justifyLeft',
		center : 'justifyCenter',
		right : 'justifyRight',
		justify : 'justifyFull'
	};

	function align(scope, dir) {
		var result = scope.$editor().wrapSelection(as[dir], null);
		var element = helper.getElement(scope);
		if (element) {
			if (element.css('text-align') === dir) {
				element.css('text-align', '');
			}
			if (element.attr('align') === dir) {
				element.removeAttr('align');
			}
			var remove = element.hasClass('text-' + dir);
			Object.keys(as).forEach(function(align) {
				element.removeClass('text-' + align);
			});
			if (!remove) {
				element.addClass('text-' + dir);
			}
		}
		return result;
	}

	taRegisterTool('justify', {
		iconclass : 'fa fa-align-justify',
		tooltiptext : (taTranslations.justify || {}).tooltip || $translate.instant('TA_JUSTIFY_TOOLTIP'),
		action : function() {
			return align(this, 'justify');
		},
		activeState : function(commonElement) {
			commonElement = commonElement || this.$editor().displayElements.text.children().eq(0);
			return commonElement.hasClass('text-justify');
		}
	});

	taTools['justifyLeft'] = {
		iconclass : 'fa fa-align-left',
		tooltiptext : taTranslations.justifyLeft.tooltip,
		action : function() {
			return align(this, 'left');
		},
		activeState : function(commonElement) {
			commonElement = commonElement || this.$editor().displayElements.text.children().eq(0);
			return commonElement.hasClass('text-left');
		}
	};
	taTools['justifyRight'] = {
		iconclass : 'fa fa-align-right',
		tooltiptext : taTranslations.justifyRight.tooltip,
		action : function() {
			return align(this, 'right');
		},
		activeState : function(commonElement) {
			commonElement = commonElement || this.$editor().displayElements.text.children().eq(0);
			return commonElement.hasClass('text-right') || this.$editor().queryCommandState('justifyRight');
		}
	};
	taTools['justifyCenter'] = {
		iconclass : 'fa fa-align-center',
		tooltiptext : taTranslations.justifyCenter.tooltip,
		action : function() {
			return align(this, 'center');
		},
		activeState : function(commonElement) {
			commonElement = commonElement || this.$editor().displayElements.text.children().eq(0);
			return commonElement.hasClass('text-center') || this.$editor().queryCommandState('justifyCenter');
		}
	};

	taRegisterTool('quoteReverse', {
		iconclass : 'ng-class:{true:"fa-arrow-left",false:"fa-arrow-right"}[!reversed]; fa',
		tooltiptext : (taTranslations.quote || {}).tooltip || $translate.instant('TA_QUOTE_REVERSE_TOOLTIP'),
		action : function() {
			var element = helper.getElement(this);
			if (element) {
				if (element.prop('tagName').toUpperCase() !== 'BLOCKQUOTE') {
					element = element.parent();
					if (element.prop('tagName').toUpperCase() !== 'BLOCKQUOTE') {
						return;
					}
				}
				element.toggleClass('blockquote-reverse');
				this.reversed = element.hasClass('blockquote-reverse');
			}
		},
		activeState : function() {
			return this.$editor().queryFormatBlockState('blockquote');
		}
	});

    taRegisterTool('strike', {
        iconclass: 'fa fa-strikethrough',
        tooltiptext: taTranslations.underline.tooltip,
        action: function(){
            return this.$editor().wrapSelection("strikeThrough", null);
        },
        activeState: function(){
            return this.$editor().queryCommandState('strikeThrough');
        }
    });
}]);
