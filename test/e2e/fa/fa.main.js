angular.module('protractorApp', ['ta.bootstrap.fa']).config(['$translateProvider',
function($translateProvider) {
	$translateProvider.preferredLanguage('en-US');
}]).controller('Ctrl', function($scope) {
	$scope.htmlVariable = "content";
});