<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view class="payed-content" v-if="data.detail.status == 3">
				<view class="con">
					<view class="row iconfont icon-pay-yes"></view>
					<view class="p content">发布成功，信息审核中！</view>
				</view>
			</view>
			<view class="payed-content" v-else>
				<view class="con">
				<view class="row iconfont icon-pay-no"></view>
				<view class="p content ">发布失败</view>
				</view>
			</view>
			<view class="button">
				<view @click="goto('/pages/index/main',2)"><dx-button type="success" size="lg" block>返回</dx-button></view>
			</view>
		</div>
	</view>
</template>
<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/articleOrder/edit',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onLoad() {
			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					//this.$refs.receipt.ajax(this.data.detail,false);
					//this.$refs.cert.ajax(this.data.detail,false);
				});
			}
		}
	}
</script>
