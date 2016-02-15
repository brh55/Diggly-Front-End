(function() {
  'use strict';

  describe('ExploreServices', function(){
    var ExploreService;

    beforeEach(module('digglyFeProto'));

    beforeEach(inject(function(_ExploreService_) {
       ExploreService = _ExploreService_;
    }));

    it('should clear all history', function() {
      ExploreService.clearHistory();
    });

    it('should remove a bookmark item', function() {
      ExploreService.removeBookmarkItem();
    });

    it('should return the history', function() {
      ExploreService.getHistory();
    });


  });
})();
