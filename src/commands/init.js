
function setHostsName(){

    var text = '为hosts环境起名';

    console.info(text);

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', function() {

        console.log('readable');

        var chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write('data: ' + chunk);
        }
    });

    process.stdin.on('end', function() {
        process.stdout.write('end');
    });

}

setHostsName();

var needToKnow = [
    '为hosts环境起名',
    'hosts文件路径',
    'firefox程序安装路径',
    'chrome程序安装路径'
];

module.export = function(){

    //
    needToKnow.forEach(function(){

    });
}