(function() {
  'use strict';

  var prefix = 'http://localhost:4000/';

  angular
    .module('myApp.shared')
    .constant('Constant', {
      URL: {
        LOGIN: prefix + 'auth/login',
        CHECK_LOGIN: prefix + 'auth/loggedin',
        USERS: prefix + 'users',
        PROJECTS: prefix + 'projects'
      }
    });

})();
