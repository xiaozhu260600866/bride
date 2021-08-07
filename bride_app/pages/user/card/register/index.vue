<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
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
					<checkbox-group @change="checkboxChange"><checkbox :value="1"/></checkbox-group>
					<view>我已阅读并同意</view>
					<view class="main-color" @click="goto('/pages/news/show?id=254',1)">《新良缘用户协议》</view>
				</view>
				<dx-button type="primary" size="lg" round myclass="plr80 mt20" @click="step = 2">下一步</dx-button>
			</view>
			<view class="second-step" v-if="step == 2">
				<view class="text-center">
					<view class="fs-19 pt25">您的基本资料</view>
					<view class="fs-14 fc-7 pt5">填写基本资料才能匹配到更精准的用户哦</view>
				</view>
				<view class="mt25 plr20">
					<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
					<weui-input v-model="ruleform.phone" label="手机" type="text" name="phone" datatype="require"></weui-input>
					<dx-address v-model="ruleform.addr_address" labeltxt="工作生活在" addressHidden></dx-address>
					<weui-input v-model="ruleform.marital" label="婚姻状况" placeholder="请选择" name="marital" changeField="value" type="select" dataKey="maritalArr"></weui-input>
				</view>
				<view class="m20 text-center" @click="submit">
					<dx-button type="primary" size="lg" round myclass="plr80">提交</dx-button>
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
					phone:'13380951183'
				},
				step: 2,
				maritalArr:[
					{label: '未婚',value: 1},
					{label: '已婚',value: 2},
					{label: '离异',value: 3},
				]
			}
		},
		mounted() {
		
		},
		methods: {
			getPhoneNumber(e) {
				this.getAuthPhoneNumber(e,msg=>{
					 this.ruleform.phone = msg.data.phoneNumber;
				},()=>{
					
				});
			},
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							 uni.setStorageSync('openCardDiag',1);
							this.goto("/pages/user/card/verified/index",1);
						});
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
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