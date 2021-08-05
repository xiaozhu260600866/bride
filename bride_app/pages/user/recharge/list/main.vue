<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="recharge-list plr15 ptb10 mb8 bg-f flex-between flex-middle" v-for="item in data.lists.data" v-if="item.type == 0&& item.status == 1 || item.type == 1">
				<div class="group">
					<p class="fs-15 lh-24" v-if="item.source">{{ item.source}}</p>
					<p class="fs-15 lh-24" v-else>{{item.type == 0 ? '充值' :'提现('+item.getStatus+')'}}</p>
					<p class="fs-12 lh-20 fc-9 Arial">{{item.created_at}}</p>
				</div>
				<div class="group">
					<p class="fs-15 lh-24 Arial">{{item.type == 0 || item.status == 2 ? '+' :'-'}}{{item.amount}}</p>
					<p class="fs-12 lh-20 fc-9" v-if="item.status_content">拒绝理由：{{ item.status_content}}</p>
				</div>
			</div>
			<hasMore :parentData="data"></hasMore>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/come-out-infos',
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
