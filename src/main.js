import './registerServiceWorker'
import Vue from 'vue'
import App from './App'
import router from './router'
/*****Element-Ui按需引入*****/
import {
    Button,
    Select,
    Input,
    FormItem,
    Form,
    Container,
    Drawer,
    Upload,
    DatePicker,
    Dialog,
    Pagination,
    Link,
    Card,
    Tooltip,
    Aside,
    Cascader,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Row,
    Menu,
    Col,
    Main,
    Header,
    Footer,
    Popover,
    RadioGroup,
    RadioButton,
    Popconfirm,
    Backtop,
} from 'element-ui'
Vue.use(Popover);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Container);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Container);
Vue.use(Drawer);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Link);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Aside);
Vue.use(Cascader);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Col);
Vue.use(Main);
Vue.use(Header);
Vue.use(Footer);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Popconfirm);
Vue.use(Backtop);
/******************/
/****全局引入****/
// import ELEMENT from 'element-ui'
// Vue.use(ELEMENT);
/******************/
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
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
