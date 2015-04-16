'use strict';

angular.module('ta.bootstrap.alert').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
        TA_ALERT_TOOLTIP : 'Insert Alert',
        TA_ALERT_INSERT : 'Insert Alert',
		TA_ALERT_OK : 'Ok',
		TA_ALERT_CANCEL : 'Cancel',

		TA_ALERT_TYPE : 'Type',
		TA_ALERT_SPECIAL_ATTRS : 'Opstions',
		TA_ALERT_HIDE_ICON : 'Hide icon',
		TA_ALERT_HIDE_TITLE : 'Hide title',
		TA_ALERT_HIDE_CONTENT : 'Hide content',

		TA_ALERT_SUCCESS : 'Success',
		TA_ALERT_SUCCESS_TITLE : 'Well done!',
		TA_ALERT_SUCCESS_CONTENT : 'You successfully read this important alert message.',

		TA_ALERT_INFO : 'Info',
		TA_ALERT_INFO_TITLE : 'Heads up!',
		TA_ALERT_INFO_CONTENT : 'This alert needs your attention, but it\'s not super important.',

		TA_ALERT_WARNING : 'Warning',
		TA_ALERT_WARNING_TITLE : 'Warning!',
		TA_ALERT_WARNING_CONTENT : 'Better check yourself, you\'re not looking too good.',

		TA_ALERT_DANGER : 'Danger',
		TA_ALERT_DANGER_TITLE : 'Oh snap!',
		TA_ALERT_DANGER_CONTENT : 'Change a few things up and try submitting again.'
	});
}]);