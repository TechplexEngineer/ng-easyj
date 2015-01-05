angular.module "easyj.wizard"
  .controller "ProgressCtrl", ($scope) ->
    this.getClass = (s) ->
      out = 'disabled';
      if wiz.step > s
        out = 'complete';
      else if wiz.step == s
        out = 'active';
      else
        out = 'disabled';
      return out;

