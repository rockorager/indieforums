const xxhash64 = require('./xxhash64.js');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

module.exports = function (eleventyConfig) {
    // Files to convert are in src
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

    eleventyConfig.addFilter("dayjs", function (inp) {
        inp = dayjs(inp);
        if (dayjs().diff(inp, 'day') < 3) {
            return inp.format("dddd, MMMM D, YYYY h:mm A");
        } else {
            return inp.format("dddd, MMMM D, YYYY");
        };
    });
};


