<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="block-sec edit-write">
				<weui-input v-model="ruleform.remark" label="个人独白" type="textarea" name="remark"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				type:'',
				vaildate:{}
			}
		},
		mounted() {
		
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							this.back();
						});
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): []
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): []
				});
			},
			
		},
		onLoad(options) {
			this.type = options.type;
			this.setTitle('个人独白');
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="" lang="scss">
.edit-write ::v-deep .dx-cell{
	flex-wrap: wrap;
	.dx-cell_hd{width: 100%;margin-bottom: 20rpx;}
	.dx-cell_bd{
		width: 100%;
		.dx-text{border: 1rpx #eee solid;padding: 20rpx;border-radius: 8rpx;min-height: 500rpx;height: 500rpx;}
		.upload-img{
			.uploadvalue{width: 180rpx;height: 180rpx;}
			.il-item .img{width: 180rpx;height: 180rpx;}
		}
	}
}
</style>