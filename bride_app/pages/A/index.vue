<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			33555
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