var path = new Map();
var url = require('url');
var commentDao = require('../dao/commentDao.js');
var respUtil = require('../util/RespUtil.js');
var timeUtil = require('../util/timeUtil.js');
var captcha = require('svg-captcha');



function addComment(request, response){
    var params = url.parse(request.url, true).query;
    // console.log(params)
    var id = parseInt(params.id) ;
    var parent = parseInt(params.parent);
    var parentName = params.parentName;
    var name = params.name;
    var email = params.email;
    var content = params.content;

    commentDao.insertComment(id, parent, parentName, name, email, content, timeUtil.getNow(), timeUtil.getNow(), function(res){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', res));
        response.end();
    })
}

path.set('/addComment', addComment)

function queryRandomCode(request, response){
    var img = captcha.create({fontSize:50, width: 100, height: 34});
    // console.log(img)
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '评论成功', img));
    response.end();

}
path.set('/queryRandomCode', queryRandomCode)


function queryCommentsById (request, response){
    var params = url.parse(request.url, true).query;
    // console.log(params)
    commentDao.queryCommentsById(parseInt(params.bid), function(res){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取评论成功', res));
        response.end();
    })
}

path.set('/queryCommentsById', queryCommentsById)


function queryNewComments (request, response){
    commentDao.queryNewComments(5, function(res){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取最新评论成功', res));
        response.end();
    })
}
path.set('/queryNewComments', queryNewComments)



module.exports.path = path;