<template>
    <el-container>
        <el-header height="60px" >
            <router-link class="spanTitle" to="/index" target="_blank">
                Youth Jotter - Your Mind Palace
            </router-link>
        </el-header>
        <el-main class="el-main" >
            <div style=" margin-top: 30px;">
                <div style="margin-left: 200px; float: left;">
                    <div class="col-left">
                        <img :src="bookMsg.cover" class="img-title" />
                    </div>
                </div>
                <div class="col-main">
                    <div class=" div-msg">
                        书&nbsp;名&nbsp;:&nbsp;<span style="color: #d6524a;">《{{bookMsg.title}}》</span>
                    </div>
                    <div class=" div-msg">
                        价&nbsp;格&nbsp;:&nbsp;<span style="color: #d6524a;">{{bookMsg.price}}&nbsp;元</span>
                    </div>
                    <div class=" div-msg">
                        新&nbsp;旧&nbsp;:&nbsp;<span style="color: #000000;">{{bookMsg.newOld}}</span>
                    </div>
                    <div class=" div-msg">
                        区&nbsp;域&nbsp;:&nbsp;<span style="color: #000000;">{{bookMsg.area}}</span>
                    </div>
                    <div class=" div-msg">
                        联&nbsp;系&nbsp;人&nbsp;:&nbsp;<span style="color: #000000;">{{bookMsg.contact}}</span>
                    </div>
                    <div class=" div-msg">
                        Q&nbsp;Q&nbsp;:&nbsp;<span style="color: #000000;">{{bookMsg.qq}}</span>
                    </div>
                    <div class=" div-msg">
                        微&nbsp;信&nbsp;:&nbsp;<span style="color: #000000;">{{bookMsg.weChat}}</span>
                    </div>
                </div>
            </div>
        </el-main>
        <div class="center">
            <div class="msgTitle">
                详情描述
            </div>
            <div class="abs">
                {{bookMsg.abs}}
            </div>
            <div class="msgTitle">
                详细图片
            </div>
            <div style="margin-top: 40px;">
                <div style="margin: 20px" v-for="img in bookMsg.imgs">
                    <img :src="img.img" />
                </div>
            </div>
        </div>
        <el-footer>
            <!--Footer-->
        </el-footer>
    </el-container>

</template>

<script>
    export default {
        name: "BookMsg",
        data() {
            return {
                bookMsg:{
                    title:'',
                    cover:'',
                    price:'',
                    date:'',
                    newOld: '',
                    contact:'',
                    area:'江苏大学',
                    phone:'',
                    qq:'',
                    weChat:'',
                    abs: '',
                    imgs:[
                        {img:''},
                        {img:''},
                        {img:''},
                        {img:''},
                        {img:''},
                    ]
                },

            }
        },
        created(){
            console.log("created");
            this.bookMsg.title=this.$route.query.title;
            this.bookMsg.cover=this.$route.query.cover;
            this.bookMsg.price=this.$route.query.price;
            this.bookMsg.author=this.$route.query.author;
            this.bookMsg.date=this.$route.query.date;
            this.bookMsg.newOld=this.$route.query.newOld;
            this.bookMsg.contact=this.$route.query.contact;
            this.bookMsg.phone=this.$route.query.phone;
            this.bookMsg.qq=this.$route.query.qq;
            this.bookMsg.weChat=this.$route.query.weChat;
            this.bookMsg.abs=this.$route.query.abs;
            this.bookMsg.imgs[0].img=this.$route.query.img_1;
            this.bookMsg.imgs[1].img=this.$route.query.img_2;
            this.bookMsg.imgs[2].img=this.$route.query.img_3;
            this.bookMsg.imgs[3].img=this.$route.query.img_4;
            this.bookMsg.imgs[4].img=this.$route.query.img_5;
        }

    }
</script>

<style scoped>
    .abs{
        margin:20px;
        border:2px;
        width:850px;padding-left:20px;text-align: left
    }
    .center{
        margin-left: 80px;
        margin-right:80px;
        margin-top:40px;
    }
    .msgTitle{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        text-align: left;
        padding-left: 30px;
        margin-top: 20px;
    }
    .div-msg{
        padding:6px;
    }
    .el-main{
        margin: 40px 80px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        color: #333;
    }

    .col-left{
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding:20px;
    }
    .img-title{
        width: 200px;
        height: 300px;
    }
    .col-main{
        width: 200px;
        color: #666;
        text-align: left;
        padding: 20px;
        overflow: hidden;
    }
    .el-header {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .el-footer{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .spanTitle {
        position: absolute;
        left: 2%;
        font-size: 20px;
        font-weight: bold;
        color: #37a8ff;
        cursor:pointer;
        text-decoration: none;
    }

</style>
