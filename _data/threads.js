const webmentions = require('./webmentions.json');
const md5 = require('md5');
const fs = require('fs');

module.exports = function () {
    // Initialize the array we are building
    var threads = [];

    // Iterate through all webmentions
    for (var post of webmentions.links) {

        // Get the path the post was targetting
        var targetAsUrl = new URL(post.target);
        post.pathname = targetAsUrl.pathname;

        // If the post is not a webmention to a thread ID, process as top level post
        if (!post.pathname.includes("threads")) {

            // Get thread if it already exists
            var filteredThreads = threads.filter(function (thr) {
                var postHash = md5(post.source); //hash the source for the thread id
                return (thr.hash === postHash);
            });
            if (filteredThreads.length === 0) {
                var thread = {};
                thread.posts = [];
            } else {
                var thread = filteredThreads[0];
            };

            thread.hash = md5(post.source);

            // TODO - need to add a check for if this post is more recent than the current thread.updated value
            thread.updated = post.data.published;

            // posters can specify a thread category at syndication time by syndicating to indieforums.net/CATEGORY, or leave blank
            thread.category = post.pathname.split("/")[1];
            thread.sticky = false;
            post.isParent = true;

            thread.posts.push(post);
            threads.push(thread);

        } else {
            // Extract the hash from the URL
            var targetHash = post.pathname.split("/")[2].split(".")[0];

            // Get thread if it already exists
            var filteredThreads = threads.filter(function (thr) {
                return (thr.hash === targetHash);
            });

            if (filteredThreads.length === 0) {
                var thread = {};
                thread.hash = targetHash;
                thread.posts = [];
            } else {
                var thread = filteredThreads[0];
            };

            // Push this post into the thread

            thread.posts.push(post);
            // TODO check if thread.updated is older than this posts publish date
            //  console.log(post.target.pathname);

        };
    };

    for (var thread of threads) {
        thread.posts.sort(function (a, b) {
            var c = a.data.published;
            var d = b.data.published;
            return d - c;
        });
        thread.updated = thread.posts[0].data.date;
    };

    return threads;
};