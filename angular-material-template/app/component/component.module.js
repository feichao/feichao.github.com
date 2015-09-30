(function() {
  'use strict';

  angular
    .module('myApp.shared', [
      'LocalStorageModule',
      'pascalprecht.translate',
      'ngSanitize'
    ]);
})();