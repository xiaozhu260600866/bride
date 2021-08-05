<template>
	<view class="cash-list p10">
		<view class="list_item" :class="[v.status > 0?'used':'']" v-for="v in data" v-if="type == 1">
			<!-- <view class="item_left" @click="goto('/pages/user/coupon/cash/show/main?id='+v.id,1)">
				<view class="price fs-30 h-40 lh-40 fc-white w-b100"><span class="fs-14">￥</span>{{v.amount}}</view>
				<view class="condition fs-12 w-b100">满<text class="Arial">{{v.full_amount}}</text>元</view>
			</view> -->
			<view class="item_img" @click="goto('/pages/user/coupon/cash/show/main?id='+v.id,1)">
				<image class="img" :src="getSiteName+'/upload/images/wechatCard/'+v.getCoupon.logo_url" mode="aspectFill"></image>
			</view>
			<view class="item_right" @click="goto('/pages/user/coupon/cash/show/main?id='+v.id,1)">
				<view class="w-b100 coupon-title fs-16 lh-20 wrap2">{{ v.name }}</view>
				<view class="w-b100 ir-bottom fc-6 fs-12 lh-20 mt5">
					<view class="tips">{{v.getCoupon.abstract}}</view>
					<view class="tips" v-if="v.merchant_names">使用商家：{{v.merchant_names}}</view>
					<view class="time Arial">{{ v.start_at }}-{{ v.end_at }}</view>
				</view>
			</view>
			<view class="status">
				<!-- <view class="nav yes" v-if="v.status == 0 && !v.userCardCode" @click="wechatCard(v)" >放进卡包</view> -->
				<view class="nav yes" v-if="v.status == 0 && v.userCardCode"  @click="goto('/pages/user/coupon/cash/show/main?id='+v.id,1)" >去使用</view>
				<!-- <view class="nav no" v-if="v.status == 1">已使用</view>
				<view class="nav no" v-if="v.status == 2">已过期</view> -->
			</view>
			<view class="status-icon">
				<image class="img" :src="getSiteName+'/images/wap/used-state.png'" v-if="v.status == 1"></image>
				<image class="img" :src="getSiteName+'/images/wap/date-state.png'" v-if="v.status == 2"></image>
			</view>
		</view>
		<block v-if="type == 2">
			<view class="list_item bg-f9" v-for="v in data">
				<view class="item_img">
					<image class="img" :src="getSiteName+'/upload/images/wechatCard/'+v.cover" mode="aspectFill"></image>
				</view>
				<view class="item_right">
					<view class="w-b100 coupon-title fs-16 lh-20 wrap2">{{ v.name }}</view>
					<view class="w-b100 ir-bottom fc-6 fs-12 lh-20 mt5">
						<view class="tips">{{v.content}}</view>
						<view class="full">满<text class="Arial">{{v.full_amount}}</text>元</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: ["data","type"],
		data() {
			return {
				getSiteName: this.getSiteName(),
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.cash-list .list_item{display: flex;position: relative;border-radius: 12rpx;overflow: hidden;background-color: #fff;margin-bottom: 24rpx;color: #333;}
.cash-list .list_item:last-child{margin-bottom: 0;}
.cash-list .item_left{width: 180rpx;padding: 20rpx 0;display: flex;align-items: center;justify-content: center;flex-wrap: wrap;text-align: center;background-color: #33c45d;position: relative;background-image: linear-gradient(to bottom right, #57C734 , #33c45d);}
.cash-list .item_img .img{width: 220rpx;height: 100%;display: flex;}
.cash-list .item_left::before{content: '';display: block;border-left: dotted #fff 14rpx;position: absolute;top: -8rpx;bottom: -8rpx;left: -8rpx;}
.cash-list .item_right{display: flex;flex-wrap: wrap;align-content: space-between;position: relative;z-index: 2;padding: 20rpx 10rpx 20rpx 20rpx;flex: 1;z-index: 2;}
.cash-list .ir-bottom{align-items: center;line-height: 1.6;}
.cash-list .ir-bottom .time{font-family: Calibri;}
.cash-list .status{position: relative;display: flex;align-items: center;z-index: 2;}
.cash-list .status .nav{font-size: 24rpx;color: #33C45D;border: 1rpx #33C45D solid;border-radius: 64rpx;width: 128rpx;height: 56rpx;line-height: 56rpx;text-align: center;margin-right: 20rpx;}
.cash-list .status .nav.no{color: #999;border-color: #ddd;background-color: #f5f5f5;}
.cash-list .status-icon{position: absolute;top: 0;right: 0;z-index: 1;}
.cash-list .status-icon .img{width: 180rpx;height: 180rpx;}
/* .cash-list .used{background: #ccc;}
.cash-list .used .status{background-color: #aaa;} */
/* .cash-list .status .yes{background-color: #57C734;}
.cash-list .status .no{background-color: #ccc;} */


</style>