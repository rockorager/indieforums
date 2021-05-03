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

        // Get overrides
        var override = postOverrides.filter(function (ovr) {
            return (ovr.id === post.id);
        });

        if (override.length > 0) {
            post = override[0];
        };

        // Get the path the post was targetting
        var targetAsUrl = new URL(post.target);
        post.pathname = targetAsUrl.pathname;

        // If the post is not targeting an existing thread, process as top level post
        if (!post.pathname.includes("threads")) {

            // Get thread object, if it already exists
            var filteredThreads = threads.filter(function (thr) {
                var postHash = xxhash64(post.source);
                return (thr.hash === postHash);
            });
            if (filteredThreads.length === 0) {
                var thread = {};
                // Initialize posts array
                thread.posts = [];
                // Add this object to the main array, since it hasn't been added yet
                threads.push(thread);
            } else {
                var thread = filteredThreads[0];
            };

            // posters can specify a thread category at syndication time by syndicating to indieforums.net/CATEGORY, or leave blank
            if (post.data.name === null) {
                post.data.name = "Untitled";
            }

            // Set thread properties
            thread.category = post.pathname.split("/")[1];
            thread.sticky = post.sticky;
            thread.hash = xxhash64(post.source);
            thread.title = post.data.name;
            thread.posts.push(post);

        } else {
            // Handle the post as a comment on an existing thread

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

    // Sort posts (newest to oldest) and set thread.lastUpdated
    for (var thread of threads) {
        thread.posts.sort(function (a, b) {
            var c = new Date(a.data.published);
            var d = new Date(b.data.published);
            return d - c;
        });

        // Set thread updated date
        thread.lastUpdated = thread.posts[0].data.published;
    };

    // Sort threads by lastUpdated
    threads.sort(function (a, b) {
        var c = new Date(a.lastUpdated);
        var d = new Date(b.lastUpdated);
        return d - c;
    });
    return threads;
};