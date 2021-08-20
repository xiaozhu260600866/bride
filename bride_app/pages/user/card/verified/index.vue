<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show && step == 1">
			<!-- 未认证显示 -->
			<view>
				<view class="Tuser">
					<view class="header">
						<image class="img" :src="data.user.headimgurl"></image>
					</view>
					<view class="info">
						<view class="name">{{data.user.nickname}}</view>
						<view class="time">注册时间：<text class="Arial">{{data.user.updated_at}}</text></view>
					</view>
				</view>
				<view class="ver-tab" :class="[selectKey == 0?'tabOne':'tabTwo']">
					<view class="item" @click="selectKey=key" v-for="(v,key) in data.memberExpire">
						<view class="item-box">
							<view class="icon">
								<text class="iconfont icon-wechat-all"></text>
							</view>
							<view class="info">
								<view class="name">{{v.name}}</view>
								<view class="tips">结识海量认证客户</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ver-price">
					<view :class="[selectKey == 0?'verVip':'verSVip']">
						<view class="price-length">
							<view class="item" :class="[ruleform.amount ==v.amount?'cur':'']"
								v-for="(v,key) in data.memberExpire[selectKey].expire"
								@click="ruleform.amount = v.amount">
								<view class="time"><text class="num">{{v.months}}</text>个月</view>
								<view class="price">￥<text class="num">{{v.amount.split(".")[0]}}</text></view>
								<view class="average">日均<text class="num">{{countToDay(v)}}</text>元</view>
							</view>
						</view>
						<view class="subBtn" @click="submit">
							<dx-button type="primary" block size="lg">立即开通</dx-button>
						</view>
					</view>
				</view>
				<view class="ver-detail" :class="selectKey==0?'vip-detail':'Svip-detail'">
					<view class="title">
						<view class="name">特权说明</view>
					</view>
					<view class="content p15 fs-16">
						<u-parse :content="data.article.content" />
					</view>
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
		<dxResults txt="会员认证成功" @click="goto('/pages/index/main',2)" v-if="step == 2"></dxResults>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxResults from "doxinui/components/results/results"
	export default {
		components: {
			dxftButton,
			uParse,
			dxResults
		},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				step: 1,
				verTab: 1,
				verVip: 1,
				verSVip: 1,
				selectKey: 0,
				ruleform: {
					amount: 0
				},
				item: {
					status: 1,
					price: 10,
					content: '名片认证，您可以发布服务需求、企业简介，开启线上互动服务。'
				}

			}
		},
		methods: {
			formSubmitForH5(config, order_no) {
				console.log("v")
				this.payUniapp(config, msg => {
					this.step =2;
					//return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				}, msg => {

					//return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				});
			},
			countToDay(data) {
				return (data.amount / (data.months * 30)).toFixed(2);
			},
			submit() {
				if (!this.ruleform.amount) {
					return this.getError("请选择金额");
				}
				this.ruleform.lev_id = this.data.memberExpire[this.selectKey].id;
				this.postAjax("/user/auth", this.ruleform).then(msg => {
					this.formSubmitForH5(msg.data.config);
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
