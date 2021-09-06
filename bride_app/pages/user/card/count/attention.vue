<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="tabs" @change="ajax" v-model="data.query.sub_type" :height="100" curBold="bold" selectedColor="#ed5296" sliderBgColor="#ed5296" :size="32" :selectedSize="32" bold></dx-tabs>
			<view class="count-people">
				<view class="cp-lists" v-for="v in data.lists.data">
					<view class="cp-left" >
						<image class="img" :src="v.toUser.headerPic" mode="aspectFill"></image>
					</view>
					<view class="cp-right">
						<view class="cpr-top flex-between">
							<view class="name fs-16 flex-middle">{{ v.toUser.userInfo.name }}<text class="nav" v-if="v.status == 1">互存名片</text></view>
						</view>
						<view class="data mt6">
							<view class="lab" v-if="v.toUser.userInfo.age"><text class="Arial">{{v.toUser.userInfo.age}}</text>岁</view>
							<view class="lab" v-if="v.toUser.userInfo.height"><text class="Arial">{{v.toUser.userInfo.height}}</text></view>
							<view class="lab">{{v.toUser.userInfo.city}}</view>
						</view>
						<view class="cpr-row fs-13 fc-9"><!-- 来源：我于{{v.date}}向对方发出了名片 -->{{v.created_at}}</view>
					</view>
					<view>
						<dx-button type="primary" size="mini" round @click="subscribe(v)">
							取消关注
						</dx-button>
					</view>
				</view>
				<view  class="fs-14 fc-8 p20 text-center" v-if="data.lists.data.length == 0">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxButton from "doxinui/components/button/button"　　
	export default {
		components: {dxTabs,dxButton},
		data() {
			return {
				formAction: '/subscribe.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{value: 0,name: "关注我的"},
					{value: 1,name: "我关注的"},
				],
				lists:[{
					created_at:'2021-07-09 08:38:22',
					status: 0,
					toUser:{
						headerPic:'/static/fenxiaobg.jpg',
						userInfo:{
							name:'东信梅',
							age:30,
							height:1.63,
							city:'江门'
						}
					}
				},{
					created_at:'2021-07-09 08:38:22',
					status: 1,
					toUser:{
						headerPic:'/static/fenxiaobg.jpg',
						userInfo:{
							name:'东信梅',
							age:30,
							height:1.63,
							city:'江门'
						}
					}
				}]
			}
		},
		mounted() {
		
		},
		methods: {
			subscribe(v){
				let authType = "del";
				this.postAjax("/shop/user/card-create", { user_id: v.user_id, to_userid: v.to_userid, type: 14, authType: authType }).then(msg=>{
					  this.ajax();
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					
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