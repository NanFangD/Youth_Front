import VueRouter from 'vue-router'
//为了输出警告信息，告知未登录的用户
import axios from 'axios';
import { Message } from 'element-ui';
const routes = [
    {
        path:'/ujs',
        name:'ujsAutoSend',
        component:resolve=> require(['@/components/Test/AutoSend'],resolve),
    },
    //管理系统登录
    {
        path:'/adminLogin',
        name:'AdminLogin',
        component:resolve=> require(['@/components/superAdmin/Login'],resolve),
    },
    //超级管理员
    {
        path:'/superAdmin',
        name:'SuperAdmin',
        component:resolve=> require(['@/components/superAdmin/Admin'],resolve),
        meta:{
            // 为true表示用户访问该组件的时候需要登录
            authAdmin: true,
        },
    },
    //首界面
    {
        path: '/',
        name: 'Default',
        redirect: '/index',
        component:resolve=> require(['@/components/index/Index'],resolve),

    },
    //登录界面
    {
        path: '/login',
        name: 'Login',
        component:resolve=> require(['@/components/Login'],resolve)
    },
    {
        path:'/bookMsg',
        name:'BookMsg',
        component:resolve=> require(['@/components/BookMsg'],resolve)
    },
    //主菜单栏
    {
        // home页面并不需要被访问，只是作为其它组件的父组件
        path:'/home',
        name:'Home',
        redirect: '/index',
        meta:{
            // 为true表示用户访问该组件的时候需要登录
            auth: true,
        },
        component:resolve=> require(['@/components/common/Home'],resolve),
        children:[
            //首页
            {
                path:'/index',
                name:'Index',
                component:resolve=> require(['@/components/index/Index'],resolve),
                meta:{auth: true},
            },
            //笔记本
            {
                path:'/jotter',
                name:'Jotter',
                component:resolve=> require(['@/components/jotter/Jotter'],resolve),
                meta:{auth: true},
            },
            //图书馆
            {
                path:'/library',
                name:'Library',
                component:resolve=> require(['@/components/library/Library'],resolve),
                meta:{auth: true},
            },
            //个人中心
            {
                path:'/admin',
                name:'Admin',
                component:resolve=> require(['@/components/admin/Admin'],resolve),
                meta:{auth: true},
            }
        ]
    },

];
const router = new VueRouter({
    // mode: 'history',//使用 History 模式 去掉后默认谁hash模式
    base: process.env.BASE_URL,
    routes
});
function getCookie(name){
    let strCookie = document.cookie;//获取cookie字符串
    let arrCookie = strCookie.split("; ");//分割
    //遍历匹配
    for ( let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (arr[0] === name){
            return arr[1];
        }
    }
    return "";
}
//全局守卫
router.beforeEach((to, form, next) => {
    if(to.path==="/superAdmin"){
        if (to.meta.authAdmin){
            axios({
                method:'post',
                url:'/selectAdmin',
                params:{
                    uid:((getCookie("fang")-10)/2)
                }})
                .then(
                    successResponse => {
                        if (successResponse.data===true) {
                            next();
                        }else {
                            //提醒用户登录后再进入
                            Message({
                                showClose: true,
                                message: '您不应该进到这里',
                                type: 'warning'
                            });
                            next({
                                path: '/login'
                            })
                        }
                    })
                .catch(failResponse => {

                });
        }
    }
    //若用户没有登录则跳转至About界面
    if (to.meta.auth) {
        axios({
            method:'post',
            url:'/selectUser',
            params:{
                uid:((getCookie("user")-10)/2)
            }})
            .then(
                successResponse => {
                    if (successResponse.data===true) {
                        next();
                    }else {
                        //提醒用户登录后再进入
                        Message({
                            showClose: true,
                            message: '请先登录',
                            type: 'warning'
                        });
                        next({
                            path: '/login'
                        })
                    }
                })
            .catch(failResponse => {

            });
    } else {
        next();
    }
});

export default router
