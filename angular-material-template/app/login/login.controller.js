(function() {
  'use strict';

  /**
   * @ngInject
   */
  function LoginCtrl($state, $timeout, LoginService, initData, StorageManager, $translate) {

    var vm = this;
    vm.lang = initData.lang;

    vm.langChanged = function() {
      StorageManager.setLang(vm.lang);
      $translate.use(vm.lang);
    };

    vm.email = '';
    vm.password = '';
    vm.errorMsg = '';
    vm.login = function(isValid, ev) {
      if (!isValid) {
        return;
      }
      var data = {
        email: vm.email,
        password: vm.password
      };

      LoginService.login(data, ev, vm.autoLogin);
    };

    $timeout(function() {
      LoginService.autoLogin();
    }, 50);
  }

  /**
   * @ngInject
   */
  function loginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        resolve: LoginCtrl.resolve
      });
  }

  LoginCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function($translate, StorageManager) {
      var lang = StorageManager.getLang() || 'cn';
      $translate.use(lang);
      return {
        lang: lang
      };
    }
  };

  angular
    .module('myApp.login')
    .controller('LoginCtrl', LoginCtrl)
    .config(loginConfig);

})();
