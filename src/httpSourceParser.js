var HTTPSourceParser = function (source) {

    this.source = source;
};

HTTPSourceParser.prototype.getHost = function () {

    var res = /Host: ([^:\r\n]+)/.exec(this.source);
    if (res == null) {
        throw '获取host失败';
    }

    return res[1];
};

HTTPSourceParser.prototype.getPort = function () {

    var res = /Host: [^:]+:(\d+)/.exec(this.source);

    if (res == null) {
        return 80;
    }

    return Number(res[1]);
};

HTTPSourceParser.prototype.getProtocol = function () {

    var res = / {1}([^:]+):/.exec(this.source);

    if (res == null) {
        throw '获取协议失败';
    }

    return res[1];
};

HTTPSourceParser.prototype.getURL = function () {

    return this.source.split('\n')[0].split(' ')[1];
};

module.exports = HTTPSourceParser;

