<template>
	<view class="activity-list">
		<view class="activity-item" v-for="(v,key) in data" :key="key">
			<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" @callBack="toShow(v)">
				<view slot="content">
					<view class="item-row">
						<view class="row-left">
							<view class="item title">{{ v.title }}</view>
							<view class="item cost">
								<view v-if="v.FlashState == true">
									<view>人均消费：
										<text class="price" v-if="v.price > 0">{{ v.price }}元</text>
										<text v-else>免费</text>
										<text class="pl8 num">已报{{v.orderRecord.people}}人</text>
									</view>
									<view>{{ v.Flash.payManner }}</view>
								</view>
								<view v-else>
									<text class="price" v-if="v.amount > 0">{{ v.amount }}元</text>
									<text v-else>免费</text>
									<text class="pl8 num">已报{{v.orderRecord.people}}人</text>
								</view>
							</view>
						</view>
						<view class="item-pic">
							<image class="img" :src="v.firstCover" mode="aspectFill"></image>
							<view>
								<view class="state state0" v-if="v.state == 0">已成行</view>
								<view class="state state1" v-if="v.state == 1">报名中</view>
								<view class="state state2" v-if="v.state == 2">已截止</view>
								<view class="state state2" v-if="v.state == 3">已满员</view>
								<view class="tag" v-if="v.fname">{{v.fname}}</view>
							</view>
							<view class="bg"></view>
						</view>
					</view>
					
					<view class="item info">
						<view class="time">活动时间：{{v.published_at}}</view>
						<view class="address">活动地址：{{ v.address }}</view>
					</view>
				</view>
			</myform>
		</view>
	</view>
</template>
<script>
export default {
	props: ['data'],
	data() {
		return {
			ruleform:{},
			vaildate:{}
		}
	},
	methods: {
		toShow(v){
			return this.goto('/pages/activity/show/index?id='+v.id,1);
		}
	}
}

</script>
<style>
.activity-item{background-color: #fff;padding: 20rpx 30rpx;margin: 24rpx;border-radius: 12rpx;}
.activity-item .item-row{display: flex;line-height: 1.5;}
.activity-item .item-pic{position: relative;overflow: hidden;}
.activity-item .item-pic .img{width: 240rpx;height: 160rpx;display: flex;border-radius: 12rpx;}
.activity-item .item-pic .state{position: absolute;top: 10rpx;right: 10rpx;height: 40rpx;line-height: 40rpx;padding: 0 16rpx;border-radius: 20rpx;color: #fff;font-size: 24rpx;z-index: 2;}
.activity-item .item-pic .state0{background: linear-gradient(to right, #fc9665 , #fcc453);z-index: 2;}
.activity-item .item-pic .state1{background: linear-gradient(to right, #25d5d3 , #36d3a0);z-index: 2;}
.activity-item .item-pic .state2{background: linear-gradient(to right, #C7C7C7 , #C7C7C7);z-index: 2;}
.activity-item .item-pic .tag{position: absolute;top: 20rpx;line-height: 60rpx;font-size: 26rpx;color: #fff;right: 30rpx;padding-left: 20rpx;z-index: 2;}
.activity-item .item-pic .tag::before{content: '';display: block;position: absolute;top: 50%;left: 0;background-color: #fff;width: 8rpx;height: 8rpx;margin-top: -4rpx;z-index: 2;}
.activity-item .item-pic .info{position: absolute;bottom: 20rpx;width: 100%;padding: 0 30rpx;z-index: 2;}
.activity-item .item-pic .title{color: #fff;font-size: 32rpx;line-height: 46rpx;}
.activity-item .item-pic .count{color: #fff;font-size: 24rpx;}
.activity-item .item-pic .count span,.activity-item .item-pic .count ._span{font-family: Arial;}
.activity-item .row-left{padding-right: 30rpx;flex: 1;display: flex;align-content: space-between;flex-wrap: wrap;flex: 1;padding-right: 30rpx;min-height: 160rpx;}
.activity-item .row-left .item{width: 100%;}
.activity-item .row-left .title{font-size: 34rpx;color: #333;}
.activity-item .row-left .cost{font-size: 34rpx;color: #333;margin-top: 24rpx;line-height: 1.4;}
.activity-item .row-left .cost .num{font-size: 26rpx;color: #333;}
.activity-item .info{font-size: 26rpx;color: #333;margin-top: 16rpx;line-height: 1.5;}
</style>