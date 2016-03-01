!function(){"use strict";angular.module("digglyFeProto",["ngAnimate","d3","ngCookies","ngSanitize","restangular","ui.router","mm.foundation"])}(),function(){"use strict";function t(t){var e={clearHistory:function(){var e=t.__history__.length;t.__history__=_.drop(t.__history__,e)},clearBookmarks:function(){var e=t.__bookmarks__.length;t.__bookmarks__=_.drop(t.__history__,e)},removeHistoryItem:function(e){_.remove(t.__history__,function(t){return t===e})},removeBookmarkItem:function(e){_.remove(t.__bookmark__,function(t){return t===e})},addBookmark:function(e){var o=function(t){return t.article_id===e.article_id},r=t.__bookmarks__;0===r.length&&t.__bookmarks__.push(e),-1===_.findIndex(r,o)&&t.__bookmarks__.push(e)},getHistory:function(){return t.__history__},getBookmarks:function(){return t.__bookmarks__}};return{clearHistory:e.clearHistory,clearBookmarks:e.clearBookmarks,removeHistoryItem:e.removeHistoryItem,removeBookmarkItem:e.removeBookmarkItem,getHistory:e.getHistory,addBookmark:e.addBookmark,getBookmarks:e.getBookmarks}}t.$inject=["$window"],angular.module("digglyFeProto").factory("ExploreService",t)}(),function(){"use strict";function t(t,e,o,r,i){var n=this.model={history:[],currentTopic:"",data:""};r.history=n.history;var a=this.action={updateHistory:function(){r.$apply(function(){n.history.unshift(n.currentTopic),n.history=_.uniq(n.history),i.__history__=n.history})},fetchTopic:function(e){t.getRelevantTopics(e).then(function(t){n.data=t.plain(t),n.currentTopic=_.omit(n.data,"linked_topics"),o.go("explore.visual",{id:e},{location:!0,notify:!1,reload:!1})})},addBookmark:function(t){e.addBookmark(t)},onClick:function(t){a.updateHistory(),a.fetchTopic(t)},init:function(){o.params.id&&a.fetchTopic(o.params.id),n.history=e.getHistory()||[],i.__bookmarks__=e.getBookmarks()||[]}};a.init()}t.$inject=["DigglyService","ExploreService","$state","$scope","$window"],angular.module("digglyFeProto").controller("VisualController",t)}(),function(){"use strict";function t(t){var e=this.model={history:[]},o=this.action={removeItem:function(e){t.removeHistoryItem(e)},clearHistory:function(){t.clearHistory(),e.history.length=0},init:function(){e.history=t.getHistory()||""}};o.init()}t.$inject=["ExploreService"],angular.module("digglyFeProto").controller("HistoryController",t)}(),function(){"use strict";function t(t){var e=this.model={bookmarks:[]},o=this.action={removeItem:function(e){t.removeBookmarkItem(e)},clearBookmark:function(){t.clearBookmarks(),e.bookmark.length=0},init:function(){e.bookmarks=t.getBookmarks()||""}};o.init()}t.$inject=["ExploreService"],angular.module("digglyFeProto").controller("BookmarkController",t)}(),function(){"use strict";function t(){var t={restrict:"EA",templateUrl:"app/components/navigation/nav.html"};return t}angular.module("digglyFeProto").directive("exploreNavigation",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}t.$inject=["moment"];var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return e}angular.module("digglyFeProto").directive("acmeNavbar",t)}(),function(){"use strict";function t(t,e){var o={restrict:"EA",scope:{data:"=",onClick:"&"},link:function(o,r,a){var l=o.model={d3Data:{nodes:"",edges:""}};t.d3().then(function(t){var a=t.select(r[0]).append("svg").style("width","100%").style("height","100%");e.onresize=function(){o.$apply()},o.$watch(function(){return angular.element(e)[0].innerWidth},function(){o.render(o.data)}),o.$watch("data",function(t,e){o.render(t)},!0),o.render=function(e){if(a.selectAll("*").remove(),e){l.d3Data.nodes=i(e),l.d3Data.edges=n(e.linked_topics.length);var r=t.scale.category10(),c=t.layout.force().nodes(l.d3Data.nodes).links(l.d3Data.edges).size([500,500]).linkDistance(130).charge([-500]).theta(.1).gravity(.05).on("tick",g).start(),s=a.selectAll("line").data(l.d3Data.edges).enter().append("line").attr("id",function(t,e){return"edge"+e}).attr("marker-end","url(#marker_circle)").style("stroke","#ccc").style("pointer-events","none"),u=a.selectAll("circle").data(l.d3Data.nodes).enter().append("circle").attr({r:function(t,e){return 40*t.score},"class":function(t,e){return"node-"+e}}).style("fill",function(t,e){return r(e)}).style("cursor",function(t,e){return 0===e?"move":"pointer"}).call(c.drag).on("click",function(t,e){if(0!==e){var r=t.target_id;o.onClick({item:r})}}),d=a.selectAll(".nodelabel").data(l.d3Data.nodes).enter().append("text").attr({x:function(t){return t.x},y:function(t){return t.y},"class":function(t,e){return"label-"+e},stroke:"black"}).text(function(t){return t.title}),p=a.selectAll(".edgepath").data(l.d3Data.edges).enter().append("path").attr({d:function(t){return"M "+t.source.x+" "+t.source.y+" L "+t.target.x+" "+t.target.y},"class":"edgepath","fill-opacity":0,"stroke-opacity":0,fill:"blue",stroke:"red",id:function(t,e){return"edgePath-"+e}}).style("pointer-events","none"),m=a.selectAll(".edgelabel").data(l.d3Data.edges).enter().append("text").style("pointer-events","none").attr({"class":"edgelabel",id:function(t,e){return"edgelabel-"+e},dx:80,dy:0,"font-size":10,fill:"#aaa"});m.append("textPath").attr("xlink:href",function(t,e){return"#edgepath"+e}).style("pointer-events","none"),a.append("defs").append("marker").attr({id:"arrowhead",viewBox:"-0 -5 10 10",refX:25,refY:0,orient:"auto",markerWidth:10,markerHeight:10,xoverflow:"visible"}).append("svg:path").attr("d","M 0,-5 L 10 ,0 L 0,5").attr("fill","#ccc").attr("stroke","#ccc");var g=function(){s.attr({x1:function(t){return t.source.x},y1:function(t){return t.source.y},x2:function(t){return t.target.x},y2:function(t){return t.target.y}}),u.attr({cx:function(t){return t.x},cy:function(t){return t.y}}),d.attr("x",function(t){return t.x}).attr("y",function(t){return t.y}),p.attr("d",function(t){var e="M "+t.source.x+" "+t.source.y+" L "+t.target.x+" "+t.target.y;return e})};c.on("tick",g)}}})}},r=function(t){var e={};return e=_.omit(t,["linked_topics"]),e.title=e.article_title,e.score=1,[e]},i=function(t){var e=_.union(r(t),t.linked_topics);return e},n=function(t){var e=_.times(t,function(t){return{source:t+1,target:0}});return e};return o}t.$inject=["d3Service","$window"],angular.module("digglyFeProto").directive("digglyVisual",t)}(),function(){"use strict";angular.module("d3",[])}(),function(){"use strict";function t(t,e,o){function r(){o.$apply(function(){i.resolve(window.d3)})}var i=e.defer(),n=t[0].createElement("script");n.type="text/javascript",n.async=!0,n.src="http://d3js.org/d3.v3.min.js",n.onreadystatechange=function(){"complete"===this.readyState&&r()},n.onload=r;var a=t[0].getElementsByTagName("body")[0];return a.appendChild(n),{d3:function(){return i.promise}}}t.$inject=["$document","$q","$rootScope"],angular.module("d3").factory("d3Service",t)}(),function(){"use strict";function t(t){var e="http://rack36.cs.drexel.edu:8000/diggly";t.setBaseUrl(e);var o=t.all("topics"),r=this.action={getAllTopics:function(){return o.getList()},getTopic:function(e){return t.one("topics",e).get()},getRelevantTopics:function(t){return o.one("explore",t).get()}};return{getAllTopics:r.getAllTopics,getTopic:r.getTopic,getRelevantTopics:r.getRelevantTopics}}t.$inject=["Restangular"],angular.module("digglyFeProto").service("DigglyService",t)}(),function(){"use strict";function t(t){t.debug("runBlock end")}function e(t,e){t.$on("$stateChangeStart",function(t,o,r){o.redirectTo&&(t.preventDefault(),e.go(o.redirectTo,r))})}t.$inject=["$log"],e.$inject=["$rootScope","$state"],angular.module("digglyFeProto").run(t).run(e)}(),function(){"use strict";function t(t,e){t.state("explore",{url:"/explore/:id",templateUrl:"app/explore/views/layout.html",redirectTo:"explore.visual"}).state("explore.visual",{url:"/visual",parent:"explore",templateUrl:"app/explore/views/visual.html",controller:"VisualController",controllerAs:"visual"}).state("explore.history",{parent:"explore",url:"/history",templateUrl:"app/explore/views/history.html",controller:"HistoryController",controllerAs:"history"}).state("explore.bookmark",{parent:"explore",url:"/bookmarks",templateUrl:"app/explore/views/bookmarks.html",controller:"BookmarkController",controllerAs:"bookmarks"}),e.otherwise("/explore/:id")}t.$inject=["$stateProvider","$urlRouterProvider"],angular.module("digglyFeProto").config(t)}(),function(){"use strict";angular.module("digglyFeProto").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}t.$inject=["$logProvider","toastr"],angular.module("digglyFeProto").config(t)}(),angular.module("digglyFeProto").run(["$templateCache",function(t){t.put("app/components/navbar/navbar.html",'<nav class="top-bar row"><ul class="title-area"><li class="name"><h1><a href="https://github.com/Swiip/generator-gulp-angular">Diggly</a></h1></li></ul><section class="top-bar-section"><ul class="right"><explore-navigation></explore-navigation></ul></section></nav>'),t.put("app/components/navigation/nav.html",'<ul><li><a ui-sref="explore.visual({ history: history })">Visual</a></li><li><a ui-sref="explore.history({ history: history })">History</a></li><li><a ui-sref="explore.bookmark">Bookmark</a></li></ul>'),t.put("app/explore/views/bookmarks.html",'<a ng-click="bookmarks.action.clearBookmarks()">Clear Bookmarks</a><ul><div ng-repeat="bookmark in bookmarks.model.bookmarks"><h4>{{ bookmark.article_title}}</h4><p>{{ bookmark.summary | limitTo: 300 }} ...</p><a href="{{ bookmark.wiki_link }}" target="_blank">View it on Wikipedia</a> | <a ng-click="bookmarks.action.removeItem(topic)">Remove Bookmark</a><hr></div></ul>'),t.put("app/explore/views/history.html",'<div class="history"><h2>History</h2><a ng-click="history.action.clearHistory()">Clear History</a><ul><div ng-repeat="topic in history.model.history"><h4>{{ topic.article_title}}</h4><p>{{ topic.summary | limitTo: 300 }} ...</p><a href="{{ topic.wiki_link }}" target="_blank">View it on Wikipedia</a> | <a ng-click="history.action.removeItem(topic)">Remove Item</a><hr></div></ul></div>'),t.put("app/explore/views/layout.html",'<div class="container"><div ui-view=""></div></div>'),t.put("app/explore/views/visual.html",'<div class="visual" style="height: 400px"><diggly-visual data="visual.model.data" on-click="visual.action.onClick(item)"></diggly-visual></div><div class="metaData" style="float: left; width: 400px"><h2>Topic</h2><h2>{{ visual.model.currentTopic.article_title }}</h2><p>{{ visual.model.currentTopic.summary }}</p><a ng-href="{{ visual.model.currentTopic.wiki_link }}" target="_blank">View on Wikipedia</a></div><div class="History" style="float: right; width: 400px"><h2>History</h2><ul><div ng-repeat="topic in visual.model.history"><h4>{{ topic.article_title}}</h4><p>{{ topic.summary | limitTo: 40 }} ...</p><a href="{{ topic.wiki_link }}" target="_blank">View it on Wikipedia</a> <a ng-click="visual.action.addBookmark(topic)">Add to Bookmark</a></div></ul></div>')}]);