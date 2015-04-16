'use strict';

angular.module('ta.bootstrap.button').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_BTN_TOOLTIP : 'Insert button/link',
		TA_BTN_INSERT : 'Insert button/link',
		TA_BTN_OK : 'Ok',
		TA_BTN_CANCEL : 'Cancel',

		TA_BTN_TYPE : 'Type',
		TA_BTN_SIZE : 'Size',
		TA_BTN_SPECIAL_ATTRS : 'Opstions',
		TA_BTN_BLOCK : 'Block level',
		TA_BTN_OPEN_IN_NEW_WINDOW : 'New window',

		TA_BTN_PREVIEW : 'Preview',
		TA_BTN_ATTR : 'Attribute',

		TA_BTN_DEFAULT : 'Default',
		TA_BTN_PRIMARY : 'Primary',
		TA_BTN_SUCCESS : 'Success',
		TA_BTN_INFO : 'Info',
		TA_BTN_WARNING : 'Warning',
		TA_BTN_DANGER : 'Danger',
		TA_BTN_LINK : 'Link',

		TA_BTN_SIZE_LARGE : 'Large',
		TA_BTN_SIZE_DEFAULT : 'Default',
		TA_BTN_SIZE_SMALL : 'Small',
		TA_BTN_SIZE_XSMALL : 'Extra small'
	});
}]);