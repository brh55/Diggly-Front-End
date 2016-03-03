(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .service('SearchService', SearchService);

    /** @ngInject */
    function SearchService(Restangular) {
        var a = this.action = {
            getSearchSuggest: function(searchWord) {
                return Restangular
                    // .../suggest
                    .oneUrl('suggest', 'http://rack36.cs.drexel.edu/suggest')
                    .get({
                        q: searchWord
                    });
            },

            getId: function(articleTitle) {
                return Restangular
                    .oneUrl('pageid', 'http://rack36.cs.drexel.edu/getpageid')
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
