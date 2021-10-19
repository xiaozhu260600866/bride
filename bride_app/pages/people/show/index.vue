<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pb10" v-if="data.show">
			<view class="top-bg">
				<image class="w-b100 flex" src="/static/show-top-bg.jpg" mode="widthFix"></image>
			</view>
			<view class="show-block info-sec">
				<view class="header">
					<image class="head-img" :src="data.user.headerPic" mode="aspectFill"></image>
					<dx-button type="primary" :plain="data.isSubscribe?true:false" :txtColor="data.isSubscribe?'#333':''" size="medium" round @click="subscribe()">+ {{data.isSubscribe ? '已':''}}关注</dx-button>
				</view>
				<view class="name fs-18 lh-24 mtb15 fw-bold">{{data.user.userInfo.name}}</view>
				<view class="label-group fc-4">
					<view class="label city">{{data.user.city}}</view>
					<view class="label age" v-if="data.user.userInfo.age"><text class="Arial">{{data.user.userInfo.age}}</text>岁</view>
					<view class="label height Arial" v-if="data.user.userInfo.height">{{data.user.userInfo.height}}</view>
				</view>
				<view class="intro" v-if="data.user.userInfo.remark">
					<view class="title fs-16 fw-bold pt15">个人独白</view>
					<view class="content">{{data.user.userInfo.remark}}</view>
				</view>
			</view>
			<view class="show-block photoAlbum pl20" v-if="data.photos.length">
				<view class="sec-title">TA的相册</view>
				<dx-images :data="data.photos" scroll :LRPadding="0" :imgR="6"></dx-images>
			</view>
			<view class="show-block dynamic plr20" v-if="data.articleOrder.length">
				<view class="sec-title">TA的动态</view>
				<trendsLists :data="data.articleOrder" :type="2"></trendsLists>
				<!-- <dynamicLists :data="data.articleOrder" type="1"></dynamicLists> -->
				<view class="more ptb10 flex-middle flex-center bd-te fc-6" @click="goto('/pages/people/show/layouts/dynamic?id='+data.user.id,1)" v-if="data.articleOrder.length > 3">
					<text class="fs-15">查看更多</text><text class="iconfont icon-more fs-12 pl3"></text>
				</view>
			</view>
			<view class="show-block myInfo plr20" v-if="data.user.userInfo.sex">
				<view class="sec-title">个人资料</view>
				<view class="tag-group">
					<view class="tag" v-if="data.user.userInfo.height">{{data.user.userInfo.height}}</view>
					<view class="tag" v-if="data.user.userInfo.age">{{data.user.userInfo.age}}</view>
					<view class="tag" v-if="data.user.userInfo.education">{{data.user.userInfo.education}}</view>
					<view class="tag" v-if="data.user.userInfo.profession">{{data.user.userInfo.profession}}</view>
					<view class="tag" v-if="data.user.userInfo.salary">{{data.user.userInfo.salary}}</view>
					<view class="tag" >{{data.user.userInfo.sex == 1 ? '男' :'女'}}</view>
					<view class="tag" v-if="data.user.userInfo.marriage">{{data.user.userInfo.marriage}}</view>
				</view>
			</view>

			<view class="show-block condition plr20" v-if="condTags.age">
				<view class="sec-title">择偶条件</view>
				<view class="tag-group">
					<view class="tag" v-for="item in condTags" v-if="item">{{ item }}</view>
				</view>
			</view>
			<view class="show-block condition plr20" v-if="data.user.userInfo.hobby">
				<view class="sec-title">兴趣爱好</view>
				<view class="tag-group">
					<view class="tag" v-for="item in data.user.userInfo.hobby.split(',')" v-if="item">{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	import dynamicLists from "@/components/dynamicLists"
	import trendsLists from "@/components/trendsLists";
	export default {
		components: {dxImages,dynamicLists,trendsLists},
		data() {
			return {
				formAction: '/people.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			thumb3(key){
				let item = this.data.lists.data[key];
				this.postAjax("/articleOrder/thumb",{articleOrder_id:item.id},"notloading").then(msg=>{
					if(msg.data.status == 2){
						//this.getParent()
						//this.$set(item,"thumb",!item.thumb);
						item.thumb = !item.thumb;
						if(item.thumb){
							item.thumbCount ++;
						}else{
							 item.thumbCount --;
						}
					 }
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.user.userInfo.marry_condition){
						this.condTags = msg.user.userInfo.marry_condition.indexOf("{")!=-1 ? JSON.parse(msg.user.userInfo.marry_condition) : msg.user.userInfo.marry_condition.split(",");
					}
					if(this.data.nextPage ==1){
						this.$refs.page.share(msg.user.userInfo.name+"的资料","https://bride.doxinsoft.com/images/logo.png","青春不常在，抓紧谈恋爱");
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