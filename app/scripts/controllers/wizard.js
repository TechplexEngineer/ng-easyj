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
		//constants for the RoboRio controller
		wiz.brain = {
			numPWM: 10
		};
		wiz.controllers = {};

		if (!$stateParams.step) {
			$window.location.href = '#/wizard/1';
		}
		wiz.step = $stateParams.step || 1;

		wiz.isStep = function(s) {
			return s == wiz.step;
		};

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
		};

		wiz.next = function() {
			wiz.step ++;
			$window.location.href = '#/wizard/'+wiz.step;
		};
		wiz.getControllers = function() {
			var out = [];
			if (wiz.numMotors == 2) {
				out = ['left','right'];
			} else if (wiz.numMotors == 4) {
				out = ['frontLeft','rearLeft','frontRight','rearRight'];
			} else if (wiz.numMotors == 6) {
				out = ['frontLeft','midLeft','rearLeft','frontRight','midRight','rearRight'];
			}
			return out;
		};
		wiz.isPADisabled = function(n) {
			var out = false;
			for (var property in wiz.controllers) {
				if (wiz.controllers.hasOwnProperty(property)) {
					// console.log(wiz.controllers[property] == n);
					if (wiz.controllers[property] == n) {
						out = true;
						break;
					}
				}
			}
			// for (var i = 0; i < wiz.controllers.length; i++) {
			// 	console.log(wiz.controllers[i]);
			// 	if (wiz.controllers[i] == n)
			// 		out = true;
			// 		break;
			// };
			return out;

		}

	});
