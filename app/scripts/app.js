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
    'ui.router'
  ])
  // .run(function($rootScope) {
  //     $rootScope.isIDE = false;
  // })
  .config(function ($stateProvider, $urlRouterProvider) {

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
