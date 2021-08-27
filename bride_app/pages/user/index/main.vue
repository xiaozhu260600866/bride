<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="head-info">
				<view class="utop main-bg">
					<view class="uinfo" v-if="!data.user.userInfo.phone">
						<view class="header-img">
							<image class="img" :src="data.user.headimgurl" />
						</view>
						<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" :data="v"
							@callBack="goto('/pages/user/card/register/poster',1)">
							<view slot="content">
								<view class="login-nav fc-white fs-14">登录/注册<span
										class="iconfont icon-right fs-10 pl3"></span></view>
							</view>
						</myform>
					</view>
					<view class="uinfo" v-else>
						<view class="header-img">
							<image class="img" :src="data.user.headimgurl" />
						</view>
						<view class="pl15 fc-white info">
							<myform class="w-b100" :ruleform="ruleform" :vaildate="vaildate" :append="true">
								<view slot="content" class="fc-white lh-24 fs-15">
									<view class="group">
										<view>{{data.user.userInfo.phone ? data.user.userInfo.name :data.user.nickname}}
										</view>
										<view class="qrcode plr8" v-if="data.user.member_lev"><span
												class="iconfont icon-user-qrcode fs-18 fc-white"></span></view>
									</view>
									<view v-if="data.user.userInfo.phone">电话号码：<text
											class="Arial">{{data.user.userInfo.phone}}</text></view>
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
					<myform :append="true" :data="v" @callBack="checkUser(data.user,'/pages/user/card/edit/index',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a1.png"></image>
								</view>
								<view class="item-name">我的资料</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="checkUser(data.user,'/pages/user/card/count/index',1)">
						<!-- 我的访客 -->
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a6.png"></image>
								</view>
								<view class="item-name">谁看过我</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="checkUser(data.user,'/pages/user/card/count/index',1)">
						<!-- 名片夹 -->
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a3.png"></image>
								</view>
								<view class="item-name">关注我的</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="checkUser(data.user,'/pages/user/card/photo/index',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b1.png"></image>
								</view>
								<view class="item-name">上传照片</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v"
						@callBack="checkUser(data.user,'/pages/user/card/verified/index',1)"
						v-if="data.user.is_authentication == 0">
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

					<myform :append="true" :data="v"
						@callBack="checkUser(data.user,'/pages/order/lists/main?status=12&historyUrl=del',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b7.png"></image>
								</view>
								<view class="item-name">我的订单</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v"
						@callBack="checkUser(data.user,'/pages/user/demand/lists/index',1)">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-b5.png"></image>
								</view>
								<view class="item-name">发布动态</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v" @callBack="checkUser(data.user,'/pages/user/my/activity/index')">
						<view slot="content">
							<view class="ulist-item">
								<view class="item-icon">
									<image class="img" src="https://card.doxinsoft.com/images/wap/unav-a2.png"></image>
								</view>
								<view class="item-name">我的活动</view>
							</view>
						</view>
					</myform>
					<myform :append="true" :data="v"
						@callBack="checkUser(data.user,'/pages/user/integral/count/main',1)">
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
			<view class="copyright" @click="phone('13318639080')">技术合作：广东科阅云</view>
		</view>

	</view>
</template>
<script>
	import "./index.css";
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components: {
			dxNavClass
		},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				vaildate: {}
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
			return this.shareSource(this, '456在线', '1');
		},
		onLoad(options) {
			wx.removeStorageSync('order_no');
			wx.removeStorageSync('package');


			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			gotoDis() {
				if (!this.data.user.userInfo.phone) {
					return this.goto("/pages/user/card/register/poster", 1);
				} else if (!this.data.user.is_authentication) {
					return this.goto("/pages/user/card/verified/index", 1);
				}
				console.log("aaa")
				return this.goto(this.data.isDis ? '/pages/distribution/index/main' :'/pages/distribution/add/main' ,1)
			},
			checkAuth(v) {
				return this.goto(v.url, v.type);
			},
			ajax() {
				this.getAjax(this).then(msg => {


				});
			}
		},

	}
</script>
