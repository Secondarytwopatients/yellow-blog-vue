<template>

    <div>
        <Header></Header>
        <div class="m-detail">
            <h2>{{blog.title}}</h2>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name:'BlogEdit', params:{blogId:blog.id}}">
                    编辑
                </router-link>
            </el-link>
            <el-divider></el-divider>
            <div class = "markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>

    import "github-markdown-css";
    import Header from "../components/Header";
    export default {
        name: "BlogDetail",
        components : {Header},
        data() {
            return {
                blog: {
                    id: '',
                    title: '',
                    description: '',
                    content: ''
                },
                ownBlog: false
            }
        },
        created(){
            var _this=this;
            var blogId = _this.$route.params.blogId;
            _this.$axios.get("/blog/"+blogId+"/detail").then(res=>{
                _this.blog.id = res.data.data.id;
                _this.blog.title = res.data.data.title;
                _this.blog.description = res.data.data.description;
                //博客内容需要使用markdown解析
                var MarkdownIt = require("markdown-it");
                var md = new MarkdownIt();
                _this.blog.content = md.render(res.data.data.content);
                //判断是否个人的博客
                _this.ownBlog = (res.data.data.userId == _this.$store.state.userInfo.id? true:false);
            });


        }
    }
</script>

<style scoped>
    .m-detail{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        min-height: 700px;

        padding: 20px 15px;
    }

</style>
