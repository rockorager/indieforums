const xxhash64 = require('./xxhash64.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

module.exports = function (eleventyConfig) {
    
    // Passthrough files
    eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
    eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
    
    // Add hash filter
    eleventyConfig.addFilter("hash", function (string) {
        var result = xxhash64(string);
        return result;
    });
    
    eleventyConfig.addFilter("dayjs", function (inp) {
        inp = dayjs(inp);
        if (dayjs().diff(inp, 'day') < 3) {
            return inp.format("MMM D h:mm A");
        } else if (dayjs().diff(inp, 'day') < 180 ) {
            return inp.format("MMM D");
        } else {
            return inp.format("MMM D, YYYY");
        };
    });
    
    // Files to convert are in src
    return {
        dir: {
            input: "src"
        },
    };
};


