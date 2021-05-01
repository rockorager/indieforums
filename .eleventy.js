const md5 = require('md5');


// Define hash filter, returns md5 hash of input
module.exports = function (eleventyConfig) {

    eleventyConfig.addFilter("hash", function (string) {
        var result = md5(string);
        return md5(string);
    });
};

// Passthrough files
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("style.css");
};