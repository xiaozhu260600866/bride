<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<activity :data="data.lists.data"></activity>
		</view>
	</view>
</template>

<script>
	import activity from "@/components/activity.vue";
	export default {
		components:{activity,},
		data() {
			return {
				formAction: '/activity/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				activityLists:[
					{
						title:'"爱在新时代"联谊交友系列活动',
						amount:69.00,
						orderRecord:{
							people: 0
						},
						firstCover:'/static/fenxiaobg.jpg',
						published_at:'2021-05-06 00:00:00',
						address:'江门蓬江区'
					}
				]
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
			return this.shareSource(this, '商城');
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
<style>
@import "./index.css";
</style>