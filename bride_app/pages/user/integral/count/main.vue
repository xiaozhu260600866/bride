<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="count-header main-bg mb8 fc-white">
				<p class="name fs-18">我的积分</p>
				<p class="count-num Arial">{{data.integral?data.integral : 0}}</p>
				<div @click="goto('/pages/user/integral/list/main',1)" class="record fs-14">明细</div>
			</div>
			<div class="list-group bg-f">
				<div @click="goto('/pages/integral/lists/main',1)" class="list-group-item">
					<image class="img" src="https://boss.doxinsoft.com/images/app/exchange.png" />
					<p class="name">积分商城</p>
					<p class="icon iconfont icon-right2"></p>
				</div>
				<div @click="goto('/pages/user/integral/order/lists/main?status=3&historyUrl=del',1)" class="list-group-item">
					<image class="img" src="https://boss.doxinsoft.com/images/app/orderlist.png" />
					<p class="name">我的订单</p>
					<p class="icon iconfont icon-right2"></p>
				</div>
			</div>

		</div>
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
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
