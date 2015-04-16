angular.module('protractorApp', ['ta.bootstrap.fm']).config(['$translateProvider',
function($translateProvider) {
	$translateProvider.preferredLanguage('en-US');
}]).controller('Ctrl', function($scope, $modal, fmVendor) {
	$scope.tudousrc = 'http://www.tudou.com/programs/view/html5embed.action?code=PEq07Nfr5bY';
	$scope.openFm = function(vendor) {
		$modal.open({
			templateUrl : '/views/filemanager/filemanager.html',
			controller : 'fmModalInstanceCtrl',
			size : 'lg',
			resolve : {
				data : function() {
					return fmVendor(vendor);
				}
			}
		}).result.then(function(file) {
			console.log('then: ', file)
		});
	};
});