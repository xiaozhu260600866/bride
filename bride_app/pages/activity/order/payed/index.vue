<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view class="pay-top" v-if="data.detail.status == 3">
				<dx-icon name="success" size="70" color="rgb(0, 153, 102)"></dx-icon>
				<view class="p">支付成功</view>
			</view>
			<view class="pay-top" v-else>
				<!-- <view class="iconfont icon-pay-no"></view> -->
				<dx-icon name="fail" size="70" color="#E84335"></dx-icon>
				<view class="p">支付失败</view>
			</view>
			<view class="m20 mt0">
				<!-- <view class="dx-btn dx-btn-lg dx-btn-orange w-b100 mr10" @click="toIndex">返回首页</view> -->
				<dx-button type="success" block size="lg" btnBg="#f79" btnBd="#f79" @click="toIndex">返回首页</dx-button>
			</view>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import dxIcon from "doxinui/components/icon/icon"
	export default {
		components:{
			dxIcon
		},
		data() {
			return {
				formAction: '/activity/order/detail',
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
			toIndex(){
				this.goto('/pages/index/main',2);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					//this.$refs.receipt.ajax(this.data.detail,false);
					//this.$refs.cert.ajax(this.data.detail,false);
				});
			}
		}
	}
</script>
