<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<cardTemplate :type="ruleform.card_style_type" :ruleform="data.user"></cardTemplate>
			<view class="modeSelect p5 bg-f mb10">
				<scroll-view scroll-x>
					<view :class="['modePic',ruleform.card_style_type==1?'cur':'']" @click="ruleform.card_style_type=1">
						<image class="img" src="https://card.doxinsoft.com/images/wap/cardMode-06.jpg" mode="widthFix"></image>
					</view>
					<view :class="['modePic',ruleform.card_style_type==2?'cur':'']" @click="ruleform.card_style_type=2">
						<image class="img" src="https://card.doxinsoft.com/images/wap/cardMode-02.jpg" mode="widthFix"></image>
					</view>
					<view :class="['modePic',ruleform.card_style_type==3?'cur':'']" @click="ruleform.card_style_type=3">
						<image class="img" src="https://card.doxinsoft.com/images/wap/cardMode-01.jpg" mode="widthFix"></image>
					</view>
				</scroll-view>
			</view>
			<dxftButton type="primary" round @click="submit">提交</dxftButton>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '@/components/cardTemplate'
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{cardTemplate,dxftButton},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					card_style_type:1,
				}
			}
		},
		mounted() {
		
		},
		methods: {
			submit(){
				this.postAjax("/user/info",this.ruleform).then(msg=>{
					this.back();
				});
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
<style scoped="">
@import "./index.css";
</style>