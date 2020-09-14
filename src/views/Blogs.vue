<template>
    <div>
        <Header></Header>
        <!--分页框-->
        <div class="block">
            <el-timeline>
                <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
                    <el-card>
                        <router-link :to="{name: 'BlogDetail',params: {blogId: blog.id}}" class ="blogsLinked">
                            <h4>{{blog.title}}</h4>
                        </router-link>
                        <p>{{blog.description}}</p>
                    </el-card>
                </el-timeline-item>

            </el-timeline>
        </div>
        <!--分页栏目-->
        <el-pagination class="m-pagination"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change = "pages">
        </el-pagination>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "Blogs.vue",
        components: {Header},
        data(){
          return{
              blogs: {},
              currentPage: 1,
              total: 0,
              pageSize: 5
          }
        },
        methods: {
            pages(currentPage){
                var _this= this;
                _this.$axios.get("/blogs?currentPage="+currentPage).then(res=>{
                    console.log(res)
                    _this.blogs = res.data.data.list;
                    _this.total = res.data.data.total;
                    _this.currentPage = res.data.data.pageNum;
                    _this.pageSize = res.data.data.pageSize;

                });
            }
        },
        created(){
            this.pages(1);
        }
    }
</script>

<style scoped>
    .m-pagination{

        text-align: center;
    }
    .blogsLinked{
        text-decoration: none;
    }
</style>
