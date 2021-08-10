<template>
	<view class="orderInfo" :class="myclass">
		<view class="Info_box" v-for="(item,index) in data" :key="index">
			<view class="box_top fs-13">
				<view class="time fs-13 fc-6">
					<view class="lh-18">报名时间：<text class="Arial fc-3">{{ item.created_at }}</text></view>
					<view class="lh-18" v-if="item.type == 1">订单编号：<text class="Arial fc-3">{{ item.order_no }}</text></view>
				</view>
				<view class="status fc-red">{{ item.status_message }}</view>
			</view>
			<view v-if="item.type == 1">
				<view class="box_info">
					<view class="act_img">
						<image class="img" :src="item.getActivity.firstCover" mode="aspectFill" />
					</view>
					<view class="act_info flex1">
						<view class="name fs-16 wrap2">{{item.getActivity.title}}</view>
					</view>
				</view>
				<view class="box_count fs-14">活动费用 ￥<text class="price fs-15">{{ item.amount }}</text></view>
			</view>
			<view class="box_info order_people" v-else>
				<view class="act_img">
					<image class="img head" :src="item.getPeople.cover" mode="aspectFill" />
				</view>
				<view class="act_info flex1">
					<view class="name fs-16 wrap2">{{item.getPeople.name}}</view>
					<view class="num fs-14">微信号：{{item.getPeople.wechat}}</view>
					<view class="tag-row">
						<text class="tag">{{ item.getPeople.year }}年</text>
						<text class="tag">{{ item.getPeople.height }}cm</text>
						<text class="tag">{{ item.getPeople.education }}</text>
					</view>
				</view>
			</view>
			<view class="box-txt">
				<view>活动时间：<text>{{ item.getActivity.published_at }}</text></view>
				<view>活动地点：{{ item.getActivity.address }}</view>
			</view>
			<!-- <view class="box_nav" v-if="item.type == 1">
				<view class="nav_group flex1">
					<view class="btn-nav" >完成</view>
				</view>
			</view> -->
		</view>	
	</view>
</template>
<script type="text/javascript">
export default {
	props: ['data','myclass'],
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}

</script>
<style>
.Info_box{background-color: #fff;margin: 24rpx;border-radius: 12rpx;}
.Info_box .box_top{height: 100rpx;line-height: 100rpx;padding: 0 30rpx;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px #eee solid;}
.Info_box .box_info{display: flex;justify-content: space-between;padding: 24rpx 30rpx}
.Info_box .box_info.order_people{}
.Info_box .box_info .img{width: 160rpx;height: 160rpx;display: flex;margin-right: 30rpx;}
.Info_box .box_info .head{width: 120rpx;height: 120rpx;border-radius: 50%;}
.Info_box .box_count{padding: 0 30rpx;height: 80rpx;line-height: 80rpx;text-align: right;}
.Info_box .box_nav{display: flex;justify-content: space-between;align-items: center;padding: 20rpx 30rpx;border-top: 1px #eee solid;}
.Info_box .box_nav .nav_group{display: flex;justify-content: flex-end;align-items: center;}
.Info_box .box_nav .btn-nav{min-width: 160px;height: 60rpx;line-height: 58rpx;border: 1rpx #ddd solid;border-radius: 30rpx;color: #555;font-size: 26rpx;text-align: center;margin-left: 20rpx;display: block;}
.Info_box .box_nav .btn-nav:last-child{background: #FE4543;border: 0;color: #fff;line-height: 60rpx;}
.Info_box .box_nav .obtn{border: 1rpx #ddd solid!important;background: #fff!important;color: #555!important;}
.Info_box .tag-row{display: flex;align-items: center;margin-top: 10rpx;}
.Info_box .tag-row .tag{display: inline-block;height: 44rpx;line-height: 44rpx;padding: 0 20rpx;background-color: #FFF4F4;color: #FF769B;font-size: 24rpx;margin-right: 10rpx;border-radius: 6rpx;}

.Info_box .box-txt{border-top: 1rpx #eee solid;padding: 16rpx 30rpx;font-size: 30rpx;}
.Info_box .box-txt>view{line-height: 40rpx;padding: 6rpx 0;}
</style>