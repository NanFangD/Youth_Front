import Vue from 'vue'
import VueRouter from 'vue-router'
//为了输出警告信息，告知未登录的用户
import { Message } from 'element-ui';
//一级目录
import Login from '../components/Login'
import Home from '../components/common/Home'
//二级目录
import Index from '../components/index/Index'
import Jotter from '../components/jotter/Jotter'
import Library from '../components/library/Library'
import Admin from '../components/admin/Admin'
//弹出新页面
import BookMsg from '../components/BookMsg'

Vue.use(VueRouter);
const routes = [
    //首界面
    {
        path: '/',
        name: 'Default',
        redirect: '/Library',
        component: Library
    },
    //登录界面
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path:'/bookMsg',
        name:'BookMsg',
        component:BookMsg
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
        component: Home,
        children:[
            //首页
            {
                path:'/index',
                name:'Index',
                component:Index,
                meta:{auth: true},
            },
            //笔记本
            {
                path:'/jotter',
                name:'Jotter',
                component:Jotter,
                meta:{auth: true},
            },
            //图书馆
            {
                path:'/library',
                name:'Library',
                component:Library,
                meta:{auth: true},
            },
            //个人中心
            {
                path:'/admin',
                name:'Admin',
                component:Admin,
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
