(function() {
  'use strict';

    angular
        .module('digglyFeProto')
        .controller('HistoryController', HistoryController);

    /** @ngInject */
    function HistoryController(ExploreService) {
        var m = this.model = {
            history: [],
        };

        var a = this.action = {
            /**
             * Wrapper to remove current item
             * @param  {object} currentItem current history item to be remove
             * @return {void}
             */
            removeItem: function(currentItem) {
                ExploreService.removeBookmarkItem(currentItem);
            },

            /**
             * Wrapper to clear history
             * @return {void}
             */
            clearHistory: function() {
                ExploreService.clearHistory();
                m.history.length = 0;
            },

            init: function() {
                m.history = ExploreService.getHistory() || '';
            }
        };

        a.init();
    }
})();
