'use strict';

/**
 * @ngdoc function
 * @name ngEasyjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngEasyjApp
 */
angular.module('ngEasyjApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
