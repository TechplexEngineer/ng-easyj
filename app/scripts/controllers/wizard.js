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
		wiz.step1.getNumPWM = function() {
			return _.range(0, wiz.brain.numPWM);
		};

		wiz.step1.isPWMUsed = function(n) {
			var out = false;
			n=n.toString();
			for (var i = 0; i < wiz.robot.controllers.length; i++) {
				if (wiz.robot.controllers[i].port === n) {
					out = true;
					break;
				}
			};
			return out;
		};

		wiz.step1.numMotorsChange = function (){
			console.log("here");
			wiz.robot.controllers = [];
			var controllers = [];
			if (wiz.robot.numMotors == 2) {
				controllers = ['left','right'];
			} else if (wiz.robot.numMotors == 4) {
				controllers = ['frontLeft','rearLeft','frontRight','rearRight'];
			}
			// else if (wiz.robot.numMotors == 6) {
			// 	controllers = ['frontLeft','midLeft','rearLeft','frontRight','midRight','rearRight'];
			// }
			console.log(wiz.robot.numMotors, controllers);
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
			n=n.toString();
			for (var i = 0; i < wiz.robot.solenoids.length; i++) {
				if (wiz.robot.solenoids[i].port === n) {
					out = true;
					break;
				}
			};
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
