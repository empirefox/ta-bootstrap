'use strict';

angular.module('ta.bootstrap.alert').value('alertOptions', {
	types : [{
		text : 'TA_ALERT_SUCCESS',
		name : 'alert-success',
		icon : 'fa-check-circle'
	}, {
		text : 'TA_ALERT_INFO',
		name : 'alert-info',
		icon : 'fa-info-circle'
	}, {
		text : 'TA_ALERT_WARNING',
		name : 'alert-warning',
		icon : 'fa-warning'
	}, {
		text : 'TA_ALERT_DANGER',
		name : 'alert-danger',
		icon : 'fa-bolt'
	}]
});
