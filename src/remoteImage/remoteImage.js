'use strict';

// require jquery
angular.module('ta.bootstrap.remoteImage', ['textAngular', 'ta.bootstrap.helper', 'ta.bootstrap.fm', 'pascalprecht.translate'])
// tool
.run(['taRegisterTool', '$translate', '$modal', 'helper', 'riOptions', 'fmVendor',
function(taRegisterTool, $translate, $modal, helper, riOptions, fmVendor) {
	taRegisterTool('remoteImage', {
		iconclass : "fa fa-image",
		tooltiptext : $translate.instant('TA_RI_TOOLTIP'),
		action : helper.replaceWith($modal, {
			templateUrl : '/views/filemanager/filemanager.html',
			controller : 'fmModalInstanceCtrl',
			size : 'lg',
			resolve : {
				data : function() {
					return fmVendor(riOptions.vendor);
				}
			},
			html : ' | '
		})
	});
}]);

