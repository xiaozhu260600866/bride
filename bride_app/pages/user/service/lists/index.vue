<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs :tabs="tabs" v-model="data.query.status" selectedColor="#387ef8" :selectedSize="32" :size="32" :height="100" sliderBgColor="#387ef8" @change="listsShow = false;ajax()"> </dx-tabs>
			<!-- <demand-lists edit :data="data.lists.data"></demand-lists> -->
			<!-- 用以下列表 -->
			<productLists :data="data" :type="2" edit></productLists>
			<dxftButton size="lg" type="primary" @click="goto('/pages/user/service/create_edit/index',1)">发布企业服务</dxftButton>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	import demandLists from "@/components/demandLists";
	import productLists from "@/components/productLists";
	import dxftButton from "doxinui/components/button/footer-button"
	import dxTabs from "doxinui/components/tabs/tabs"
	import "./index.css";
	export default {
		components: {demandLists,dxftButton,dxTabs,productLists},
		data() {
			return {
				formAction: '/shop/product/class?showType=my',
				mpType: 'page', //用来分清父和子组件
				listsShow:false,
				// data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabs: [
						{value: 0,name: "审核中"},
					{value: 1,name: "展示中"},
				
					{value: 2,name: "已拒绝"}
				],
				data:{
					lists:{
						data:[
							{
								firstCover:'https://select.doxinsoft.com/upload/images/product/300_ASszmPGA3j.jpg',
								name:'沙发 北欧小户型公寓酒店式可拆',
								takeMerchant:{
									userInfo:{
										company_name:''
									}
								},
								price:'899.00',
								self_num_: 2,
							}
						]
					}
				}
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
		components: {  },
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
