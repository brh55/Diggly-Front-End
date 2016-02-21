(function() {
  'use strict';

    angular
        .module('digglyFeProto')
        .controller('BookmarkController', BookmarkController);

    /** @ngInject */
    function BookmarkController(ExploreService) {
        var m = this.model = {
            bookmarks: [],
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
             * Wrapper to clear bookmarks
             * @return {void}
             */
            clearBookmark: function() {
                ExploreService.clearBookmarks();
                m.bookmark.length = 0;
            },

            init: function() {
                m.bookmarks = ExploreService.getBookmarks() || '';
            }
        };

        a.init();
    }
})();
