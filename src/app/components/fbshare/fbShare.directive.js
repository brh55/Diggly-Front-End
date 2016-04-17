(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .directive('fbShare', fbShare);

  /** @ngInject */
  function fbShare($rootScope) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/fbshare/metaTemplate.html',
      scope: {},
      controller: fbShareController,
      controllerAs: 'fbShare',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function fbShareController($rootScope, $location) {
      var vm = this;

      vm.type = 'website';

      $rootScope.$on('visual:update', function(event, data) {
        console.log(data);
          vm.title = data.article_title;
          vm.url = $location.absUrl();
          vm.description = data.summary;
      });
    }
  }

})();
