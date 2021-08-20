<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="login_bg">
				<image class="img" src="/static/login-bg.jpg" mode="aspectFill"></image>
				<view class="bg"></view>
			</view>
			<view class="login_box">
				<view class="logo">
					<image class="img" src="/static/logo.png"></image>
				</view>
				<view class="select_type">
					<view class="type" @click="goto('/pages/user/login/main',1)">登录</view>
					<view class="type o" @click="goto('/pages/user/card/register/index',1)">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: { },
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				
			}
		},
		mounted() {
		
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			},
			
		},
		onLoad(options) {
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import "./index.css";
</style>