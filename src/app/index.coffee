angular.module "easyj", [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngRoute',
  'easyj.wizard']
  .config ($routeProvider) ->
    $routeProvider
      .when "/",
        templateUrl: "app/index/index.html"
        controller: "IndexCtrl"
      .when "/about",
        templateUrl: "app/main/main.html"
        controller: "MainCtrl"
      # .otherwise
      #   redirectTo: "/"

