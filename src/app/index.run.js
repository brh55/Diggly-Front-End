(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .run(runBlock)
    .run(defaultChild);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  // UI-Router Temp Solution for Abstract Parents
  function defaultChild ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
   }

})();
