(function() {
  'use strict';

  /**
   * @ngInject
   */
  function LoginService($http, $state, $q, $window, StorageManager, Constant, Util) {

    var loginService = {};

    loginService.login = function(data, ev, autoLogin) {

      var deferred = $q.defer();
      StorageManager.setAutoLogin(autoLogin || false);
      StorageManager.setUser({
        userid: '1024',
        username: 'Admin',
        email: 'admin@admin.com',
        usertype: 'admin'
      });

      deferred.resolve();
      $state.go('dashboard.first');
      return deferred.promise;


      // return $http.post(Constant.URL.LOGIN, data)
      //   .success(loginComplete);

      // function loginComplete(response) {
      //   if (response.ret !== 0) {
      //     StorageManager.deleteToken();
      //     StorageManager.deleteUser();
      //     StorageManager.deleteAutoLogin();
      //     Util.showError(response.ret);
      //   } else {
      //     StorageManager.setToken(response.token);
      //     StorageManager.setAutoLogin(autoLogin || false);
      //     StorageManager.setUser({
      //       userid: response.user_id,
      //       username: response.user_name,
      //       email: response.email,
      //       usertype: response.user_role
      //     });

      //     var currentPath = StorageManager.getPath();
      //     if (currentPath) {
      //       $window.location.href = currentPath;
      //       StorageManager.deletePath();
      //     } else {
      //       $state.go('dashboard.first');
      //     }
      //   }
      // }
    };

    loginService.autoLogin = function() {
      var autoLogin = StorageManager.getAutoLogin();
      if (autoLogin) {
        var deferred = $q.defer();
        deferred.resolve();
        $state.go('dashboard.first');
        return deferred.promise;

        // $http.get(Constant.URL.CHECK_LOGIN)
        //   .success(function(response) {
        //     if (response.ret !== 0) {
        //       deferred.reject();
        //       StorageManager.deleteToken();
        //       StorageManager.deleteUser();
        //       StorageManager.deleteAutoLogin();
        //     } else {
        //       deferred.resolve();
        //       $state.go('dashboard.first');
        //     }
        //   });
        // return deferred.promise;
      }
    };

    return loginService;
  }

  angular
    .module('myApp.login')
    .factory('LoginService', LoginService);

})();
