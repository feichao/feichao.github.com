(function() {
  'use strict';

  /**
   * @ngInject
   */
  function secondConfig($stateProvider) {
    $stateProvider.state('dashboard.second', {
      url: '/second',
      templateUrl: 'app/dashboard/second/second.html',
      controllerAs: 'vm',
      controller: 'SecondCtrl',
      resolve: SecondCtrl.resolve
    });
  }

  /**
   * @ngInject
   */
  function SecondCtrl() {
    var vm = this;
  }

  SecondCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function() {
      return true;
    }
  };

  angular
    .module('myApp.dashboard')
    .controller('SecondCtrl', SecondCtrl)
    .config(secondConfig);

})();
