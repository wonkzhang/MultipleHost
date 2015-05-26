var net = require('net');
var dnsParser = require('./dnsParser');
var HTTPSourceParser = require('./httpSourceParser');
var extend = require('extend');

/**
 * @fileoverview 代理server
 *
 * @param {Object} options
 * @param {Number} [options.port=3128] 代理端口
 * @param {String} options.hostsPath hosts文件路径
 */
var ProxyServer = function (options) {

    this.hostsMap = null;
    this.server = null;

    this.options = extend({}, options);

    this.start();
}

ProxyServer.prototype.start = function () {

    this.parseDNS();

    this.createServer();
};

ProxyServer.prototype.createServer = function () {

    var self = this;

    this.server = net.createServer(function (serverSocket) {

        self.connection(serverSocket);
    });

    this.server.listen(3129);

};

ProxyServer.prototype.connection = function (serverSocket) {

    var self = this;

    serverSocket.on('data', function (data) {

        var httpSourceParser = new HTTPSourceParser(data.toString());

        var port = httpSourceParser.getPort();
        var originalHost = httpSourceParser.getHost();
        var host = self.hostsMap[originalHost] ?
            self.hostsMap[originalHost] : originalHost;

        var protocol = httpSourceParser.getProtocol();

        var url = httpSourceParser.getURL();

        console.log(url);

        var client = net.connect({
            port: port,
            host: host
        }, function () {

            //uri不使用相对路径 在qzz server中就会出错
            var bufferStr = (data.toString()).replace([
                protocol, '://', originalHost
            ].join(''), '');

            var buffer = new Buffer(bufferStr);

            client.write(buffer);
        });

        client.on('error', function (e) {
            console.log(e);
        });

        client.on('data', function (data) {
            serverSocket.write(data);
        });
    });

    serverSocket.on('end', function () {
        console.log('server disconnected');
    });
};

ProxyServer.prototype.parseDNS = function () {

    this.hostsMap = dnsParser.parse(this.options.hostsPath);
};

module.exports = ProxyServer;

//new ProxyServer();