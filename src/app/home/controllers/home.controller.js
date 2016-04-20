(function() {
    'use strict';

    angular
        .module('digglyFeProto')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(DigglyService, $scope) {
        var m = this.model = {
            random: {},
            popular: {},
            trending: {},
            recent: [],
            loadedCount: 0
        };

        var a = this.action = {
            init: function () {
                DigglyService.getRandomTopic().then(function(response) {
                    m.random = response.plain();
                    m.loadedCount++;
                });
                DigglyService.getPopularTopic().then(function(response) {
                    m.popular = response.plain();
                    m.loadedCount++;
                });
                DigglyService.getRecentTopics().then(function(response) {
                    m.recent = response.plain();
                    m.loadedCount++;
                });
                DigglyService.getTrendingTopic().then(function(response) {
                    m.trending = response.plain();
                    m.loadedCount++;
                });
            }
        };

        $scope.$watch(
            "home.model.loadedCount",
            function handleFooChange( newValue, oldValue ) {
                console.log( "vm.fooCount:", newValue );
            }
        );

        a.init();
    }
})();
