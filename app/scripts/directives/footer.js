'use strict';

/**
 * @ngdoc directive
 * @name ngEasyjApp.directive:footer
 * @description
 * # footer
 */
angular.module('ngEasyjApp')
	.directive('footer', function () {
		return {
			templateUrl: 'views/footer.html',
			restrict: 'E',
			controller: function($scope) {
				$scope.date = new Date();
			},
			controlerAs: 'foot',
		};
	});
