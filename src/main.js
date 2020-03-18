import './registerServiceWorker'
import Vue from 'vue'
import App from './App'
import router from './router'
import ELEMENT from 'element-ui'
Vue.use(ELEMENT);
import VueBus from 'vue-bus';
Vue.use(VueBus);
//自适应手机屏幕
// import 'lib-flexible/flexible'
let axios = require('axios');
axios.defaults.baseURL = 'http://118.25.61.247:8443/api';
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
Vue.use(ELEMENT);
Vue.config.productionTip = false;

/*****上线后关闭webpack防止源码泄露******/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;
/************************************/
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
