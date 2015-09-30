(function() {
  'use strict';

  angular
    .module('myApp.shared')
    .factory('Util', Util);

  /**
   * @ngInject
   */
  function Util($translate, $mdToast) {
    var util = {};

    util.showError = function(code) {
      $translate('Error' + code).then(function(msg) {
        $mdToast.show(
          $mdToast.simple()
          .content(msg)
          .position('right top')
          .hideDelay(3000)
        );
      });
    };

    util.unique = function(arr){
      var temp = {}, result = [];
      arr.forEach(function(dt){
        if(!temp[dt.id]){
          result.push(dt);
          temp[dt.id] = true;
        }
      });

      return result;
    };

    return util;
  }

})();
