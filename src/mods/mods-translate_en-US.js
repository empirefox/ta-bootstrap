'use strict';

angular.module('ta.bootstrap.mods').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_JUSTIFY_TOOLTIP : 'Align text full',
		TA_QUOTE_REVERSE_TOOLTIP : 'Toggle quote direction'
	});
}]);