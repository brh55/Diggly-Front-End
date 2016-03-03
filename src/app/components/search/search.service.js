(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .service('SearchService', SearchService);

    /** @ngInject */
    function SearchService(Restangular) {
        var BASEURL = "http://rack36.cs.drexel.edu/";
        // Configs
        Restangular.setBaseUrl(BASEURL);

        // Main route
        var wikiTopics = Restangular.all('topics');

        var a = this.action = {
            getSearchSuggest: function(searchWord) {
                return Restangular
                    // .../suggest
                    .one('suggest')
                    .get({
                        q: searchWord
                    });
            },

            getId: function(articleTitle) {
                return Restangular
                    .one('getpageid')
                    .get({
                        q: articleTitle
                    });
            }
        };

        return {
            getSearchSuggest: a.getSearchSuggest,
            getId: a.getId
        };
    }
})();
