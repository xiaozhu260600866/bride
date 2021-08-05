<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="count-top main-bg">
				<view class="ct-group">
					<view class="ct-item">
						<view class="txt">名片访问总量(次)</view>
						<view class="num">{{data.visitCount}}</view>
					</view>
					<view class="ct-item">
						<view class="txt">今日访问量(次)</view>
						<view class="num">{{data.visitToDayCount}}</view>
					</view>
				</view>
				<view class="ct-group">
					<view class="ct-item">
						<view class="txt">发出名片总量(次)</view>
						<view class="num">{{data.cardCount}}</view>
					</view>
					<view class="ct-item">
						<view class="txt">我的靠谱总量</view>
						<view class="num">{{data.thumpCount}}</view>
					</view>
				</view>
			</view>
			<dx-tabs-scroll :tabs="tabs" @change="ajax" v-model="data.query.type" height="52" borderColor="#409eff" curSize="16" curColor="#333" curBold="bold" nameSize="16"></dx-tabs-scroll>
			<view class="count-people">
				<view v-for="v in data.lists.data">
					<view v-if="data.query.type !=14"  class="cp-lists">
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
					
					<view v-if="data.query.type ==14"  class="cp-lists">
						<view class="cp-left" >
							<image class="img" :src="v.toUser.headerPic" mode="aspectFill"></image>
						</view>
						<view class="cp-right">
							<view class="cpr-top flex-between lh-1">
								<view class="name fs-16">{{ v.toUser.userInfo.name?v.toUser.userInfo.name: v.toUser.nickname }}<text class="nav" v-if="v.status == 1">互存名片</text></view>
								<view class="time fs-13 fc-9 Arial">{{ v.time }}</view>
							</view>
							<view class="cpr-row fs-13 fc-9 mt8">
								<text class="txt" v-if="v.toUser.userInfo.position">{{ v.toUser.userInfo.position }}</text>
								<text class="line plr10" v-if="v.toUser.userInfo.company_name">|</text>
								<text class="txt" v-if="v.toUser.userInfo.company_name">{{ v.toUser.userInfo.company_name }}</text>
							</view>
							<view class="cpr-row fs-15 fc-6 mb5">{{v.getType}}</view>
							<view class="cpr-row fs-13 fc-9">{{v.created_at}}</view>
						</view>
						<view>
							<dx-button type="primary" size="mini" round @click="subscribe(v)">
								取消关注
							</dx-button>
						</view>
					</view>
					
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
					{value: 2,name: "我的靠谱"},
					{value: 14,name: "名片夹"},
				],
				lists:[
					{
						headerPic:'/static/fenxiaobg.jpg',
						nickname:'',
						time:'08:38',
						status: 0,
						date:'2021-07-09',
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
						time:'08:37',
						status: 1,
						date:'2021-07-09',
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