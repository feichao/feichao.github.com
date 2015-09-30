(function() {
  'use strict';

  angular
    .module('myApp.shared')
    .config(Config);

  function Config($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'assets/translation/{lang}/lang.json'
    });
    $translateProvider.preferredLanguage('en');
    $translatePartialLoaderProvider.addPart('login');
    $translatePartialLoaderProvider.addPart('dashboard');
  }

})();
