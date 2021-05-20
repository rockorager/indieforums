const xxhash64 = require('./xxhash64.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

module.exports = function (eleventyConfig) {
    
    // Passthrough files
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
    eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
    
    // Add hash filter
    eleventyConfig.addFilter("hash", function (string) {
        var result = xxhash64(string);
        return result;
    });
    
    eleventyConfig.addFilter("dayjs", function (inp) {
        inp = dayjs(inp);
        return inp.format("MMM D, YYYY");
    });

    // Files to convert are in src
    return {
        dir: {
            input: "src"
        },
    };
};


