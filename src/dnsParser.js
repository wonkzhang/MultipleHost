var fs = require('fs');


exports.parse = function (hostsPath) {
    console.log(hostsPath);
    var hostsMap = {};

    try {
        var contents = fs.readFileSync(hostsPath).toString();
    } catch (e) {
        throw new Error('读取hosts文件出错');
    }

    var lines = contents.split('\n');

    lines.forEach(function (v) {
        var res = /^([^ #]+) +([^ ]+)/.exec(v.trim());

        if (res != null) {
            hostsMap[res[2]] = res[1];
        }
    });

    console.log(hostsMap);

    return hostsMap;
};

//exports.parse('C:/Users/mik.zhang/Desktop/freeHosts.txt');