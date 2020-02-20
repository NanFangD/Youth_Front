<template>
    <el-container>
        <el-aside style="width: 200px;margin-top:20px">
            <!--<switch></switch>-->
            <SideMenu @indexSelect="indexSelect" ref="sideMenu"></SideMenu>
        </el-aside>
        <el-main>
            <books books class="books-area" ref="booksArea"></books>
        </el-main>
    </el-container>
</template>
<script>
    import SideMenu from './SideMenu';
    import Books from './Books';
    export default {
        name: "Library",
        components:{
            SideMenu,Books,
        },
        methods: {
            indexSelect(index) {
                let url = 'categories/' + index + '/books';
                console.log(url);
                this.$axios.get(url)
                .then(resp => {
                    if (resp && resp.status === 200) {
                        this.$refs.booksArea.books = resp.data;
                        //改变范围后，将页面回到第一页
                        this.$bus.emit("changeCurrentPage",1);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .books-area {
        width: 990px;
        margin-left: auto;
        margin-right: auto;
    }

</style>
