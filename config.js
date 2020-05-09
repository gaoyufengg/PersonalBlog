var fs = require('fs');

var globalConfig = {}

var configArr = fs.readFileSync('./server.conf').toString().split('\n');

for(var i = 0; i < configArr.length; i++){
    var item = configArr[i].trim().split('=');
    globalConfig[item[0]] = item[1];
}
// console.log(globalConfig);

module.exports = globalConfig;
