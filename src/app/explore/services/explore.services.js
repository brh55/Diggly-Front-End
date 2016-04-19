(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .factory('ExploreService', ExploreService);

    /** @ngInject */
    function ExploreService ($rootScope) {
        var model = {
            history: [],
            bookmarks: []
        };

        var action = {
            /**
             * Clears history in window object
             * @return {void}
             */
            clearHistory: function () {
                var arrayLen = model.history.length;
                model.history = _.drop(model.history, arrayLen);
                $rootScope.$emit("notify:service", "History cleared.", true);
            },
            /**
             * Clear bookmarks in window object
             * @return {void}
             */
            clearBookmarks: function () {
                var arrayLen = model.bookmarks.length;
                model.bookmarks = _.drop(model.history, arrayLen);
                $rootScope.$emit("notify:service", "Bookmarks cleared.", true);
            },
            /**
             * Removes a bookmark item from the bookmark list
             * @param  {object} item Article Object
             * @return {void}
             */
            removeHistoryItem: function (item) {
                _.remove(model.history, function(currentHistory) {
                    return currentHistory.article_id === item.article_id;
                });
            },
            /**
             * Removes a bookmark item from the bookmark list
             * @param  {object} item Article Object
             * @return {void}
             */
            removeBookmarkItem: function (item) {
                _.remove(model.bookmarks, function(currentBookmark) {
                    return currentBookmark.article_id === item.article_id;
                });
            },
            /**
             * Adds bookmark to bookmark array
             * @param {object} item item to be bookmarked
             */
            addBookmark: function(item) {
                var check = function (currentBookmark) {
                    return currentBookmark.article_id === item.article_id;
                };

                var bookmarks = model.bookmarks;

                // If it's empty or unique ==> Push
                if (bookmarks.length === 0 || _.findIndex(bookmarks, check) === -1) {
                    $rootScope.$emit("notify:service", item.article_title + " has been added to your bookmarks.", false);
                    model.bookmarks.push(item);
                } else {
                    $rootScope.$emit("notify:service", item.article_title + " already exists in your bookmarks.", true);
                }
            },

            setHistory: function (topic) {
                if (model.history.length > 0) {
                    var indexInHistory = _.findIndex(model.history, function(o) {
                        return o.article_id === topic.article_id;
                    });

                    if (indexInHistory === -1) {
                        model.history.unshift(topic);
                    }
                } else {
                    model.history.push(topic);
                }
            },

            /**
             * Returns the history in windows object
             * @return {array} array of history items
             */
            getHistory: function () {
                if (!model.history) {
                    model.history = [];
                }
                return model.history;
            },

            /**
             * Return the bookmarks in windows object
             * @return {array} array of bookmark items
             */
            getBookmarks: function () {
                if (!model.bookmarks) {
                    model.bookmarks = [];
                }
                return model.bookmarks;
            }
        };

        return {
            clearHistory: action.clearHistory,
            clearBookmarks: action.clearBookmarks,
            removeHistoryItem: action.removeHistoryItem,
            removeBookmarkItem: action.removeBookmarkItem,
            setHistory: action.setHistory,
            getHistory: action.getHistory,
            addBookmark: action.addBookmark,
            getBookmarks: action.getBookmarks
        };
    }

})();
