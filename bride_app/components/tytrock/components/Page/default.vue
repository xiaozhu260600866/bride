<template>
	<section>
		<slot name="content" />
		<pageHead v-if="pageHeadShow" ref="pageHead" :pageHeadData="pageHeadData"></pageHead>
		
		<tyt-toast :visible="toastVisible" :content="toastText"></tyt-toast>
		<page-loading :visible="pageLoading"></page-loading>
		<tui-loading :visible="submitLoading" :text="submitLoadingText"></tui-loading>
		<dxi-tabbar :tabBar="tabBar" :hump="true" :current="tabBarCurrent" @click="tabbarSwitch" selectedColor="#096" v-if="tabBarDisplay"></dxi-tabbar>
	</section>
</template>
<script type="text/javascript">

import pageHead from "./header";
import tytToast from "@/components/tytrock/components/Page/toast";
import pageLoading from "@/components/tytrock/components/Page/loading";
import tuiLoading from "@/components/ThorUI/loading/loading";
import dxiTabbar from "@/components/dxi-tabbar"
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
	components: {
		tytToast,
		pageLoading,
		tuiLoading,
		pageHead,
		dxiTabbar
	},
	props: {
		mustOpenid:{
			type:Boolean,
			default:true
		},
		pageHeadShow:{
			type:Boolean,
			default:false
		},
		Fbottom:{
			type:String,
			default:''
		},
		pageHeadData:{
			type:Object,
			default:function () {
				return {}
			 }
		},
		tabBarDisplay:{
			type: Boolean,
			default: false
		},
		pageCurrent:{
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			pageLoading:false,
			submitLoading:false,
			submitLoadingText:'操作中...',
			toastVisible:false,
			toastText:'',
			tabBarCurrent: this.pageCurrent,
			tabBar: [
				{
					"pagePath": "/pages/index/index",
					"text": "首页",
					"iconPath": "/static/A1.png",
					"selectedIconPath": "/static/A2.png"
				},{
					"pagePath": "/pages/cp/lists/index",
					"text": "cp",
					"iconPath": "/static/B1.png",
					"selectedIconPath": "/static/B2.png"
				},{
					"pagePath": "/pages/people/lists/index",
					"text": "推荐",
					"iconPath": "/static/C1.png",
					"selectedIconPath": "/static/C2.png",
					"hump": true
				},{
					"pagePath": "/pages/activity/lists/index",
					"text": "闪聚",
					"iconPath": "/static/D1.png",
					"selectedIconPath": "/static/D2.png"
				},{
					"pagePath": "/pages/user/index/index",
					"text": "我的",
					"iconPath": "/static/E1.png",
					"selectedIconPath": "/static/E2.png"
				}
			]
		}
	},
	watch: {
	},
	onLoad(){
		
	},
	methods: {
		...mapMutations(['login','setUserInfo','setExamine','setSysConfig']),
		tabbarSwitch(data) {
			this.linkTo(data.pagePath,1)
		}
	},
	created() {
		/*
		sysConfig({}).then((res)=>{
			//this.$parent.examining = false;
			//console.log('examining')
			if(this.$parent.ex != undefined) this.$parent.ex = res.data.data.examining=="1"?true:false;
			if(this.$parent.examining != undefined) this.$parent.examining = res.data.data.examining=="1"?true:false;
			this.setExamine(this.examining);
			if(this.$parent.sysConfig != undefined) this.$parent.sysConfig = res.data.data;
			this.setSysConfig(res.data.data);
		})
		*/
	}
}
</script>

<style>
</style>
