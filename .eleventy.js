
const xxhash64 = require('./xxhash64.js');

// Passthrough files
module.exports = function (eleventyConfig) {
    dir: {
        input: "src"
    }
    // Passthrough files
    eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
    eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });

    // Add hash filter
    eleventyConfig.addFilter("hash", function (string) {
        var result = xxhash64(string);
        return result;
    });

    // Files to convert are in src
};


