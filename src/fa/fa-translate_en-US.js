'use strict';

angular.module('ta.bootstrap.fa').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_FA_INSERT : "Insert Icon",
		TA_FA_SIZE : "Size",
		TA_FA_DIRECTION : "Direction",
		TA_FA_SPECIAL_ATTRS : "Special Attributes",
		TA_FA_SPIN : "Spin",
		TA_FA_BORDER : "Border",
		TA_FA_PREVIEW : "Preview: ( click to edit | double click to insert directly )",
		TA_FA_COLOR : "Color",
		TA_FA_XCHANGE : "Back/Front",
		TA_FA_SELECT : 'Select Icon: ( click to edit | double click to insert directly  )',

		TA_FA_TOOLTIP : 'Insert FontAwesome Icon',

		TA_FA_SIZE_DEFAULT : 'Default Size',
		TA_FA_SIZE_LG : '1.3x',
		TA_FA_SIZE_2X : '2x',
		TA_FA_SIZE_3X : '3x',
		TA_FA_SIZE_4X : '4x',
		TA_FA_SIZE_5X : '5x',

		TA_FA_DIR_DEFAULT : 'Head up',
		TA_FA_DIR_RIGHT : 'Head right',
		TA_FA_DIR_DOWN : 'Head down',
		TA_FA_DIR_LEFT : 'Head left',
		TA_FA_DIR_FLAP_H : 'Flap horizontal',
		TA_FA_DIR_FLAP_V : 'Flap vertical'
	});
}]);