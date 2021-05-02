
const xxhash64 = require('./xxhash64.js');

// Passthrough files
module.exports = function (eleventyConfig) {
    // Passthrough files
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("style.css");

    // Add hash filter
    eleventyConfig.addFilter("hash", function (string) {
        var result = xxhash64(string);
        return result;
    });

    // Files to convert are in src
    dir: {
        input: "src"
    }
};


