<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<block v-if="step == 0">
				<view class="login_bg">
					<image class="img" src="/static/login-bg.jpg" mode="aspectFill"></image>
					<view class="bg"></view>
				</view>
				<view class="zero-step">
					<view class="logo">
						<image class="img" src="/static/logo.png"></image>
					</view>
					<view class="write_info">
						<weui-input v-model="ruleform.phone" placeholder="请输入手机号码" type="number" name="phone" datatype="require">
							<view slot="left" class="slot-icon">
								<view class="iconfont icon-reg-phone"></view>
							</view>
						</weui-input>
						<weui-input v-model="ruleform.password" placeholder="设置6~12位密码" type="password" name="password" datatype="require">
							<view slot="left" class="slot-icon">
								<view class="iconfont icon-reg-passwork"></view>
							</view>
						</weui-input>
						<weui-input v-model="ruleform.code" placeholder="验证码" type="sms" name="code" myclass="code" action="/auth/sendSms"
						 :phone="ruleform.phone">
						 <view slot="left" class="slot-icon">
							<view class="iconfont icon-reg-msg"></view>
						 </view></weui-input>
						<weui-input v-model="ruleform.invitation" placeholder="邀请码" type="text" name="invitation" >
							<view slot="left" class="slot-icon">
								<view class="iconfont icon-reg-code"></view>
							</view>
						</weui-input>
						<view class="text-right mt15 fs-14 fc-white" @click="goto('/pages/user/card/register/poster',1)">返回登录</view>
						<view class="nav flex-center">
							<dx-button type="primary" size="lg" round myclass="plr80 mtb20" @click="toStep">立即注册</dx-button>
						</view>
					</view>
				</view>
			</block>
			<view class="first-step text-center" v-if="step == 1">
				<view class="fs-19 pt25">您的性别是？</view>
				<view class="fs-14 fc-7 pt5">选择性别后将无法修改</view>
				<view class="sex-sec">
					<view :class="['man pic',ruleform.sex == 1 ? 'act' :'']" @click="ruleform.sex =1">
						<image class="img" :src="ruleform.sex == 1?'/static/man2.png':'/static/man1.png'"></image>
						<view class="txt">男</view>
					</view>
					<view :class="['women pic',ruleform.sex == 2 ? 'act' :'']"  @click="ruleform.sex =2">
						<image class="img" :src="ruleform.sex == 2?'/static/women2.png':'/static/women1.png'"></image>
						<view class="txt">女</view>
					</view>
				</view>
				<view class="agreement flex-middle flex-center fs-13 fc-6">
					<checkbox-group @change="agree"><checkbox value="cb"/></checkbox-group>
					<view>我已阅读并同意</view>
					<view class="main-color" @click="goto('/pages/news/show?id=254',1)">《新良缘用户协议》</view>
				</view>
				<view class="reg-nav"><dx-button type="primary" size="lg" round myclass="plr80 mtb20" @click="submit()">下一步</dx-button></view>
			</view>
			<view class="second-step" v-if="step == 2">
				<view class="text-center">
					<view class="fs-19 pt25">您的基本资料</view>
					<view class="fs-14 fc-7 pt5">填写基本资料才能匹配到更精准的用户哦</view>
				</view>
				<view class="mt25 plr20">
					<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
					
					<dx-address v-model="ruleform.address" labeltxt="工作生活在" addressHidden></dx-address>
					<weui-input v-model="ruleform.married" label="婚姻状况" placeholder="请选择" name="married"  datatype="require" changeField="value" type="select" dataKey="maritalArr"></weui-input>
				</view>
				<view class="m20 text-center" @click="submit">
					<view class="reg-nav"><dx-button type="primary" size="lg" round myclass="plr80">提交</dx-button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '@/components/cardTemplate'
	export default {
		components:{cardTemplate},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					phone:'13380951183',
					agree:0
				},
				vaildate:{},
				step: 0,
				maritalArr:[
					{label: '未婚',value: '未婚'},
					{label: '离异',value: '离异'},
					{label: '丧偶',value: '丧偶'},
					{label: '已婚（申请做红娘）',value: '已婚（申请做红娘）'},
				]
			}
		},
		mounted() {
		
		},
		methods: {
			toStep(){
				
				if (this.ruleform.code != wx.getStorageSync('smsCode')) {
					this.getError("验证码不正确");
					return false;
				}
				this.step = 1
			},
			agree(event){
				
				if(event.target.value.length){
					console.log("a")
					this.ruleform.agree = 1;	
				}else{
					console.log("b")
						this.ruleform.agree = 0;	
				}
			},
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e,msg=>{
					 this.ruleform.phone = msg.data.phoneNumber;
				},()=>{
					
				});
			},
			submit(){
				if(this.step == 1){
					if (!this.ruleform.sex) {
						this.getError("请选择您的性别");
						return false;
					}
					if(!this.ruleform.agree){
						return this.getError("请同意协议");	
					}
					this.step =2;
				}else{
					this.vaildForm(this, res => {
						if(res){
							this.postAjax("/user/info",this.ruleform).then(msg=>{
								if(msg.data.status ==2){
									uni.setStorageSync('openCardDiag',1);
									this.goto("/pages/user/card/verified/index",1);
								}
								
							});
						}
					})
				}
				
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.sex = 0;
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): [],
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): []
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