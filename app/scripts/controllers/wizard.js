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
		var EMPTY_SOL = {name:'',port:'',type:''};
		var EMPTY_CON = {name:'',port:'',type:''};

		wiz.robot = {
			//step 1
			hasDrivetrain: undefined,
			numMotors: undefined,
			// numMotorsPrev: undefined,
			speedController: undefined,
			driveType: undefined,
			controllers: [],
			//step 2
			solenoids: [_.clone(EMPTY_SOL)],
			hasPneumatics: undefined,
		}
		// wiz.controllers = {};
		// wiz.solenoids = {};

		// if (!$stateParams.step) {
		// 	$window.location.href = '#/wizard/1';
		// }
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

		wiz.step1.numMotorsChange = function (){

			var controllers = [];
			if (wiz.robot.numMotors == 2) {
				controllers = ['left','right'];
			} else if (wiz.robot.numMotors == 4) {
				controllers = ['frontLeft','rearLeft','frontRight','rearRight'];
			}
			// else if (wiz.robot.numMotors == 6) {
			// 	controllers = ['frontLeft','midLeft','rearLeft','frontRight','midRight','rearRight'];
			// }
			for (var i = 0; i < controllers.length; i++) {
				var con = _.clone(EMPTY_CON);
				con.name = controllers[i];
				con.type = wiz.robot.speedController;
				wiz.robot.controllers.push(con);
			}

		};

		//----------------------------------------------------------------------
		wiz.step2 = {};
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

		wiz.step2.addSolenoid = function() {
			if (wiz.robot.solenoids.length < wiz.brain.numSol) {
				wiz.robot.solenoids.push(_.clone(EMPTY_SOL));
			}

		};
		wiz.step2.removeSolenoid = function(item) {
			wiz.robot.solenoids = wiz.robot.solenoids.filter(function(el){
				return el !== item;
			})
		};


	});
