<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="[
				{value: 4,name: '展示中'},
				{value: 3,name: '审核中'},
			]" selectedColor="#ed5296" :selectedSize="32" :size="32" bold :height="100" sliderBgColor="#ed5296" @change="listsShow = false;ajax()" v-model="data.query.status"></dx-tabs>
			<!-- <demand-lists edit :data="data.lists.data"></demand-lists> -->
			<view class="mt12">
				<trendsLists :data="data.lists.data" :type="2" edit></trendsLists>
			</view>
			<dxftButton size="lg" type="primary" @click="goto('/pages/user/demand/create_edit/index',1)">发布动态</dxftButton>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	import demandLists from "@/components/demandLists";
	import dxftButton from "doxinui/components/button/footer-button"
	import dxTabs from "doxinui/components/tabs/tabs"
	import trendsLists from "@/components/trendsLists"
	import "./index.css";
	export default {
		components: {demandLists,dxftButton,dxTabs,trendsLists},
		data() {
			return {
				formAction: '/articleOrder/lists',
				mpType: 'page', //用来分清父和子组件
				listsShow:false,
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
					{value: 4,name: "展示中"},
					{value: 3,name: "审核中"},
					{value: 5,name: "已拒绝"}
				],
			}
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.listsShow = true;
				});
			}
		},
		onShow() {
			this.ajax();
		},
		onLoad(options) {
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
