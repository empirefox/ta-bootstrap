'use strict';

angular.module('ta.bootstrap.label').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_LABEL_TOOLTIP : 'Insert Alert',
		TA_LABEL_INSERT : 'Insert Alert',
		TA_LABEL_OK : 'Ok',
		TA_LABEL_CANCEL : 'Cancel',

		TA_LABEL_TYPE : 'Type',

		TA_LABEL_DEFAULT : 'Default',
		TA_LABEL_PRIMARY : 'Primary',
		TA_LABEL_SUCCESS : 'Success',
		TA_LABEL_INFO : 'Info',
		TA_LABEL_WARNING : 'Warning',
		TA_LABEL_DANGER : 'Danger',
		TA_BADGE : 'Badge'
	});
}]);