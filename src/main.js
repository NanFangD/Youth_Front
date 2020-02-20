import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import VueBus from 'vue-bus';
Vue.use(VueBus);
//自适应手机屏幕
// import 'lib-flexible/flexible'
let axios = require('axios');
axios.defaults.baseURL = 'http://118.25.61.247:8443/api';
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
