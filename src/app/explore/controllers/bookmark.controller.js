(function() {
  'use strict';

    angular
        .module('digglyFeProto')
        .controller('BookmarkController', BookmarkController);

    /** @ngInject */
    function BookmarkController(ExploreService, $window, $scope) {
        var m = this.model = {
            bookmarks: [],
            exportType: "",
            extensions: [
                {
                    label: "Text File (.txt)",
                    type: "txt"
                },
                {
                    label: "Spreadsheet (.xls)",
                    type: "xls"
                }
            ],
            downloadUrl: ""
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

            /**
             * Trigger when a extension type is set
             * @return {string} returns the URL to invoke a download
             */
            export: function() {
                switch(m.exportType) {
                    case "xls":
                        m.downloadUrl = a.exportXls();
                        break;

                    default:
                    case "text":
                        var text = JSON.stringify($window.__bookmarks__);
                        m.downloadUrl = a.exportText(text);
                        break;
                }
            },

            /**
             * Exports a Text file by creating a text blob
             * @param  {string} text The string in the text file
             * @return {url}      the url to the text file created
             */
            exportText: function (text) {
                var data = new Blob([text], {type: 'text/plain'});

                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                    $window.URL.revokeObjectURL(textFile);
                }

                var textFile = $window.URL.createObjectURL(data);

                // returns a URL you can use as a href
                return textFile;
            },

            exportXls: function() {
                return "not working yet";
            },

            init: function() {
                m.bookmarks = ExploreService.getBookmarks() || '';
                // Default is text file
                m.downloadUrl = a.exportText("text");
            }
        };

        a.init();
    }
})();
