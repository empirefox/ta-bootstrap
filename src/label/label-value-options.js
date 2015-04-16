'use strict';

angular.module('ta.bootstrap.label').value('labelOptions', {
	types : [{
		text : 'TA_LABEL_DEFAULT',
		name : 'label label-default',
		color: 'btn-default'
	}, {
		text : 'TA_LABEL_PRIMARY',
		name : 'label label-primary',
        color: 'btn-primary'
	}, {
		text : 'TA_LABEL_SUCCESS',
		name : 'label label-success',
        color: 'btn-success'
	}, {
		text : 'TA_LABEL_INFO',
		name : 'label label-info',
        color: 'btn-info'
	}, {
		text : 'TA_LABEL_WARNING',
		name : 'label label-warning',
        color: 'btn-warning'
	}, {
		text : 'TA_LABEL_DANGER',
		name : 'label label-danger',
        color: 'btn-danger'
	}, {
		text : 'TA_BADGE',
		name : 'badge',
        color: 'badge'
	}]
});
