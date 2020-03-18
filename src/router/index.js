// import Vue from 'vue'
import VueRouter from 'vue-router'

//为了输出警告信息，告知未登录的用户
import { Message } from 'element-ui';
// Vue.use(VueRouter);
const routes = [
    //首界面
    {
        path: '/',
        name: 'Default',
        redirect: '/Library',
        component(resolve){
            require(['../components/library/Library'],resolve)
        }
    },
    //登录界面
    {
        path: '/login',
        name: 'Login',
        component(resolve){
            require(['../components/Login'],resolve)
        }
    },
    {
        path:'/bookMsg',
        name:'BookMsg',
        component(resolve){
            require(['../components/BookMsg'],resolve)
        }
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
        component(resolve){
            require(['../components/common/Home'],resolve)
        },
        children:[
            //首页
            {
                path:'/index',
                name:'Index',
                component(resolve){
                    require(['../components/index/Index'],resolve)
                },
                meta:{auth: true},
            },
            //笔记本
            {
                path:'/jotter',
                name:'Jotter',
                component(resolve){
                    require(['../components/jotter/Jotter'],resolve)
                },
                meta:{auth: true},
            },
            //图书馆
            {
                path:'/library',
                name:'Library',
                component(resolve){
                    require(['../components/library/Library'],resolve)
                },
                meta:{auth: true},
            },
            //个人中心
            {
                path:'/admin',
                name:'Admin',
                component(resolve){
                    require(['../components/admin/Admin'],resolve)
                },
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
//全局守卫
router.beforeEach((to, form, next) => {
    //若用户没有登录则跳转至About界面
    if (to.meta.auth) {
        if (localStorage.getItem('user')) {
            next();
        } else {
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
    } else {
        next();
    }
});

export default router
