'use strict';

/**
 * @ngdoc directive
 * @name ngEasyjApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('ngEasyjApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E'
    };
  });
