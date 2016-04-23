(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(DigglyService) {
        var m = this.model = {
            random: {},
            popular: {},
            trending: {},
            recent: [{},{},{}], // Blank objects to have cards appear on homepage
        };

        var a = this.action = {
            init: function () {
                DigglyService.getRecentTopics().then(function(response) {
                    m.recent = response.plain();
                });
                DigglyService.getTrendingTopic().then(function(response) {
                    m.trending = response.plain();
                });
                DigglyService.getPopularTopic().then(function(response) {
                    m.popular = response.plain();
                });
                DigglyService.getRandomTopic().then(function(response) {
                    m.random = response.plain();
                });
            }
        };

        a.init();
    }
})();
