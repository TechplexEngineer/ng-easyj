'use strict';

/**
 * @ngdoc function
 * @name ngEasyjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngEasyjApp
 */
angular.module('ngEasyjApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
