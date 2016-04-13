/*global
    document, console
*/
'use strict';

$(document).ready(function($) {
    var cookie_isset = !(Cookies.get('diggly-session') === undefined);
    var session_nodes = {};

    $('body').on('visual:clicked-node', function (event, nodeData) {
        var clickedNode = nodeData.nodeID;
        var centralNode = nodeData.centralNodeID;

        if (!cookie_isset || (Cookies.get('diggly-session') === undefined)) {
            session_nodes = {}; // If session expires while on page (i.e., Cookies.get() === undefined), reset session to null
            Cookies.set('diggly-session', session_nodes, { expires: 1 }); // Setting Cookie for 1 day
        }

        /**
         * If cookie was not set it has been set in the above if block,
         * or else cookie was set before we came to the page and we make the variable true because of that that
         */
        cookie_isset = true;

        session_nodes = JSON.parse(Cookies.get('diggly-session')); // Get current Cookie

        /**
         * Check if the value of the node clicked is true in session_nodes, i.e., has the clicked node been visited before
         * If not, then do the following.
         */
        if (!session_nodes[clickedNode]) {
            $.ajax({
                url: "http://rack36.cs.drexel.edu:8000/diggly/topics/track/",
                type: "POST",
                data: "tid_src="+centralNode+"&tid_dst="+clickedNode,
                async: false,
                error: function (errorReport) {
                    console.log('Error happened in AJAX Request!!');
                    console.log(errorReport);
                }
            });

            session_nodes[clickedNode] = true; // Change to event.nodeID

            Cookies.remove('diggly-session');
            Cookies.set('diggly-session', session_nodes, { expires: 1 }); // Setting Cookie for 1 day
        } else {
            console.log('No request sent for clicked node as it has already been visited today.');
        }
    });
});