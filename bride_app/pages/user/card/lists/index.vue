<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs-scroll :tabs="data.industryArr"  @change="search" v-model="data.query.industry" height="52" borderColor="#409eff" curSize="16" curColor="#000" curBold="bold" nameSize="15"></dx-tabs-scroll>
			<view v-if="data.show">
				<cardLists :lists="data.lists.data" :data="data"></cardLists>
			</view>
		</view>
	</view>
</template>	

<script>
	import cardLists from "@/components/cardLists"
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	export default {
		components: {dxTabsScroll,cardLists},
		data() {
			return {
				formAction: '/card.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{value: 0,name: "封面人物"},
					{value: 1,name: "IT软件"},
					{value: 2,name: "营销推广"},
					{value: 3,name: "工商财税"},
					{value: 4,name: "人力资源"},
					{value: 5,name: "广告设计"},
				],
				lists:[
					{
						headerPic:'/static/fenxiaobg.jpg',
						nickname:'',
						isSubscribe: 0,
						userInfo:{
							company_logo:'',
							name:'东信梅',
							position:'普通员工',
							company_name:'江门市东信科技有限公司',
						}
					},
					{
						headerPic:'/static/image/E01.png',
						nickname:'',
						isSubscribe: '',
						userInfo:{
							company_logo:'',
							name:'东信梅',
							position:'普通员工',
							company_name:'江门市东信科技有限公司',
						}
					}
				]
			}
		},
		methods: {
			search(item){
				 console.log("item",item)
				 this.data.query.industry = this.data.industryArr[item.index].value;
				 this.ajax();
			},
			subscribe(v){
				if (this.data.myUser.id == v.id) return false;
				let authType = v.isSubscribe ? "del" : 'add';
				this.postAjax("/shop/user/card-create", { user_id: this.data.myUser.id, to_userid: v.id, type: 14, authType: authType }).then(msg=>{
					  this.ajax();
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					if(this.data.query.title){
						this.setTitle(this.data.query.title);
					}
				});
			},
			
		},
		onLoad(options) {
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import "./index.css";
</style>