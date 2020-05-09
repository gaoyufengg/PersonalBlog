var path = new Map();
var url = require('url');
var tagsDao = require('../dao/tagsDao.js');
var respUtil = require('../util/RespUtil');
var timeUtil = require('../util/timeUtil');
var tagBlogMapingDao = require('../dao/tagBlogMapingDao');
var editBlogDao = require('../dao/editBlogDao');



function queryAllTags(request, response){
    tagsDao.queryAllTags(function(res){
        res.sort(function(){
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '获取所有标签成功', res));
        response.end();
    })
}
path.set('/queryAllTags', queryAllTags)


function queryeByTag(request, response){
    var params = url.parse(request.url, true).query;

    tagsDao.queryTags(params.tag, function(res){
        if(res == null || res.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '通过标签查blog成功', res))
            response.end();
        }else{
            tagBlogMapingDao.queryeByTag(res[0].id,parseInt(params.page),parseInt(params.pageSize), function(res){
                var blogList = [];
                for(var i = 0; i < res.length; i++){
                    editBlogDao.queryBlogById(res[i].blog_id, function(result){
                        // console.log(result)
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, res.length, response);

            })
        }
        
    })
}

function getResult(blogList, len, response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList, len, response)
        }, 40)
    }else{
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '通过标签查blog成功', blogList))
        response.end();
    }
}

path.set('/queryeByTag', queryeByTag)




function queryeByTagCount(request, response){
    var params = url.parse(request.url, true).query;

    tagsDao.queryTags(params.tag, function(res){            //通过标签名，拿到该标签的信息
        if(res == null || res.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '通过标签查blog成功', res))
            response.end();
        }else{
            tagBlogMapingDao.queryeAllByTag(res[0].id ,function(res){          //通过该标签的id，拿到与该标签关联的所有 blog_id
                var blogList = [];
                for(var i = 0; i < res.length; i++){
                    editBlogDao.queryBlogById(res[i].blog_id, function(result){         //通过每个blog_id, 拿到 所有blog的信息
                        // console.log(result)
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, res.length, response);

            })
        }
        
    })
}

path.set('/queryeByTagCount', queryeByTagCount)





module.exports.path = path;