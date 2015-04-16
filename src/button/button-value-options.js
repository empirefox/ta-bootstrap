'use strict';

angular.module('ta.bootstrap.button').value('buttonOptions', {
	types : [{
		text : 'TA_BTN_DEFAULT',
		name : 'btn-default'
	}, {
		text : 'TA_BTN_PRIMARY',
		name : 'btn-primary'
	}, {
		text : 'TA_BTN_SUCCESS',
		name : 'btn-success'
	}, {
		text : 'TA_BTN_INFO',
		name : 'btn-info'
	}, {
		text : 'TA_BTN_WARNING',
		name : 'btn-warning'
	}, {
		text : 'TA_BTN_DANGER',
		name : 'btn-danger'
	}, {
		text : 'TA_BTN_LINK',
		name : 'btn-link'
	}],

	sizes : [{
		text : 'TA_BTN_SIZE_LARGE',
		name : ' btn-lg'
	}, {
		text : 'TA_BTN_SIZE_DEFAULT',
		name : ''
	}, {
		text : 'TA_BTN_SIZE_SMALL',
		name : ' btn-sm'
	}, {
		text : 'TA_BTN_SIZE_XSMALL',
		name : ' btn-xs'
	}]
});
