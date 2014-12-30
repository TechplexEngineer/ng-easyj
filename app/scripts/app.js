'use strict';

/**
 * @ngdoc overview
 * @name ngEasyjApp
 * @description
 * # ngEasyjApp
 *
 * Main module of the application.
 */
angular
  
  .module('ngEasyjApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'Filters'
  ])
  // .run(function($rootScope) {
  //     $rootScope.isIDE = false;
  // })
  .config(function ($stateProvider, $urlRouterProvider) {
  	// $urlRouterProvider.when('/wizard', '/wizard/1');
	$stateProvider

	  .state('index', {
		url: '',
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
	  })
	  .state('about', {
		url: '/about',
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
	  })

	  .state('wizard', {
		url: '/wizard',
		templateUrl: 'views/wiz/wizard.html',
		controller: 'WizardCtrl',
	  })

	  .state('wizard.steps', {
		url: '/:step',
		templateUrl: function ($stateParams) {
			// console.log('step',$stateParams.step);
			return 'views/wiz/wiz_'+$stateParams.step+'.html';
		},
	  });
	  
	  $urlRouterProvider.otherwise('/');
  });

String.prototype.padLeft = function (l, c) {
	return new Array(l - this.length + 1).join(c || ' ') + this;
};
angular.module('Filters', []).
	filter('range', function () {
		return function (input, min, max) {
			min = parseInt(min); //Make string input int
			max = parseInt(max);
			for (var i = min; i < max; i++){
				input.push(i);//.toString().padLeft(2, '0')
		  }
			return input;
		};
	});