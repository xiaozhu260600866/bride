<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="integral-list plr15 ptb10 mb8 bg-f" v-for="(item,key) in data.lists.data">
			<div class="item">
				<div class="group">
					<p class="fs-15">{{item.source}}</p>
					<p class="Arial fs-12 fc-9">{{item.created_at}}</p>
				</div>
				<p class="Arial fc-orange fs-18">{{item.type == 0 ? '+' :'-'}}{{item.integral}}</p>
			</div>
		</div>
		<hasMore :parentData="data"></hasMore>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/integral-lists',
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
