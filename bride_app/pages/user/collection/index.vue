<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<!-- <dx-tabs-scroll :tabs="[
				{value: 0,name: '今日特拼'},
				{value: 1,name: '全部'},
				{value: 2,name: '新品'},
				{value: 3,name: '品牌'},
			]" curColor="#13cc0c" borderColor="#13cc0c"></dx-tabs-scroll> -->
			<demandLists :data="data.lists.data" @thumb="thumb3"></demandLists>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	import demandLists from "@/components/demandLists";
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import "./index.css";
	export default {
		components: {demandLists,dxTabsScroll},
		data() {
			return {
				formAction: '/articleOrder/collectionLists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(this.data.query.category);
				});
			},
			thumb3(key){
				let item = this.data.lists.data[key];
				
				this.postAjax("/articleOrder/thumb",{articleOrder_id:item.id},"notloading").then(msg=>{
					 if(msg.data.status == 2){
						 //this.getParent()
						 //this.$set(item,"thumb",!item.thumb);
						 item.thumb = !item.thumb;
						 if(item.thumb){
							 item.thumbCount ++;
						 }else{
							  item.thumbCount --;
						 }
					 }
				});
			},
		},
		onLoad(options) {
			this.ajax();
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
		
	}
</script>
