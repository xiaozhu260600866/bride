<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<orderInfo :data="lists"></orderInfo>
		</view>
	</view>
</template>

<script>
	import orderInfo from "@/components/orderInfo"
	export default {
		components: {orderInfo },
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:[
					{
						created_at: '2021-07-10 15:33:06',
						order_no:202107101533060,
						status_message:'报名成功',
						getActivity:{
							firstCover: '/static/fenxiaobg.jpg',
							title:'爱在新时代"联谊交友系列活动',
							published_at: '2021-07-31',
							address:'广东江门'
						},
						amount: 60.00,
						type: 1,
					},
				]
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