(function() {
    'use strict';
    /* global $ */

    angular
        .module('digglyFeProto')
        .directive('digglyTopic', digglyTopic);

    /** @ngInject */
    function digglyTopic(SearchService, $state) {
        var directive = {
            restrict: 'A',
            scope: {
                topic: '@'
            },
            link: function(scope, element, attrs) {
                element.bind('click', directTo(scope.topic))

                var directTo = function(topic) {
                    SearchService.getId(topic)
                        .then(function(result) {
                            $state.go('explore', {
                                id: result.data.id
                            });
                        })
                        .catch(function(error) {
                            console.log("The id was not returned");
                        });
                };
            }
        };

        return directive;
    }
})();
