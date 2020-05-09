var blogDetail = new Vue({
    el: '#blog-detail',
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: ''
    },
    computed: {
        
    },
    created: function(){
        var self = this;
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
        if(!searchUrlParams){
            return;
        }
        var bid = -1;
        if(searchUrlParams.split('=')[0] == 'bid'){
            try{
                bid = parseInt(searchUrlParams.split('=')[1])
            }catch(e){
                console.log(e)
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(function(res){
            // console.log(res)
            var data = res.data.data;
            var date = new Date(data[0].ctime * 1000)
            var currentTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()

            self.title = data[0].title;
            self.content = data[0].content;
            self.ctime = currentTime;
            self.tags = data[0].tags;
            self.views = data[0].views;
        }).catch(function(err){
            console.log('请求失败')
        })
    }
})

