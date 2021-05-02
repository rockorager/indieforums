const md5 = require('md5');

// Passthrough files
module.exports = function (eleventyConfig) {
    // Passthrough files
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("style.css");

    // Add hash filter
    eleventyConfig.addFilter("hash", function (string) {
        var result = md5(string);
        return md5(string);
    });

    // Files to convert are in src
    dir: {
        input: "src"
    }
};


