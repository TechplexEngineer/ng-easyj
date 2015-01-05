angular.module "easyj.wizard", ['ngRoute']
  .config ($routeProvider) ->
    console.log("easyj.wiz routes");
    $routeProvider
      .when "/wizard",
        redirectTo: "/wizard/1"
      .when "/wizard/1",
        templateUrl: "app/wizard/wiz_1.html"
        controller: "Wiz1Ctrl"
      # .when "/wizard/2",
      #   templateUrl: "app/wizard/wiz_2.html"
      #   controller: "Wiz2Ctrl"
      # .when "/wizard/3",
      #   templateUrl: "app/wizard/wiz_3.html"
      #   controller: "Wiz3Ctrl"
      # .when "/wizard/4",
      #   templateUrl: "app/wizard/wiz_4.html"
      #   controller: "Wiz4Ctrl"
      # .when "/wizard/5",
      #   templateUrl: "app/wizard/wiz_5.html"
      #   controller: "Wiz5Ctrl"
      # .when "/wizard/6",
      #   templateUrl: "app/wizard/wiz_6.html"
      #   controller: "Wiz6Ctrl"
