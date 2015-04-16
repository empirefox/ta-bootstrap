angular.module('protractorApp', ['ta.bootstrap.button']).config(['$translateProvider',
function($translateProvider) {
	$translateProvider.preferredLanguage('en-US');
}]).controller('Ctrl', function($scope) {
	$scope.htmlVariable = "content";
});