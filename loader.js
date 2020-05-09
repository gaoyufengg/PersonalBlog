var fs = require('fs');
var globalConfig = require('./config.js');

var controllerSet = [];
var setMap = new Map();

var files = fs.readdirSync(globalConfig.web_path);

for(var i = 0; i < files.length; i++){
    var file = require('./' + globalConfig.web_path + '/' + files[i]);
    if(file.path){
        for(var [k ,v] of file.path){
            if(setMap.get(k)){
                throw new Error('url path出错，url:' + globalConfig.web_path + files[i] + '.' + key )
            }else{
                setMap.set(k, v);
            }
        }
        controllerSet.push(file)
    }else{
        throw new Error('访问不了path')
    }
}
// console.log(setMap)

module.exports = setMap;
