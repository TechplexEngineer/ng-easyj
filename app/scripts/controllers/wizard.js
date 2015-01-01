'use strict';

//@todo check names to make sure they are java safe (can't start with a number)
//@todo tow way data binding not working on select ports options

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
			ds: {
				numUSB:4
			},
			sensors: {
				numAnalog:4,
				numDigital:10,
			},
			numRelay: 4
		};
		//empty templates
		var EMPTY_SOL = {name:'',port:'',type:''};
		var EMPTY_CON = _.clone(EMPTY_SOL);
		var EMPTY_HID = _.clone(EMPTY_SOL);
		var EMPTY_AIO = _.clone(EMPTY_SOL);
		var EMPTY_DIO = _.clone(EMPTY_SOL);
		var EMPTY_SUB = {name:'', actions:[]};
		var EMPTY_CMD = {name:'', requires:[]};

		//the data about the user's robot stored here
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

			hids: [{name:'JS1',port:'',type:''}],
			sensors:{
				analog: [],
				digital: [],
			},
			// This really should be conditional based on the users earlier selected pref
			subsystems:[{name:'Drivetrain',actions:['drive','turn','drive with hid']}],

			commands:[{"name": "ArcadeDrive","requires": ["Drivetrain"],"type": "cmd"}],


		};

		// if (!$stateParams.step) {
		// 	$window.location.href = '#/wizard/1';
		// }
		wiz.step = $stateParams.step || 1;

		wiz.isStep = function(s) {
			return s == wiz.step;
		};

		wiz.getProgressClass = function(s) {
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

		//navigate to a different step
		wiz.goto = function(s) {
			wiz.step = s;
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
			}
			return out;
		};

		wiz.step1.numMotorsChange = function (){
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
			});
		};
		//----------------------------------------------------------------------
		wiz.step3 = {};
		wiz.step3.getNumUSBPorts = function() {
			return _.range(0, wiz.brain.ds.numUSB);
		};
		wiz.step3.isUSBPortUsed = function(n) {
			var out = false;
			n=n.toString();
			for (var i = 0; i < wiz.robot.hids.length; i++) {
				if (wiz.robot.hids[i].port === n) {
					out = true;
					break;
				}
			}
			return out;
		};
		wiz.step3.addHID = function() {
			if (wiz.robot.hids.length < wiz.brain.ds.numUSB) {
				wiz.robot.hids.push(_.clone(EMPTY_HID));
			}
		};
		wiz.step3.removeHID = function(item) {
			wiz.robot.hids = wiz.robot.hids.filter(function(el){
				return el !== item;
			});
		};
		//----
		
		wiz.step3.getNumAnalogPorts = function() {
			return _.range(0, wiz.brain.sensors.numAnalog);
		};
		wiz.step3.isAnalogPortUsed = function(n) {
			var out = false;
			n=n.toString();
			for (var i = 0; i < wiz.robot.sensors.analog.length; i++) {
				if (wiz.robot.sensors.analog[i].port === n) {
					out = true;
					break;
				}
			}
			return out;
		};
		wiz.step3.addAnalogSensor = function() {
			if (wiz.robot.sensors.analog.length < wiz.brain.sensors.numAnalog) {
				wiz.robot.sensors.analog.push(_.clone(EMPTY_AIO));
			}
		};
		wiz.step3.removeAnalogSensor = function(item) {
			wiz.robot.sensors.analog = wiz.robot.sensors.analog.filter(function(el){
				return el !== item;
			});
		};

		//----
		
		wiz.step3.getNumDigitalPorts = function() {
			return _.range(0, wiz.brain.sensors.numDigital);
		};
		wiz.step3.isDigitalPortUsed = function(n) {
			var out = false;
			n=n.toString();
			for (var i = 0; i < wiz.robot.sensors.digital.length; i++) {
				if (wiz.robot.sensors.digital[i].port === n) {
					out = true;
					break;
				}
			}
			return out;
		};
		wiz.step3.addDigitalSensor = function() {
			if (wiz.robot.sensors.digital.length < wiz.brain.sensors.numDigital) {
				wiz.robot.sensors.digital.push(_.clone(EMPTY_AIO));
			}
		};
		wiz.step3.removeDigitalSensor = function(item) {
			wiz.robot.sensors.digital = wiz.robot.sensors.digital.filter(function(el){
				return el !== item;
			});
		};

		//----------------------------------------------------------------------
		wiz.step4 = {};
		wiz.step4.addSubsystem = function() {
			wiz.robot.subsystems.push(_.clone(EMPTY_SUB));

		};
		wiz.step4.removeSubsystem = function(item) {
			wiz.robot.subsystems = wiz.robot.subsystems.filter(function(el){
				return el !== item;
			});
		};

		//----------------------------------------------------------------------
		wiz.step5 = {};
		wiz.step5.addCommand = function() {
			wiz.robot.commands.push(_.clone(EMPTY_CMD));
		};
		wiz.step5.removeCommand = function(item) {
			wiz.robot.commands = wiz.robot.commands.filter(function(el){
				return el !== item;
			});
		};
		wiz.step5.addRequires = function(cmd) {
			if (cmd.requires.length < wiz.robot.subsystems.length
				&& _.indexOf(cmd.requires, "") == -1 ) {//not in list
				cmd.requires.push("");
			}

		};

	});
