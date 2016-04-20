(function() {
  'use strict';

  angular
    .module('digglyFeProto')
    .directive('topicCard', topicCard);

    /** @ngInject */
    function topicCard ($state) {
        var directive = {
          restrict: 'E',
          templateUrl: 'app/components/card/topicCardTemplate.html',
          scope: {
            title: '=',
            content: '=',
            id: '='
          },

          link: function (scope) {
            scope.params = {
                id: scope.id
            };

            scope.redirect = function () {
                $state.go('explore', {
                    id: scope.id
                })
            };
          }
        };

        return directive;
    }
})();
