'use strict';

// D3 Post Event Handling
console.log('listen to events');
$("body").on("D3:Click", function(event, itemId) {
    console.log('recieved d3 click');
    console.log(event);
    console.log("This is the article_id clicked: " + itemId);
});
