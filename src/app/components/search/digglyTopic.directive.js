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
                topic: '='
            },
            link: function(scope, element, attrs) {
                console.log(scope.topic);
                // Proactively fetch Id and redirect to visualizer on click
                var directTo = function(topic) {
                    SearchService.getId(topic)
                        .then(function(response) {
                            $state.go('explore', {
                                id: response.pageid
                            });
                        })
                        .catch(function(error) {
                            console.log("The id was not returned");
                        });
                };

                element.bind('click', directTo(scope.topic))
            }
        };

        return directive;
    }
})();
