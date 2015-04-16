angular.module('protractorApp', ['ta.bootstrap.label']).config(['$translateProvider',
function($translateProvider) {
	$translateProvider.preferredLanguage('en-US');
}]).controller('Ctrl', function($scope) {
	$scope.htmlVariable = "content";
});