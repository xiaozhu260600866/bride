<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="count-top main-bg">
				<view class="ct-group">
					<view class="ct-item">
						<view class="txt">访问总量(次)</view>
						<view class="num">{{data.visitCount}}</view>
					</view>
					<view class="ct-item">
						<view class="txt">今日访问量(次)</view>
						<view class="num">{{data.visitToDayCount}}</view>
					</view>
				</view>
			</view>
			<dx-tabs-scroll :tabs="tabs" @change="ajax" v-model="data.query.type" :height="52" borderColor="#ed5296" :curSize="16" curColor="#333" curBold="bold" :nameSize="16" :borderHeight="4"></dx-tabs-scroll>
			<view class="count-people">
				<view class="cp-lists" v-for="v in data.lists.data">
					<view class="cp-left" >
						<image class="img" :src="v.getUser.headerPic" mode="aspectFill"></image>
					</view>
					<view class="cp-right">
						<view class="cpr-top flex-between lh-1">
							<view class="name fs-16">{{ v.getUser.userInfo.name?v.getUser.userInfo.name: v.getUser.nickname }}<text class="nav" v-if="v.status == 1">互存名片</text></view>
							<view class="time fs-13 fc-9 Arial">{{ v.time }}</view>
						</view>
						<view class="cpr-row fs-13 fc-9 mt8">
							<text class="txt" v-if="v.getUser.userInfo.position">{{ v.getUser.userInfo.position }}</text>
							<text class="line plr10" v-if="v.getUser.userInfo.company_name">|</text>
							<text class="txt" v-if="v.getUser.userInfo.company_name">{{ v.getUser.userInfo.company_name }}</text>
						</view>
						<view class="cpr-row fs-15 fc-6 mb5">{{v.getType}}</view>
						<view class="cpr-row fs-13 fc-9"><!-- 来源：我于{{v.date}}向对方发出了名片 -->{{v.created_at}}</view>
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
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import dxButton from "doxinui/components/button/button"　　
	export default {
		components: {dxTabsScroll,dxButton},
		data() {
			return {
				formAction: '/cardCount.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{value: 0,name: "我的访客"},
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