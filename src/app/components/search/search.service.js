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
                    .getList("one", {
                        q: searchWord
                    });
            },

            getId: function(articleTitle) {
                return Restangular
                    .getList("getpageid", {
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
