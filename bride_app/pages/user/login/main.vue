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
				<view class="text-right mt15 fs-14 fc-white" @click="goto('/pages/user/password/main',1)">忘记密码</view>
				<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="formSubmit" class="mt30">
					<div slot="content" class="flex-center">
						<button class="dx-btn dx-btn-big dx-btn-green w-b70 fs-17 bdr25" form-type="submit">登录</button>
					</div>
				</myform>
			</view>
		</view>
		<!-- <div>
			<div class="logo ptb20">
				<img style="width: 90px;height: 90px;display: flex" :src="getSiteName+'/images/456LOGO-02.jpg'">
			</div>
			<div class="login-list m15">
				<div class="login01" v-if="showType == 0">
					<weui-input v-model="ruleform.username" label="电话" placeholder="请输入手机号码" type="text" name="username" datatype="require|phone"></weui-input>
					<weui-input v-model="ruleform.password" label="密码" type="password" name="password" datatype="require"></weui-input>
					<div class="login-btn mt20">
						<myform :ruleform="ruleform" :vaildate="vaildate" :append="false" @callBack="formSubmit">
							<div slot="content">
								<button class="dx-btn dx-btn-big dx-btn-green w-b100 fs-17" form-type="submit">登录</button>
							</div>
						</myform>
						<div class="flex">
							<button class="dx-btn dx-btn-big dx-btn-green-o w-b100 mt10 fs-17 ml5" @click="goto('/pages/business/register/main',1)">商家注册</button>
						</div>
					</div>
					<p class="forget fs-15 fc-9 text-center pt15" @click="goto('/pages/user/password/main',1)">忘记密码</p>
				</div>
				<div class="login02" v-if="showType == 1">
					<weui-input v-model="ruleform.username" label="帐号" placeholder="请输入帐号" type="text" name="username" datatype="require|phone"></weui-input>
					<weui-input v-model="ruleform.password" label="密码" type="password" name="password" datatype="require"></weui-input>
					<div class="login-btn mt20">
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green bdr4 w-b100 fs-17"
						 title="登录"></myform>

						<button class="dx-btn dx-btn-big dx-btn-green-o w-b100 mt10 fs-17" @click="goto('/pages/business/register/main')">注册</button>
						<p class="forget fs-15 fc-9 text-center pt15" @click="goto('/pages/user/password/main',1)">忘记密码</p>
					</div>
				</div>
			</div>
		</div> -->
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