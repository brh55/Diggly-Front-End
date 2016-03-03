(function() {
  'use strict';

  describe('DigglyService', function(){
    var DigglyService;
    var httpBackend;

    // TODO: Revisit and add more variation responses after json parse works
    var mock = [
    {"article_title": "Rodentia", "linked_topics": [{"description": "Rodent is linked to Rodentia", "wiki_link": "https://en.wikipedia.org/wiki/Rodent", "title": "Rodent", "target_id": 19337310, "score": 0.85, "source_id": 26087}], "description": "", "wiki_link": "https://en.wikipedia.org/wiki/Rodentia", "article_id": 26087, "summary": ""}
    ];

    beforeEach(module('digglyFeProto'));

    beforeEach(inject(function(_DigglyService_, $httpBackend) {
       DigglyService = _DigglyService_;
       httpBackend = $httpBackend;
    }));

    beforeEach(function() {
      httpBackend.whenGET('http://localhost:8000/diggly/topics').respond(mock);
      httpBackend.whenGET('http://localhost:8000/diggly/topics/4').respond(mock);
      httpBackend.whenGET('http://localhost:8000/diggly/topics/explore/4').respond(mock);
      httpBackend.whenGET('app/home/views/home.html').respond(200, '');
      httpBackend.whenGET('app/explore/views/layout.html').respond(200, '');
      httpBackend.whenGET('app/explore/views/visual.html').respond(200, '');
    });

    afterEach(function() {
      httpBackend.flush();
    });

    it('should return all topics', function() {
        DigglyService.getAllTopics().then(function(data) {
          var plainData = data.plain(data);

          expect(plainData.length).toBe(1);
        });
    });

    it('should return a exact topic', function() {
      DigglyService.getTopic(4).then(function(data) {
          var plainData = data.plain(data);

          expect(plainData[0].article_title).toEqual('Rodentia');
          expect(plainData[0].wiki_link).toEqual('https://en.wikipedia.org/wiki/Rodentia');
        });
    });

    it('should return linked topics', function() {
      DigglyService.getRelevantTopics(4).then(function(data) {
          var plainData = data.plain(data);

          expect(plainData[0].linked_topics.length).toEqual(1);

          var rodentTopic = plainData[0].linked_topics[0];
          expect(rodentTopic.title).toBe('Rodent');
        });
    });

  });
})();
