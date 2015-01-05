app = angular.module "easyj.wizard", []
app.factory 'RobotData', ['', () ->
  new class RobotData
    constructor: ->
      @timestamp = Date.now() - 900000
      @getNewTweets()

    getNewTweets: ->
      request = $http.get '/tweets', params: { ts: @timestamp }
      request.then (result) =>
        @tweets = result.data
        @timestamp = Date.now()
  ]
