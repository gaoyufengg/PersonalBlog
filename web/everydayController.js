var path = new Map();
var everydayDao = require('../dao/everydayDao');
var timeUtil = require('../util/timeUtil.js');
var RespUtil = require('../util/RespUtil');

function editEveryday(request, response){
    request.on('data', function(data){
        data = data.toString().trim();
        everydayDao.insertEveryday(data, timeUtil.getNow(), function(res){
            response.writeHead(200);
            response.write(RespUtil.writeResult('success', '添加成功', null))
            response.end();
        })
    })
}
path.set('/editEveryday', editEveryday);


function queryEveryday(request, response){
    everydayDao.queryEveryday(function(res){
        response.writeHead(200);
        response.write(RespUtil.writeResult('success', '添加成功', res))
        response.end();
    })
}
path.set('/queryEveryday', queryEveryday);


module.exports.path = path;