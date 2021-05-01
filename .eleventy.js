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

    // Prebuild scripts
    eleventyConfig.on('beforeBuild', () => {
        // Run me before the build starts
    });

    dir: {
        input: "src"
    }
};


