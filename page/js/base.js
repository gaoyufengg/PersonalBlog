var randomTags = new Vue({
    el: '#random-tags',
    data: {
        tagList: []
    },
    computed: {
        randomColor (){
            return function(){
                var str = 'rgb('
                for(var i = 0; i < 3; i++){
                    var clr = Math.floor(Math.random() * 255);
                    str += `${clr},`
                }
                str = str.slice(0, -1) 
                str += ')'
                return str;
            }
        },
        randomSize(){
            return function(){
                var size = Math.floor((Math.random() * 20 + 12)) +'px';
                return size;
            }
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryAllTags'
        }).then((res) => {
            // console.log(res)
            var result = res.data.data;
            result.forEach(el => {
                this.tagList.push(el.tag)
            })
            // console.log(this.tagList)
        }).catch((err) => {
            console.log(err)
        })
    },
})

var newHot = new Vue({
    el: '#new-hot',
    data: {
        newsList: []
    },
    created(){
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then((res) => {
            var data = res.data.data;
            data.forEach(el => {
                var obj = {}
                el.link = '/blog-detail.html?bid=' + el.id;
                obj.title = el.title;
                obj.link = el.link;
                this.newsList.push(obj);
            })
            
        }).catch(function(err){
            console.log('err')
        })
    }
})

var newComments = new Vue({
    el: '#new-comments',
    data: {
        commentsList: []
    },
    created(){
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then((res) => {
            // console.log(res)
            var data = res.data.data;
            data.forEach(el => {
                var obj = {};
                var date = new Date(el.ctime * 1000)
                var currentTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
                obj.user = el.user_name;
                obj.date = currentTime;
                obj.content = el.comments;
                this.commentsList.push(obj);
            })
            
        }).catch(function(err){
            console.log('err')
        })
    }
})
