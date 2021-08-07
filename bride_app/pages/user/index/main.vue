<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="head-info">
				<view class="utop main-bg">
					<view class="uinfo" v-if="data.user.nickname == '游客'">
						<view class="header-img">
							<image class="img" :src="getSiteName +'/images/nouser01.png'" />
						</view>
						<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" :data="v" @callBack="goto('/pages/user/card/register/index',1)">
							<view slot="content">
								<view class="login-nav fc-white fs-14">登录/注册<span class="iconfont icon-right fs-10 pl3"></span></view>
							</view>
						</myform>
					</view>
					<view class="uinfo" v-else>
						<view class="header-img">
							<image class="img" :src="data.user.headerPic" />
						</view>
						<view class="pl15 fc-white info">
							<myform class="w-b100" :ruleform="ruleform" :vaildate="vaildate" :append="true">
								<view slot="content" class="fc-white lh-24 fs-15">
									<view class="group">
										<view>{{data.user.userInfo.phone ? data.user.userInfo.name :data.user.nickname}}</view>
										<view class="qrcode plr8" v-if="data.user.member_lev"><span class="iconfont icon-user-qrcode fs-18 fc-white"></span></view>
									</view>
									<view v-if="data.user.userInfo.phone">电话号码：<text class="Arial">{{data.user.userInfo.phone}}</text></view>
									<view class="group" v-if="data.user.member_lev">
										<view class="pr8"><span class="iconfont icon-vip fs-16"></span></view>
										<view class="fs-14">{{data.user.member_lev}}</view>
									</view>
								</view>
							</myform>
						</view>
						<!-- <myform :ruleform="ruleform" :vaildate="vaildate" :append="true" :data="v" @callBack="goto('/pages/user/integral/sign/main',1)">
							<view slot="content">
								<view class="gosign fs-13 fc-white">
									<span class="iconfont icon-user-integral-sign fc-white pr5 fs-12"></span>签到
								</view>
							</view>
						</myform> -->
					</view>
				</view>
			</view>
			<!-- <view class="ugorup-box head-count">
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="goto('/pages/user/recharge/count/main',1)">
					<view slot="content" class="c-item">
						<view class="num">{{data.amount}}<text class="unit">元</text></view>
						<view class="name">钱包</view>
					</view>
				</myform>
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="goto('/pages/user/integral/count/main',1)">
					<view slot="content" class="c-item">
						<view class="num">{{data.integral}}<text class="unit">分</text></view>
						<view class="name">积分</view>
					</view>
				</myform>
			</view>
			
			<view class="ugorup-box">
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" :data="v"
				 @callBack="goto('/pages/order/lists/main?status=12&historyUrl=del',1)">
					<view slot="content" class="black-title">
						<view class="name">我的订单</view>
						<view class="all fs-13 fc-6">查看全部
							<span class="iconfont icon-right more fs-13"></span>
						</view>
					</view>
				</myform>
				<dx-nav-class :data="[
					{url:'/pages/order/lists/main?historyUrl=del&status=1',type: 1,cover:getSiteName+'/images/wap/order-icon01.png',
					name:'待付款',number:data.orders1},
					{url:'/pages/order/lists/main?historyUrl=del&status=3',type: 1,cover:getSiteName+'/images/wap/order-icon02.png',
					name:'进行中',number:data.orders3},
					{url:'/pages/order/lists/main?historyUrl=del&status=5',type: 1,cover:getSiteName+'/images/wap/order-icon03.png',
					name:'已结束',number:data.orders5},
					{url:'/pages/order/lists/main?historyUrl=del&status=9',type: 1,cover:getSiteName+'/images/wap/order-icon04.png',
					name:'待评价',number:data.orders9},
					{url:'/pages/order/service/main?historyUrl=del&status=10',type: 1,cover:getSiteName+'/images/wap/order-icon05.png',
					name:'退款/纠纷',number:data.orders10}
				]" @click="checkAuth" isAuth myclass="bdr12" :num="5" :imgWidth="30" :imgHeight="30" :imgR="0" :nameSize="13" :namePTop="5"></dx-nav-class>
			</view>
			<view class="ugorup-box" v-if="data.diag && data.diag.poster_cover2" @click="goto(data.diag.url2,1)">
				<image class="w-b100 flex" :src="getSiteName+'/upload/images/disAd/800_'+ data.diag.poster_cover2" mode="widthFix"></image>
			</view>
			<view class="ugorup-box" v-if="data.diag && data.diag.pic" @click="goto(data.diag.url,1)">
				<image class="w-b100 flex" :src="getSiteName+'/upload/images/poster/800_'+ data.diag.pic" mode="widthFix"></image>
			</view> -->
			
			<view class="ulist ugorup-box " style="margin-top: -70rpx;position: relative;z-index: 6;">
				<view class="black-title">
					<view class="name">我的特权</view>
				</view>
				<view class="ulist-group ptb8 plr5">
					<myform :append="true" :data="v" @callBack="toCard('/pages/user/card/edit/index')">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a1.png"></image>
								</view>
								<view class="item-name">我的资料</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="toCard('/pages/user/card/count/index')"><!-- 我的访客 -->
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a2.png"></image>
								</view>
								<view class="item-name">谁看过我</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v"@callBack="toCard('/pages/user/card/count/index')"><!-- 名片夹 -->
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a3.png"></image>
								</view>
								<view class="item-name">关注我的</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="toCard('/pages/user/card/edit/index')">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b1.png"></image>
								</view>
								<view class="item-name">上传照片</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="toCard('/pages/user/card/verified/index',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b6.png"></image>
								</view>
								<view class="item-name">会员认证</view>
							</view>
						</view>
					</myform>
					<button class="ulist-item" openType="contact">
						<view class="item-icon">
							<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a4.png"></image>
						</view>
						<view class="item-name">在线客服</view>
					</button>
				</view>
			</view>
			
			<view class="ulist ugorup-box">
				<view class="black-title">
					<view class="name">工具与服务</view>
				</view>
				<view class="ulist-group ptb8 plr5">
				
					<myform :append="true" :data="v" @callBack="goto('/pages/order/lists/main?status=12&historyUrl=del',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b7.png"></image>
								</view>
								<view class="item-name">我的订单</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="toCard2('/pages/user/demand/lists/index',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b7.png"></image>
								</view>
								<view class="item-name">发布动态</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="toCard('/pages/user/card/show/index?user_id='+data.user.id)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b7.png"></image>
								</view>
								<view class="item-name">我的活动</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="goto('/pages/user/integral/count/main',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b3.png"></image>
								</view>
								<view class="item-name">我的积分</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="gotoDis()">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a5.png"></image>
								</view>
								<view class="item-name">分享达人</view>
							</view>
						</view>
					</myform>
				</view>
			</view>
			<view class="copyright" @click="phone('13318639080')">版权所有：广东科阅云</view>
		</view>
		<dx-diag :open="false" ref="diag" width="76%">
			<!-- 未注册显示 -->
			<block v-if="!data.user.userInfo.phone">
				<view class="content text-center fs-18 fw-bold fc-0 lh-24 pt40 pb60">你还没有注册电子名片</view>
				<view class="btn">
					<dx-button size="lg" type="primary" round block @click="goto('/pages/user/card/register/index',1)">创建名片</dx-button>
				</view>
			</block>
			<!-- 注册完成，未完善资料显示 -->
			<block v-else>
				<view class="content text-center pt20 pb40">
					<view class="fs-18 fw-bold fc-0 lh-24">名片注册成功</view>
					<view class="fs-17 fc-0 lh-24 mt15">进一步完善数字名片资料，分享推广！</view>
				</view>
				<view class="btn flex-middle">
					<!-- <view class="mr5 w-b100">
						<dx-button size="lg" type="primary" round block @click="$refs.diag.thisDiag = false;ajax()">返回</dx-button>
					</view> -->
					<view class="w-b100">
						<dx-button size="lg" type="primary" round block @click="$refs.diag.thisDiag = false;goto('/pages/user/card/edit/index',1)">完善名片</dx-button>
					</view>
				</view>
			</block>
		</dx-diag>
		
		
		<dx-diag :open="false" ref="diag2" width="76%">
			<!-- 未认证显示 -->
		<block>
			<view class="content text-center pt20 pb40">
				<view class="fs-18 fw-bold fc-0 lh-24">名片认证</view>
				<view class="fs-16 fc-0 lh-24 mt15">你的名片还未认证，请认证后发布需求，企业服务！</view>
			</view>
			<view class="btn flex-middle">
				<view class="ml5 w-b100">
					<dx-button size="lg" type="primary" round block @click="$refs.diag2.thisDiag = false;goto('/pages/user/card/verified/index',1)">进入名片认证</dx-button>
				</view>
			</view>
		</block>
		</dx-diag>
	</view>
</template>
<script>
	import "./index.css";
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components:{dxNavClass,dxDiag},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{}
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, '456在线','1');
		},
		onLoad(options) {
			wx.removeStorageSync('order_no');			wx.removeStorageSync('package');
			this.$refs.diag.thisDiag = false;
			this.ajax();
		},
		onShow(){
			this.onShow(this);
		},
		methods: {
			toCard2(url){
				if(this.data.user.userInfo.phone && this.data.user.is_authentication){
					return this.goto(url,1)
				}else{
					if(!this.data.user.userInfo.phone){
						return this.$refs.diag.thisDiag = true;
						return this.goto("/pages/user/card/register/index",1)
					}else{
						return this.$refs.diag2.thisDiag = true;
						return this.goto("/pages/user/card/verified/index",1)
					}
				}
			},
			toCard(url){
				if(this.data.user.userInfo.phone){
					return this.goto(url,1)
				}else{
					if(url !="/pages/user/card/show/index?user_id="+this.data.user.id){
						return this.$refs.diag.thisDiag = true;
					}else{
						return this.goto("/pages/user/card/register/index",1);
					}
				}
			},
			gotoDis(){
				if(this.data.user.userInfo.phone && this.data.user.is_authentication){
					return this.goto(this.data.isDis ? '/pages/distribution/index/main' :'/pages/distribution/add/main' ,1)
				}else{
					if(!this.data.user.userInfo.phone){
						return this.$refs.diag.thisDiag = true;
						return this.goto("/pages/user/card/register/index",1)
					}else{
						return this.$refs.diag2.thisDiag = true;
						return this.goto("/pages/user/card/verified/index",1)
					}
				}
				
			},
			checkAuth(v){
				return this.goto(v.url,v.type);
			},
			text(){
				
					this.ajax()
					this.ajax()
				
			},
			toMerchant(){
				uni.navigateToMiniProgram({
					appId: 'wxb135e689e76457d2',
					path: 'pages/index/main',
					extraData: {
						'data1': 'test'
					},
					success(res) {
					// 打开成功
					}
				})
			},
			toZtd(){
				uni.navigateToMiniProgram({
				  appId: 'wxa6cfc3a417501b21',
				  path: 'pages/ztd/index/main',
				  extraData: {
				    'data1': 'test'
				  },
				  success(res) {
				    // 打开成功
				  }
				})
			},
			toManager(){
				uni.navigateToMiniProgram({
				  appId: 'wxf15d3bf6eb13b8dd',
				  path: 'pages/manager/index/main',
				  extraData: {
				    'data1': 'test'
				  },
				  success(res) {
				    // 打开成功
				  }
				})
			},
			
			ajax() {
				this.getAjax(this).then(msg => {
					//openCardDiag
					 if(uni.getStorageSync('openCardDiag')){
						 this.$refs.diag.thisDiag = true;
						 uni.removeStorageSync('openCardDiag');
					 }
				});
			}
		},
		components: {}
	}
</script>
