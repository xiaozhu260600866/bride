<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="login_bg">
				<image class="img" src="/static/login-bg.jpg" mode="aspectFill"></image>
				<view class="bg"></view>
			</view>
			<view class="logo">
				<image class="img" src="/static/logo.png"></image>
			</view>
			<view class="write_info">
				<weui-input v-model="ruleform.username" placeholder="请输入手机号码" type="text" name="username" datatype="require|phone">
					<view slot="left" class="slot-icon">
						<view class="iconfont icon-reg-phone"></view>
					</view>
				</weui-input>
				<weui-input v-model="ruleform.password" placeholder="请输入密码" type="password" name="password" datatype="require">
					<view slot="left" class="slot-icon">
						<view class="iconfont icon-reg-passwork"></view>
					</view>
				</weui-input>
				<view class="text-right mt15 fs-14 fc-white" @click="goto('/pages/user/login/password/main',1)">忘记密码</view>
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="formSubmit" class="mt30">
					<div slot="content" class="flex-center">
						<button class="dx-btn dx-btn-big dx-btn-green w-b70 fs-17 bdr25" form-type="submit">登录</button>
					</div>
				</myform>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				showType: 1,
				ruleform: {
					password: ''
				},
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.merchantName);
				});
			},
			formSubmit() {
				this.updateUrl(["/pages/user/cart/main","/pages/index/main","/pages/user/index/main",'/pages/discount/index/index','/pages/index-phone/main']);
				this.postAjax("/user/login", this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						let userinfo = wx.getStorageSync('userInfo');
						userinfo.is_bing = 1;
						userinfo.phone = this.ruleform.username;
						wx.setStorageSync("userInfo", userinfo);
						this.$store.state.mutations.historyUrl = true;
						uni.setStorageSync('refreshUrl',"/pages/user/index/main");
						this.goto("/pages/user/index/main", 2);
						return false;
					}
				});
			}
		}
	}
</script>
<style scoped>
@import "./index.css";
</style>