'use strict';

// require jquery
angular.module('ta.bootstrap.snippet', ['textAngular', 'pascalprecht.translate'])
// tool
.run(['taRegisterTool', '$translate', '$modal', 'helper', 'rvOptions', 'fmVendor',
function(taRegisterTool, $translate, $modal, helper, rvOptions, fmVendor) {
    taRegisterTool('snippet', {
        iconclass : "fa fa-toggle-right",
        tooltiptext : $translate.instant('TA_RI_TOOLTIP'),
        action : helper.replaceWith($modal, {
            templateUrl : '/views/filemanager/filemanager.html',
            controller : 'fmModalInstanceCtrl',
            size : 'lg',
            resolve : {
                data : function() {
                    return fmVendor(rvOptions.vendor);
                }
            },
            html : ' <br>|<br> '
        })
    });
}]);

