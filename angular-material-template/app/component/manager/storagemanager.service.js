(function() {
  'use strict';

  /**
   * @ngInject
   */
  function StorageManager(localStorageService) {
    var storageManager = {};
    storageManager.setToken = function(token) {
      storageManager.deleteToken();
      return localStorageService.set('myAppToken', token);
    };

    storageManager.getToken = function() {
      return localStorageService.get('myAppToken');
    };

    storageManager.deleteToken = function() {
      return localStorageService.remove('myAppToken');
    };

    storageManager.setUser = function(user) {
      return localStorageService.set('myAppUser', user);
    };

    storageManager.getUser = function() {
      return localStorageService.get('myAppUser');
    };

    storageManager.deleteUser = function() {
      return localStorageService.remove('myAppUser');
    };

    storageManager.setAutoLogin = function(isAutoLogin) {
      return localStorageService.set('myAppAutoLogin', isAutoLogin);
    };

    storageManager.getAutoLogin = function() {
      return localStorageService.get('myAppAutoLogin');
    };

    storageManager.deleteAutoLogin = function() {
      return localStorageService.remove('myAppAutoLogin');
    };

    storageManager.setPath = function(path) {
      return localStorageService.set('myAppPath', path);
    };

    storageManager.getPath = function() {
      return localStorageService.get('myAppPath');
    };

    storageManager.deletePath = function() {
      return localStorageService.remove('myAppPath');
    };

    storageManager.setLang = function(lang) {
      return localStorageService.set('myAppLang', lang);
    };

    storageManager.getLang = function() {
      return localStorageService.get('myAppLang');
    };

    storageManager.deleteLang = function() {
      return localStorageService.remove('myAppLang');
    };

    storageManager.setProject = function(project) {
      return localStorageService.set('myAppProject', project);
    };

    storageManager.getProject = function() {
      return localStorageService.get('myAppProject');
    };

    storageManager.deleteProject = function() {
      return localStorageService.remove('myAppProject');
    };

    return storageManager;
  }

  angular
    .module('myApp.shared')
    .factory('StorageManager', StorageManager);

})();
