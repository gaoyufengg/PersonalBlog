var blogList = new Vue({
    el: '#blog_list',
    data: {
        blogList: []
    },
    computed: {
        abc(){
            console.log('asd')
        }
    },
    created(){
        var self = this;
        axios({
            method: 'get',
            url: '/queryBlog'
        }).then(function(res){
            console.log(res)
            var result = res.data.data;
            result.forEach(function(el){
                el.link = '/blog-detail.html?bid=' + el.id;
            })
            self.blogList = result;
        })
    }
})