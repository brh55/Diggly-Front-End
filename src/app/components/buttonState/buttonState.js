// Verify Bookmark button state
(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .directive('buttonState', buttonState);

  /** @ngInject */
  function buttonState(ExploreService, $rootScope) {
    var directive = {
      restrict: 'A',
      scope: {
        id: '='
      },
      link: function(scope, el, attrs) {
        checkState(scope.id, el);
        // NOT IDEAL, NEED TO REFACTOR
        $rootScope.$on('notify:service', function () {
          checkState(scope.id, el);
        });
      }
    };

    function checkState(id, el) {
      if (ExploreService.doesBookmarkExist(id)) {
        el.text('bookmark');
      } else {
        el.text('bookmark_border');
      }
    }

    return directive;
  }



})();
