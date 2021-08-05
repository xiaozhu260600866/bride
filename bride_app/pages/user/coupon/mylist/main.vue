<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<dx-tabs :tabs="tabs" v-model="data.query.status" @change="ajax()" selectedColor="#33c45d" sliderBgColor="#33c45d"></dx-tabs>
			<view class="coupon-list p10">
				<view class="list_item mb10 bg-f" v-for="v in data.lists.data">
					<view class="item_left fc-white" v-if="v.wechat_card_id">
						<image class="img" :src="v.getCoupon.logo_url?getSiteName + '/upload/images/wechatCard/300_'+v.getCoupon.logo_url:getSiteName+'/images/nocoupon.jpg'" mode="aspectFill"></image>
					</view>
					<view class="item_left fc-white" v-else>
						<image class="img" :src="v.getCoupon.cover?getSiteName + '/upload/images/coupon/300_'+v.getCoupon.cover:getSiteName+'/images/nocoupon.jpg'" mode="aspectFill"></image>
					</view>
					<view class="item_right">
						<view class="w-b100 flex">
							<view class="coupon-title fs-16 lh-20 wrap2 flex1">{{ v.name }}</view>
							<view class="price fs-18 lh-22 pl10" :class="data.query.status == 0?'':'fc-9'">
								<span class="fs-12">￥</span>{{v.amount}}
							</view>
						</view>
						<!-- <view class="w-b100">
							<view class="tips fc-6 fs-12" v-if="v.type == 0">满{{v.full_amount}}元可用</view>
							<view class="tips fc-6 fs-12" v-else>限指定商品可用</view>
						</view> -->
						<view class="w-b100 ir-bottom flex-between">
							<view class="time fs-12 fc-9 lh-16">{{ v.created_at }} ~ {{ v.end_at }}</view>
						<!-- 	<view class="state fs-13 ptb3" @click="draw(v)" v-if="v.status==0">立即领取</view> -->
							<view class="state gouser fs-13 ptb3" @click="goto('/pages/index/main',2)" v-if="data.query.status == 0">去使用</view>
							<!-- <view class="state yesuser fs-13 ptb3" v-if="v.status == 2">已使用</view> -->
						</view>
					</view>
					<view class="completed" v-if="data.query.status == 1">
						<image class="img" :src="getSiteName+'/images/wap/used-state.png'" />
					</view>
					<view class="completed" v-if="data.query.status == 2">
						<image class="img" :src="getSiteName+'/images/wap/date-state.png'" />
					</view>
				</view>
				<hasMore :parentData="data" source="nodata" message="暂无优惠券"></hasMore>
			</view>
			
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxTabs},
		data() {
			return {
				formAction: '/shop/user/coupon?scanQrcode=0',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 0,
				tabs: [
					{value:0,name: "待使用"},
					{value:1,name: "已使用"},
					{value:2,name: "已过期"},
				],
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
