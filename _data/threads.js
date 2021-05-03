const webmentions = require('./webmentions.json');
const postOverrides = require('./postOverrides.json');


const xxhash64 = require('../xxhash64.js');

module.exports = function () {
    // Initialize the array we are building
    var threads = [];




    // Iterate through all webmentions
    for (var post of webmentions.links) {
        // initialize sticky, override will modify
        post.sticky = false;

        // Get overrides if it already exists
        var override = postOverrides.filter(function (ovr) {
            return (ovr.id === post.id);
        });

        if (override.length > 0) {
            post = override[0];
        };

        // Get the path the post was targetting
        var targetAsUrl = new URL(post.target);
        post.pathname = targetAsUrl.pathname;

        // If the post is not a webmention to a thread ID, process as top level post
        if (!post.pathname.includes("threads")) {

            // Get thread if it already exists
            var filteredThreads = threads.filter(function (thr) {
                var postHash = xxhash64(post.source);
                return (thr.hash === postHash);
            });
            if (filteredThreads.length === 0) {
                var thread = {};
                thread.posts = [];
                threads.push(thread);
            } else {
                var thread = filteredThreads[0];
            };

            // posters can specify a thread category at syndication time by syndicating to indieforums.net/CATEGORY, or leave blank
            if (post.data.name === null) {
                post.data.name = "Untitled";
            }
            thread.category = post.pathname.split("/")[1];
            thread.sticky = post.sticky;
            thread.hash = xxhash64(post.source);
            thread.title = post.data.name;
            console.log(thread.title);
            thread.posts.push(post);

        } else {
            // Extract the hash from the URL
            var targetHash = post.pathname.split("/")[2].split(".")[0];
            // Get thread if it already exists
            var filteredThreads = threads.filter(function (thr) {
                return (thr.hash === targetHash);
            });


            if (filteredThreads.length < 1) {
                // we only get here if a comment was parsed before the top level
                var thread = {};
                thread.hash = targetHash;
                thread.posts = [];
                // Push this post into the thread
                thread.posts.push(post);
                threads.push(thread);
            } else {
                filteredThreads[0].posts.push(post);
            };
        };
    };
    /*
        for (var thread of threads) {
            // sort posts, newest to oldest
            thread.posts.sort(function (a, b) {
                var c = a.data.published;
                var d = b.data.published;
                return d - c;
            });
            */
    // set the latest updated for use in sorting threads on main page
    thread.updated = thread.posts[0].data.published;

    return threads;
};