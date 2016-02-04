(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
