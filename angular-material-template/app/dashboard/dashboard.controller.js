(function() {
  'use strict';

  /**
   * @ngInject
   */
  function dashboardConfig($stateProvider, $httpProvider) {
    $stateProvider.state('dashboard', {
      abstract: true,
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controllerAs: 'vm',
      controller: 'DashboardCtrl',
      resolve: DashboardCtrl.resolve
    });
  }

  /**
   * @ngInject
   */
  function DashboardCtrl($location, $state, $mdDialog, StorageManager) {
    var vm = this;
    vm.userinfo = StorageManager.getUser();
    vm.userinfo.isRoot = vm.userinfo.usertype === 'admin';

    vm.logout = function() {
      StorageManager.deleteToken();
      StorageManager.deleteUser();
      StorageManager.deleteProject();
      StorageManager.deleteAutoLogin();
      $state.go('login');
    };

    vm.isActive = function(path) {
      return $location.path().indexOf(path) > -1;
    };

    vm.modifyUser = function(event) {
      $mdDialog.show({
        controller: ModifyUserCtrl,
        controllerAs: 'vm',
        templateUrl: 'modifyUser.html',
        targetEvent: event,
        resolve: {
          data: function() {
            return vm.userinfo;
          }
        }
      }).then(function() {}, function() {});
    };
  }

  /**
   * @ngInject
   */
  DashboardCtrl.resolve = {
    checkLoggedIn: function($q, $http, $state, $location, Constant) {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;

      // $http.get(Constant.URL.CHECK_LOGIN)
      //   .success(function(response) {
      //     if (response.ret !== 0) {
      //       deferred.reject();
      //       var currentPath = $location.absUrl();
      //       StorageManager.setPath(currentPath);
      //       $state.go('login');
      //     } else {
      //       deferred.resolve();
      //     }
      //   });

      // return deferred.promise;
    },
    initData: function($translate, StorageManager, checkLoggedIn) {
      var lang = StorageManager.getLang() || 'cn';
      $translate.use(lang);
    }
  };

  /**
   * @ngInject
   */
  function ModifyUserCtrl($mdDialog, $timeout, $window, data, DashboardService) {
    var vm = this;
    var timeout;

    vm.name = data.username;
    vm.email = data.email;
    vm.desc = '';

    vm.confirmProfile = function() {
      $timeout.cancel(timeout);

      if(!vm.name) {
        vm.errorMsgProfile = 'DashBoard_RequireClientName';
      } else if(!vm.desc) {
        vm.errorMsgProfile = 'DashBoard_RequireClientDesc';
      } else {
        var d = {
          user_name: vm.name,
          email: vm.email
        };
        DashboardService.modifyUserProfile(data.user_id, d, function(){
          $mdDialog.cancel();
        });
      }

      timeout = $timeout(function() {
        vm.errorMsgProfile = '';
      }, 5000);
    };

    vm.confirmPassword = function() {
      $timeout.cancel(timeout);

      if(!vm.oldpass) {
        vm.errorMsgPassword = 'DashBoard_RequireOldPassword';
      } else if(!vm.newpass) {
        vm.errorMsgPassword = 'DashBoard_RequireNewPassword';
      } else if(!vm.renewpass) {
        vm.errorMsgPassword = 'DashBoard_RequireReNewPassword';
      } else if(vm.newpass !== vm.renewpass) {
        vm.errorMsgPassword = 'DashBoard_ModifyPwdDiffer';
      } else {
        var d = {
          old_password: vm.oldpass,
          new_password: vm.newpass
        };
        DashboardService.modifyPassword(data.user_id, d, function(){
          $mdDialog.cancel();
        });
      }

      timeout = $timeout(function() {
        vm.errorMsgPassword = '';
      }, 5000);
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myApp.dashboard')
    .controller('DashboardCtrl', DashboardCtrl)
    .config(dashboardConfig);

})();
