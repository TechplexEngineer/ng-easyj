'use strict';

/**
 * @ngdoc function
 * @name ngEasyjApp.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the ngEasyjApp
 */
angular.module('ngEasyjApp')
  .controller('WizardCtrl', function ($stateParams,$window) {
  	var wiz = this;

  	if (!$stateParams.step) {
  		$window.location.href = '#/wizard/1';
  	}
  	wiz.step = $stateParams.step || 1;
  	console.log(wiz.step);

 	wiz.isStep = function(s) {
  		return s == wiz.step;
  	}

  	wiz.getClass = function(s) {
  		var out = 'disabled';
  		if (wiz.step > s){
  			out = 'complete';
  		} else if (wiz.step == s) {
  			out = 'active';
  		} else {
  			out = 'disabled';
  		}
  		return out;
  	}
  });
