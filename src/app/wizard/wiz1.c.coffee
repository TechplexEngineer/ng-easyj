# class Wiz1Ctrl
#   constructor: (@$scope, @$location) ->
#     @$scope.date = new Date()
#     console.log("Here");

#   isActive: (viewLocation) ->
#     return viewLocation == @$location.path();



# angular.module "easyj.wizard", ['ngRoute']
#   .controller "Wiz1Ctrl", ["$scope","$location", Wiz1Ctrl]

angular.module "easyj.wizard"
  .controller "Wiz1Ctrl", ($scope) ->
    console.log("here wiz1");

# app = angular.module "easyj.wizard", []
# app.factory 'RobotData', ['', () ->
#   new class RobotData
#     constructor: ->
#       @timestamp = Date.now() - 900000
#       @getNewTweets()

#     getNewTweets: ->
#       request = $http.get '/tweets', params: { ts: @timestamp }
#       request.then (result) =>
#         @tweets = result.data
#         @timestamp = Date.now()
#   ]


