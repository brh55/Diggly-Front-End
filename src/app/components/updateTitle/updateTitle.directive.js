(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .directive('updateTitle', updateTitle);

  /** @ngInject */
  function updateTitle($rootScope, $timeout) {
    var directive = {
      restrict: 'A',
      link: function (scope, element) {
        $rootScope.$on('visual:update', function(event, data) {
            var title = data.article_title + ' | Wikipedia Visualizer';

            $timeout(function() {
              element.text(title);
            }, 0, false);
        });
      }
    };

    return directive;
  }

})();
