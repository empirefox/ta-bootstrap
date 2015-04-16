'use strict';

angular.module('ta.bootstrap.fm').config(['$translateProvider',
function($translateProvider) {
	$translateProvider.translations('en-US', {
		TA_FM_TOOLTIP : 'View Files',
		TA_FM_OK : 'Ok',
		TA_FM_CANCEL : 'Cancel',

		TA_FM_THUMBNAIL : 'Thumbnail',
		TA_FM_LIST : 'List',

		TA_FM_NAME : 'Name',
		TA_FM_SIZE : 'Size',
		TA_FM_EXT : 'File Type',

		TA_FM_MOVE_UP : 'Move Up',
		TA_FM_SORT_REVERSE : 'Sort Reverse',

        TA_FA_TITLE_VIDEO : 'Video',
        TA_FA_TITLE_IMAGE : 'Image',

        TA_FM_TYPE_VIDEO : 'Video',
        TA_FM_TYPE_IMAGE : 'Image'
	});
}]);