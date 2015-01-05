class Controller
  constructor: (@$scope, @$location) ->
    @$scope.date = new Date()

  isActive: (viewLocation) ->
    return viewLocation == @$location.path();


Controller.$inject = ["$scope","$location"]
angular.module "easyj"
  .controller "NavbarCtrl", Controller


