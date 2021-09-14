// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import 'bootstrap/dist/css/bootstrap.min.css'
import 'xiaozhu/wechatapp/css/global.css'
import 'xiaozhu/wechatapp/css/global_new.css'
import "./public/font/iconfont.css";
import "./public/css/app.css";
import "./public/font/icon_website.css";
import "./public/css/weui.css";
import "./public/css/class.css";
import 'xiaozhu/wechatapp/css/flex.css'
import './public/js/global.js' //引入自定义方法
import myfun from 'xiaozhu/vue/packages/admin/myfun.js' //引入自定义方法
import globalJs from 'xiaozhu/js/global.js' //引入自定义方法
import myfun2 from './public/js/myfun.js' //引入自定义方法
import vaildForm from 'xiaozhu/vue/packages/admin/vaildForm.js' //引入自定义方法
import message from 'xiaozhu/vue/packages/admin/message.js' //引入自定义方法
import ajax from 'xiaozhu/vue/packages/admin/ajax.js' //引入自定义方法
import directive from 'xiaozhu/vue/packages/directive/directive.js' //引入自定义方法

//import 'babel-polyfill'

Vue.use(myfun)
Vue.use(myfun2)
Vue.use(vaildForm)
Vue.use(message)
Vue.use(ajax)
Vue.use(directive)
Vue.use(globalJs)

router.beforeEach((to, from, next) => {
    if (to.path.indexOf('admin') != -1) {
        if (!Vue.prototype.getUser()) {
            return router.push({ path: '/login/index' });
        }
        if(!Vue.prototype.getUser().expire){
            return router.push({ path: '/login/index' });
        }
        let now = (new Date()).getTime();
        console.log(now);
        let expire = parseInt(Vue.prototype.getUser().expire);
        console.log(expire);
        if(now >expire){
            return router.push({ path: '/login/index' });
        }
    }
    return next();
})
//全局组件开始
import search from 'xiaozhu/vue/components/admin/search.vue'
Vue.component(
    'my-search',
    search
);

import table from 'xiaozhu/vue/components/admin/table.vue'
Vue.component(
    'my-table',
    table
);
import newtable from './components/newtable'
Vue.component(
    'newtable',
    newtable
);
import myupload from 'xiaozhu/vue/components/admin/uploadPic.vue';
Vue.component(
    'my-upload',
    myupload
);
import cropUpload from "xiaozhu/vue/components/admin/cropUpload";
Vue.component(
    'my-cropUpload',
    cropUpload
);


import noData from './components/noData';
console.log(noData);
Vue.component(
    'noData',
    noData
);

import mycategory from 'xiaozhu/vue/components/admin/category.vue';
Vue.component(
    'my-category',
    mycategory
);



//全局组件结束

let domain = document.domain;
if (domain == "localhost" || domain == "192.168.1.107") {
    localStorage.setItem("siteName", 'https://bride.doxinsoft.com');
} else {
    localStorage.setItem("siteName", 'https://' + domain);
}

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios
import store from './store/'
console.log("112");
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
