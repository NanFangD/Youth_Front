<template>
<div id="poster">
    <el-form class="loginContainer" label-position="left" label-width="0px">
        <img class="loginTitle" src="../../public/img/background/title.png"/>
        <!--<h3 class="loginTitle">Youth</h3>-->
        <el-form-item >
            <el-input @keyup.enter.native="login" autofocus="autofocus" type="text" v-model="loginForm.uid" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input @keyup.enter.native="login" type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%">
            <el-button type="primary" style="width:100%; border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    uid: '',
                    password: '',
                    message: ''
                },
                responseResult: []
            }
        },
        methods: {
            //判断账号是否符合标准
            judgeUid(){
                let form=new RegExp(/^[0-9]{5,15}$/);
                return form.test(this.loginForm.uid);
            },
            //判断密码是否符合标准
            judgePassword(){
                let form=new RegExp(/^[a-zA-z0-9_]{3,15}$/);
                return form.test(this.loginForm.password);
            },
            login () {
                //只有两个都为true才进入数据库判断
                if(this.judgeUid()&&this.judgePassword()){
                    this.$axios
                        .post('/login', {
                            uid: this.loginForm.uid,
                            password: this.loginForm.password,
                        })
                        .then(
                            successResponse => {
                                if (successResponse.data !=="") {
                                    this.$message({
                                        showClose: true,
                                        message: '登录成功',
                                        type: 'success'
                                    });
                                    //将账号存到cookie中,存储时间为一天
                                    let d = new Date();
                                    d.setTime(d.getTime()+(3600000));
                                    document.cookie="user="+(successResponse.data*2+10)+";"+"expires="+d.toUTCString();
                                    this.$router.replace({path: '/index'})
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message: '账号或密码错误',
                                        type: 'error'
                                    });
                                }
                            })
                        .catch(failResponse => {
                            this.$message({
                                showClose: true,
                                message: '账号或密码错误',
                                type: 'error'
                            });
                        })
                }else{
                    this.$message({
                        showClose: true,
                        message: '账号或密码格式不正确',
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>
<style>
    #poster {
        background: url("../../public/img/background/4.png") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
    }
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 0px auto 20px auto;
        text-align: center;
        color: #505458;
        width:90px;
    }
</style>


