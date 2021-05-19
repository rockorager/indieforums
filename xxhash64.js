(function () {
    const { XXHash64 } = require('xxhash-addon');
    const hasher64 = new XXHash64(0);

    xxhash64 = function (str) {
        var buf = Buffer.from(str);
        var result = hasher64.hash(buf).toString('hex');
        return result;
    };
    module.exports = function (message) {
        if (message === undefined || message === null)
            throw new Error('Illegal argument ' + message);
        return xxhash64(message)
    };
})();