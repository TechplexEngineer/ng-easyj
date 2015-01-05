app = angular.module "easyj.wizard", []
app.factory 'RobotLimits', [() ->
  limits = {
    PWM: 10,
    Sol: 8,
    ds: {
      USB:4
    },
    sensors: {
      analog:4,
      digital:10,
    },
    relay: 4
  }
  return limits
]
