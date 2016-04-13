'use strict';
/* GLOBALS console, document */

$(document).ready(function($) {
    // Cookies.remove('diggly-session');

    var cookie_isset = !(Cookies.get('diggly-session') === undefined);
    var session_nodes = {};
    // var globalNODE = 200;

    // $('body').on('visual:click', function(event, nodeData) {
    //     console.log('----in visual click')
    //     console.log(nodeData);
    //     var nodeClick = $.Event("visual:clicked-node");
    //     nodeClick.centralNodeID = nodeData.centralNodeID;
    //     nodeClick.nodeID = nodeData.nodeID;
    //     $('body').trigger(nodeClick);
    // });

    $('body').on('visual:clicked-node', function (event, nodeData) {
        console.log('----in visual:clicked-node');
        console.log(event);
        var clickedNode = nodeData.nodeID;
        var centralNode = nodeData.centralNodeID;
        console.log('clickedNode: '+clickedNode);
        console.log('centralNode: '+centralNode);

        if (!cookie_isset || (Cookies.get('diggly-session') === undefined)) {
            session_nodes = {}; // If session expires while on page (i.e., Cookies.get() === undefined), reset session to null
            Cookies.set('diggly-session', session_nodes, { expires: 1 }); // 1 minute -> 0.000694444444
        }

        /**
         * If cookie was not set it has been set in the above if block,
         * or else cookie was set before we came to the page and we make the variable true becaise of that that
         */
        cookie_isset = true;

        session_nodes = JSON.parse(Cookies.get('diggly-session'));
        // console.log('_____Previous Cookie_____');
        // console.log(session_nodes);
        // console.log('\n\n');

        /**
         * Check if the value of the node clicked is true in session_nodes, i.e., has the clicked node been visited before
         * If not, then do the following.
         */
        if (!session_nodes[clickedNode]) {
            console.log('entered AJAX');
            $.ajax({
                url: "http://rack36.cs.drexel.edu:8000/diggly/topics/track/", // Was getting a POST error with :8000, therefore got rid of that
                type: "POST",
                data: "tid_src="+centralNode+"&tid_dst="+clickedNode,
                async: false,
                success: function (response) {
                    console.log('Sent user feedback!');
                },
                error: function (errorReport) {
                    console.log('Error happened in AJAX Request!!');
                    console.log(errorReport);
                }
            });

            session_nodes[clickedNode] = true; // Change to event.nodeID
            // console.log('_____New Cookie_____');
            // console.log(session_nodes);
            // console.log('\n\n');

            // globalNODE++;

            Cookies.remove('diggly-session');
            Cookies.set('diggly-session', session_nodes, { expires: 1 }); // 1 minute -> 0.000694444444
        } else {
            console.log('No request sent for clicked node as it has already been visited today.');
        }
    });

});