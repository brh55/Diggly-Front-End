// Adapter for the Diggly Service
(function() {
  'use strict';

  angular
      .module('digglyFeProto')
      .service('DigglyService', DigglyService);

  /** @ngInject */
  function DigglyService(Restangular) {
    var DIGGLY_BASEURL = "rack36.cs.drexel.edu:8000/diggly";
    // TODO: Export to config if gets to large
    Restangular.setBaseUrl(DIGGLY_BASEURL);
    Restangular.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
    // Main route
    var wikiTopics = Restangular.all('topics');

    var action = this.action = {
      getAllTopics: function() {
        wikiTopics.getList().then(function(topics) {
          console.log(topics);
          return topics;
        });
      },
      getTopic: function(topicId) {
        Restangular.one('topics', topicId).then(function(topic) {
          return topic;
        })
      }
      // Not functioning
      // getScore: function() {
      //   Restangular.one();
      // }
    }

    return {
      getAllTopics: action.getAllTopics,
      getTopic: action.getTopic
    }
  }

})();

// /topics/:id
// /topics/explore/:id  // Main topic and Link topic and score
// /topics/related/all/:id 
// /topics/related/top/   //returning the top ones
