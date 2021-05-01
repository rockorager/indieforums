const md5 = require('md5');

module.exports = function (eleventyConfig) {

    eleventyConfig.addFilter("hash", function (string) {
        var result = md5(string);
        return md5(string);
    });
};
