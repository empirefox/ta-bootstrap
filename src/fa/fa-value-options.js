'use strict';

angular.module('ta.bootstrap.fa').value('faOptions', {
	icon : {},
	front : {
		name : 'fa-user',
		btnType : 'btn-success',
		tittleType : 'text-success'
	},
	back : {
		name : 'fa-circle',
		btnType : 'btn-primary',
		tittleType : 'text-primary'
	},

	sets : {
		sizes : [{
			text : 'TA_FA_SIZE_DEFAULT'
		}, {
			text : 'TA_FA_SIZE_LG',
			value : 'fa-lg'
		}, {
			text : 'TA_FA_SIZE_2X',
			value : 'fa-2x'
		}, {
			text : 'TA_FA_SIZE_3X',
			value : 'fa-3x'
		}, {
			text : 'TA_FA_SIZE_4X',
			value : 'fa-4x'
		}, {
			text : 'TA_FA_SIZE_5X',
			value : 'fa-5x'
		}],

		directions : [{
			pic : 'fa-arrow-up',
			tooltip : 'TA_FA_DIR_DEFAULT'
		}, {
			pic : 'fa-arrow-right',
			tooltip : 'TA_FA_DIR_RIGHT',
			value : 'fa-rotate-90'
		}, {
			pic : 'fa-arrow-down',
			tooltip : 'TA_FA_DIR_DOWN',
			value : 'fa-rotate-180'
		}, {
			pic : 'fa-arrow-left',
			tooltip : 'TA_FA_DIR_LEFT',
			value : 'fa-rotate-270'
		}, {
			pic : 'fa-arrows-h',
			tooltip : 'TA_FA_DIR_FLAP_H',
			value : 'fa-flip-horizontal'
		}, {
			pic : 'fa-arrows-v',
			tooltip : 'TA_FA_DIR_FLAP_V',
			value : 'fa-flip-vertical'
		}],
		colors : ['', 'text-muted', 'text-primary', 'text-success', 'text-info', 'text-warning', 'text-danger']
	}
});
