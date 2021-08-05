

import Vue from 'vue'
import App from './App'
import myfun from 'xiaozhu/uniapp/js/myfun.js' //引入自定义方法
import filter from 'xiaozhu/uniapp/js/filter.js' //引入自定义方法
import myfun2 from './public/js/myfun.js' //引入自定义方法
import ajax from 'xiaozhu/uniapp/js/ajax.js' //引入自定义方法
import message from 'xiaozhu/uniapp/js/message.js' //引入自定义方法
import date from 'xiaozhu/uniapp/js/date.js' //引入自定义方法
import vaildate from 'xiaozhu/uniapp/js/vaildate.js' //引入自定义方法

import store from './vuex/index.js'
Vue.prototype.$store=store;


//全局组件
import myswiper from 'doxinui/components/swiper/swiper'
Vue.component(
	'myswiper',
	myswiper
);
import myswiper2 from 'xiaozhu/uniapp/components/swiper'
Vue.component(
	'myswiper2',
	myswiper2
);
import page from 'xiaozhu/uniapp/components/default'
Vue.component(
	'page',
	page
);
import hasMore from 'xiaozhu/uniapp/components/hasMore'
Vue.component(
	'hasMore',
	hasMore
);
import authorize from 'xiaozhu/uniapp/components/authorize'
Vue.component(
	'authorize',
	authorize
);
import weui_input from 'xiaozhu/uniapp/components/weui_input'
Vue.component(
	'weui-input',
	weui_input
);
import myform from 'xiaozhu/uniapp/components/myform'
Vue.component(
	'myform',
	myform
);
import diag from 'xiaozhu/uniapp/components/diag'
Vue.component(
	'diag',
	diag
);

import floatBtn from 'xiaozhu/uniapp/components/floatBtn'
Vue.component(
	'floatBtn',
	floatBtn
);

import dxButton from "doxinui/components/button/button"
Vue.component(
	'dxButton',
	dxButton
);
import dxAddress from "./components/addressAndCity";
Vue.component(
	'dx-address',
	dxAddress
);

Vue.config.productionTip = false
Vue.use(myfun);
Vue.use(ajax);
Vue.use(myfun2);
Vue.use(message);
Vue.use(date);
Vue.use(filter);
Vue.use(vaildate);

let ztd = uni.getStorageSync('ztd');
if (ztd && !ztd.deliver_type_) {
	uni.removeStorageSync('ztd');
}
// #ifdef MP-WEIXIN
console.log("来这里吧哈哈")
let openid = uni.getStorageSync('openid');
if (openid) {
	uni.removeStorageSync('openid');
}
let unionid = uni.getStorageSync('unionid');
if (unionid) {
	uni.removeStorageSync('unionid');
}
// #endif
import 'provider.js';



//uni.setStorageSync('siteName', 'https://www.lmssht456.com');

uni.setStorageSync('siteName', 'https://bride.doxinsoft.com');

wx.setStorageSync('site_name', 456);
uni.removeStorageSync('jsdk');
uni.removeStorageSync('distribution');
uni.removeStorageSync('merchantUserId');
uni.removeStorageSync('ztd');
uni.removeStorageSync('proid');
//uni.setStorageSync('openid', 'ohOO94sLnnf0bzJpqFqigfNxLSto');
App.mpType = 'app'


import '@/public/css/app.css';
import 'doxinui/css/global_upx.css';
import 'doxinui/css/global_icon.css';
import '@/public/weui/weui.css';
import "@/public/font/iconfont.css";
import "@/public/font/iconfont-hj.css";

const app = new Vue({
	...App
})
app.$mount()
