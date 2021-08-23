<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb10" v-if="data.show">
			<view class="top-bg">
				<image class="w-b100 flex" src="/static/show-top-bg.jpg" mode="widthFix"></image>
			</view>
			<view class="show-block info-sec">
				<view class="header">
					<image class="head-img" :src="data.user.headerPic" mode="aspectFill"></image>
					<dx-button type="primary" size="medium" round @click="subscribe()">+ {{data.isSubscribe ? '已':''}}关注</dx-button>
				</view>
				<view class="name fs-18 lh-24 mtb15 fw-bold">{{data.user.userInfo.name}}</view>
				<view class="label-group fc-4">
					<view class="label city">{{data.user.city}}</view>
					<view class="label age"><text class="Arial">{{data.user.userInfo.age}}</text>岁</view>
					<view class="label height Arial">{{data.user.userInfo.height}}</view>
				</view>
				<view class="intro">
					<view class="title fs-16 fw-bold pt15">个人独白</view>
					<view class="content">{{data.user.userInfo.remark}}</view>
				</view>
			</view>
			<view class="show-block photoAlbum pl20">
				<view class="sec-title">TA的相册</view>
				<dx-images :data="data.photos" scroll :LRPadding="0" :imgR="6"></dx-images>
			</view>
			<view class="show-block dynamic plr20">
				<view class="sec-title">TA的动态</view>
				<dynamicLists :data="data.articleOrder" type="1"></dynamicLists>
			</view>
			<view class="show-block myInfo plr20">
				<view class="sec-title">个人资料</view>
				<view class="tag-group">
					<view class="tag" v-if="data.user.userInfo.height">{{data.user.userInfo.height}}</view>
					<view class="tag" v-if="data.user.userInfo.age">{{data.user.userInfo.age}}</view>
					<view class="tag" v-if="data.user.userInfo.education">{{data.user.userInfo.education}}</view>
					<view class="tag" v-if="data.user.userInfo.profession">{{data.user.userInfo.profession}}</view>
					<view class="tag" v-if="data.user.userInfo.salary">{{data.user.userInfo.salary}}</view>
					<view class="tag" >{{data.user.userInfo.sex == 0 ? '男' :'女'}}</view>
					<view class="tag" v-if="data.user.userInfo.marriage">{{data.user.userInfo.marriage}}</view>
				</view>
			</view>
			<view class="show-block condition plr20">
				<view class="sec-title">择偶条件</view>
				<view class="tag-group">
					<view class="tag" v-for="item in condTags" v-if="item">{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	import dynamicLists from "@/components/dynamicLists"
	export default {
		components: {dxImages,dynamicLists},
		data() {
			return {
				formAction: '/people.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				imgLists:[
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
					{img:"/static/fenxiaobg.jpg"},
					{img:"/static/show-top-bg.jpg"},
				],
				dynamic:[
					{
						day:'07',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg','/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'06',
						date:'21-07',
						title:'东信科技有限公司创立于2006年，专注于移动应用、电子商务领域开发与营销，',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},{
						day:'05',
						date:'21-07',
						title:'东信科技有限公司创立于2006年',
						photo:[]
					},{
						day:'04',
						date:'21-07',
						title:'',
						photo:['/static/fenxiaobg.jpg','/static/show-top-bg.jpg']
					},
				],
				infoTags:['1980年','160cm','本科','5000~10000','广东江门','IT工程师'],
				condTags:[]
			}
		},
		mounted() {
		
		},
		methods: {
			subscribe(){
				if (this.data.myUser.id == this.data.user.id) return false;
				let authType = this.data.isSubscribe ? "del" : 'add';
				this.postAjax("/shop/user/card-create", { user_id: this.data.myUser.id, to_userid: this.data.user.id, type: 14, authType: authType }).then(msg=>{
					  this.data.isSubscribe = msg.data.isSubscribe;
				});
			},
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.user.userInfo.marry_condition){
						 
						 this.condTags = msg.user.userInfo.marry_condition.indexOf("{")!=-1 ? JSON.parse(msg.user.userInfo.marry_condition) : msg.user.userInfo.marry_condition.split(",");
						 
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