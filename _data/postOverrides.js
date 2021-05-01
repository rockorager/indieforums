// Post overrides. These override the key:value pairs in individual webmention posts, used for moderation

module.exports = function () {
    // Initialize the array we are building. This array should have the same structure as the webmention.io response, as it will be used to replace individual values in that datafile
    var postOverrides = [];

    return postOverrides;
};