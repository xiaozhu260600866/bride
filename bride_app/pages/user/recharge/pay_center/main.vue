<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<section v-if="data.show">
			<view id="pay_price">￥{{detail.amount}}</view>
			<view id="pay_info">
				<view class="list-group bd-b">
					<view class="txt_l float_l">订单号</view>
					<view class="txt_r float_r">{{detail.order_no}}</view>
					<view class="clear"></view>
				</view>
				<view class="list-group bd-b">
					<view class="txt_l float_l">收款号</view>
					<view class="txt_r float_r">{{siteConfig.web_name}}</view>
					<view class="clear"></view>
				</view>
				<view class="list-group bd-b">
					<view class="txt_l float_l">支付项目</view>
					<view class="txt_r float_r">{{siteConfig.web_name}}订单支付</view>
					<view class="clear"></view>
				</view>
			</view>
			<form @submit="data.source == 'wap' ? formSubmitForH5():formSubmitForApp($event)" bindreset="formReset" report-submit="true">
				<button id="pay_submit" formType="submit">立即支付</button>
			</form>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/recharge',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				order_no: 0,
				detail: {},
				siteConfig: {},
				returnUrl:'',
				config: {}
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			formSubmitForH5(e){
				this.payUniapp(this.config,msg=>{
					this.$store.state.mutations.historyUrl=true;
					this.back();
				});
			},
			formSubmitForApp(e) {
				//调起微信支付
				let formId = e.mp.detail.formId;
				this.formId(formId).then(msg => {
					this.payUniapp(this.config,msg=>{
						this.$store.state.mutations.historyUrl=true;
						this.back();
					});
				});
			},
			
			ajax() {
				this.getAjax(this).then(msg => {
					this.detail = msg.detail;
					this.siteConfig = msg.siteConfig;
					this.config = msg.config;
					this.returnUrl = '/pages/user/recharge/count/main';
				});
			}
		}
	}
</script>
