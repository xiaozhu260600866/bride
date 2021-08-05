<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="content">
				<div class="plr15" v-if="data.detail.fclass != 76">
					<p class="fs-18 mt10 mb5 lh-24">{{ data.detail.title }}</p>
					<p class="fs-13 fc-9">{{ data.detail.getTime }} </p>
				</div>
				<div class="brief p15 fs-14 fc-6">
					<u-parse :content="data.detail.content" />
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse,
		},
		data() {
			return {
				formAction: '/newShow.html',
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
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					 this.setTitle(msg.detail.title);
				});
			}
		}
	}
</script>
