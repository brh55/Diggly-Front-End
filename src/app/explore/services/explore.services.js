(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .factory('ExploreServices', ExploreServices);

    /** @ngInject */
    function ExploreServices ($window) {
        var actions = {
            /**
             * Clears history in window object
             * @return {void}
             */
            clearHistory: function () {
                var arrayLen = $window.__history__.length;
                $window.__history__ = __.drop($window.__history__, arrayLen);
            },
            /**
             * Removes a bookmark item from the bookmark list
             * @param  {object} item Article Object
             * @return {void}
             */
            removeBookmarkItem: function (item) {
                __.remove($window.__history__, function(currentHistory) {
                    currentHistory === item;
                });
            },

            /**
             * Returns the history on the windows object
             * @return {array} array of history items
             */
            getHistory: function () {
                return $window.__history__;
            }
        };

        return {
            clearHistory: actions.clearHistory,
            removeBookmarkItem: actions.removeBookmarkItem,
            getHistory: actions.getHistory
        }
    }

})();
