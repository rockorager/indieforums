const md5 = require('md5');
const fs = require('fs');

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
    /*
    eleventyConfig.on('beforeBuild', () => {
        const fakeData = ['1', '2', '3'];
        const stringifiedData = JSON.stringify(fakeData);
        fs.writeFile('./_data/fakedata.json', stringifiedData, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }

        });
    });
*/
    // 11ty watches json files in _data by default, leads to an endless loop in development
    eleventyConfig.setWatchJavaScriptDependencies(false);

    // Files to convert are in src
    dir: {
        input: "src"
    }
};


