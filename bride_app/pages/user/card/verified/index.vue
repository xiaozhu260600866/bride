<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show">
			<!-- 未认证显示 -->
			<view class="Tuser">
				<view class="header">
					<image class="img" src="/static/fenxiaobg.jpg"></image>
				</view>
				<view class="info">
					<view class="name">东信科技，梅</view>
					<view class="time">注册时间：<text class="Arial">2021-08-03</text></view>
				</view>
			</view>
			<view class="ver-tab" :class="[verTab == 1?'tabOne':'tabTwo']">
				<view class="item left" @click="verTab=1">
					<view class="item-box">
						<view class="icon">
							<text class="iconfont icon-wechat-all"></text>
						</view>
						<view class="info">
							<view class="name">VIP会员</view>
							<view class="tips">结识海量认证客户</view>
						</view>
					</view>
				</view>
				<view class="item right" @click="verTab=2">
					<view class="item-box">
						<view class="icon">
							<text class="iconfont icon-wechat-all"></text>
						</view>
						<view class="info">
							<view class="name">超级会员</view>
							<view class="tips">全面提升交友效率</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ver-price">
				<view class="verVip" v-if="verTab == 1">
					<view class="price-length">
						<view class="item" :class="[verVip==1?'cur':'']" @click="verVip=1">
							<view class="time"><text class="num">12</text>个月</view>
							<view class="price">￥<text class="num">388</text></view>
							<view class="average">日均<text class="num">1.06</text>元</view>
						</view>
						<view class="item" :class="[verVip==2?'cur':'']" @click="verVip=2">
							<view class="time"><text class="num">3</text>个月</view>
							<view class="price">￥<text class="num">348</text></view>
							<view class="average">日均<text class="num">3.8</text>元</view>
						</view>
						<view class="item" :class="[verVip==3?'cur':'']" @click="verVip=3">
							<view class="time"><text class="num">1</text>个月</view>
							<view class="price">￥<text class="num">248</text></view>
							<view class="average">日均<text class="num">8.2</text>元</view>
						</view>
					</view>
					<view class="subBtn">
						<dx-button type="primary" block size="lg">立即开通</dx-button>
					</view>
				</view>
				<view class="verSVip" v-if="verTab == 2">
					<view class="price-length">
						<view class="item" :class="[verSVip==1?'cur':'']" @click="verSVip=1">
							<view class="time"><text class="num">12</text>个月</view>
							<view class="price">￥<text class="num">698</text></view>
							<view class="average">日均<text class="num">1.9</text>元</view>
						</view>
						<view class="item" :class="[verSVip==2?'cur':'']" @click="verSVip=2">
							<view class="time"><text class="num">3</text>个月</view>
							<view class="price">￥<text class="num">588</text></view>
							<view class="average">日均<text class="num">6.5</text>元</view>
						</view>
						<view class="item" :class="[verSVip==3?'cur':'']" @click="verSVip=3">
							<view class="time"><text class="num">1</text>个月</view>
							<view class="price">￥<text class="num">348</text></view>
							<view class="average">日均<text class="num">11.2</text>元</view>
						</view>
					</view>
					<view class="subBtn">
						<dx-button type="primary" block size="lg">立即开通</dx-button>
					</view>
				</view>
			</view>
			
			<view class="ver-detail" :class="verTab==1?'vip-detail':'Svip-detail'">
				<view class="title"><view class="name">特权说明</view></view>
				<view class="content p15 fs-16">
					<u-parse :content="data.article.content" />
				</view>
			</view>
			
			<!-- <block v-if="data.user.is_authentication == 0 ">
				<view v-if="step == 1">
					<view class="content p15 fs-16">
						<u-parse :content="data.article.content" />
					</view>
					<dxftButton type="primary" size="lg" @click="submit">名片认证(<text class="Arial">{{data.siteConfig.verify_amount}}</text>)元</dxftButton>
				</view>
				<dx-results txt="支付成功" @click="goto('/pages/index/main',2)" v-if="step == 2"></dx-results>
			</block>
			<block v-else>
				<view class="payed-content">
					<view class="pay-success">
						<image class="img" :src="getSiteName +'/images/wap/pay-ad.jpg'" mode="widthFix"></image>
						<view class="text">名片已认证，您可以发布服务需求、企业简介，开启线上互动服务。</view>
					</view>
					<view class="m20"><dxButton type="primary" size="lg" @click="goto('/pages/index/main',2)" block round>返回</dxButton></view>
				</view>
			</block> -->
		
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxResults from "doxinui/components/results/results"
	export default {
		components: {dxftButton,uParse,dxResults},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step:1,
				verTab: 1,
				verVip: 1,
				verSVip: 1,
				item:{
					status: 1,
					price: 10,
					content:'名片认证，您可以发布服务需求、企业简介，开启线上互动服务。'
				}
				
			}
		},
		methods: {
			submit(){
				this.postAjax("/user/auth",{payType:this.data.siteConfig.verify_amount,payName:'名片认证'}).then(msg=>{
				    let res = JSON.parse(msg.data.config);
					wx.requestPayment({
						'timeStamp': res.timeStamp,
						'nonceStr': res.nonceStr,
						'package': res.package,
						'signType': res.signType,
						'paySign': res.paySign,
						'success': res => {
							//发送模板消息结束
							this.step  = 2;
						},
						'fail': res => {
							this.getError("支付失败");
						}
					})
				})
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
<style>
@import "./index.css";
</style>