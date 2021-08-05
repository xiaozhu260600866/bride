<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="register">
			<weui-input v-model="ruleform.username" label="电话" type="number" name="username" datatype="require|phone"></weui-input>
			<weui-input v-model="ruleform.code" label="验证码" type="sms" name="code" action="/auth/sendSms" :phone="ruleform.username"
			 datatype="require"></weui-input>
			<weui-input v-model="ruleform.password" label="密码" type="password" name="password" datatype="require"></weui-input>
			<weui-input v-model="ruleform.password_comfirm" label="密码确认" type="password" name="password_comfirm" datatype="require"></weui-input>
			<div class="login-btn m20">
				<myform class="w-b100" :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green w-b100"></myform>
			</div>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				vaildate: {},
				ruleform: {
					role_type: 1
				},
				getSiteName: this.getSiteName(),
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
			wx.removeStorageSync('smsCode');
			//this.ajax();
		},
		methods: {
			formSubmit() {
				if (this.ruleform.code != wx.getStorageSync('smsCode')) {
					this.getError("验证码不正确");
					return false;
				}
				this.ruleform.role = 2;
				this.postAjax("/user/password", this.ruleform).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/user/login/main");
					}
				});;
			}
		}
	}
</script>
