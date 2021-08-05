<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="count-header main-bg mb8">
				<p class="name fs-18 fc-white">我的钱包（元）</p>
				<p class="count-num Arial">{{data.amount}}</p>
				<view @click="goto('/pages/user/recharge/list/main',1)" class="record fs-14 fc-white">明细</view>
			</div>
			<div class="list-group bg-f">
				<!-- <view @click="goto('/pages/user/recharge/recharge/main?type=0',1)" class="list-group-item">
					<img class="img" :src="getSiteName+'/images/app/recharge.png'" />
					<p class="name">微信充值</p>
					<p class="icon iconfont icon-right"></p>
				</view>
				<view @click="goto('/pages/user/recharge/recharge/main?type=1',1)" class="list-group-item">
					<img class="img" :src="getSiteName+'/images/app/ypay.png'" />
					<p class="name">翼支付充值</p>
					<p class="icon iconfont icon-right"></p>
				</view> 
				<view @click="goto('/pages/user/recharge/domoney/main',1)" class="list-group-item">
					<img class="img" :src="getSiteName+'/images/app/purse.png'" />
					<p class="name">提现</p>
					<p class="icon iconfont icon-right"></p>
				</view>-->
			</div>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onShow(){
	        if(this.$store && this.$store.state && this.$store.state.mutations.historyUrl){
	            this.$store.state.mutations.historyUrl="";
	            this.ajax(); 
	        }
    	},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
