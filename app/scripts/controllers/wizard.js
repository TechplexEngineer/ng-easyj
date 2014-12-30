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
			numPWM: 10,
			numSol: 8,
		};

		wiz.robot = {
			//step 1
			hasDrivetrain: undefined,
			numMotors: undefined,
			speedController: undefined,
			driveType: undefined,
			controllers: {},
			//step 2
			solenoids: [
				{
					name:'',
					port:'',
					type:''
				}],
			hasPneumatics: undefined,
		}
		// wiz.controllers = {};
		// wiz.solenoids = {};

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

		// wiz.next = function() {
		// 	wiz.step ++;
		// 	$window.location.href = '#/wizard/'+wiz.step;
		// };

		wiz.goto = function(s) {
			wiz.step = s
			$window.location.href = '#/wizard/'+wiz.step;
		};

		//----------------------------------------------------------------------
		wiz.step1 = {};

		wiz.step1.getControllerNames = function() {
			var out = [];
			if (wiz.robot.numMotors == 2) {
				out = ['left','right'];
			} else if (wiz.robot.numMotors == 4) {
				out = ['frontLeft','rearLeft','frontRight','rearRight'];
			} else if (wiz.robot.numMotors == 6) {
				out = ['frontLeft','midLeft','rearLeft','frontRight','midRight','rearRight'];
			}
			return out;
		};
		wiz.step1.getPWM = function() {
			return _.range(0, wiz.brain.numPWM);
		};

		wiz.step1.isPWMUsed = function(n) {
			var out = false;
			for (var property in wiz.robot.controllers) {
				if (wiz.robot.controllers.hasOwnProperty(property)) {
					if (wiz.robot.controllers[property] == n) {
						out = true;
						break;
					}
				}
			}
			return out;
		};

		//----------------------------------------------------------------------
		wiz.step2 = {};
		wiz.step2.getSolenoids = function() {
			return wiz.robot.solenoids;
		};
		wiz.step2.isSolPortUsed = function(n) {
			var out = false;
			for (var property in wiz.robot.solenoids) {
				if (wiz.robot.solenoids.hasOwnProperty(property)) {
					if (wiz.robot.solenoids[property] == n) {
						out = true;
						break;
					}
				}
			}
			return out;
		};
		wiz.step2.getNumSolPorts = function() {
			return _.range(0, wiz.brain.numSol);
		};

		wiz.step2.getNumSolenoids = function() {
			var num = _.size(wiz.robot.solenoids);
			if (num < wiz.brain.numSol) {
				num ++;
			}
			return _.range(0, num);
		};
		wiz.step2.addSolenoid = function() {
			wiz.robot.solenoids['changeme'] = "";
		};

		wiz.step2.removeSolenoid = function() {
			//@todo
		};
		


	});
