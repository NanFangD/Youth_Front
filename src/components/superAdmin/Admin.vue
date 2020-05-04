<template>
    <el-container style=" border: 1px solid #eee" >
        <!--回到顶部-->
        <el-backtop>
            <i class="el-icon-caret-top">up</i>
        </el-backtop>
        <el-aside style="width:200px">
            <Menu></Menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px" class="">
                <Header></Header>
            </el-header>
            <el-main >
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Menu from "./Menu";
    import Header from "./Header";
    import Main from "./Main";
    export default {
        name:'admin',
        components: {Main, Header, Menu},
    };
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
</style>
