<template>
	<view>
		<view class="length-people" :class="[myclass]">
			<view class="length-people-item" v-for="(item,key) in data" @click="goto('/pages/user/card/show/index?user_id='+item.id,1)">
				<image class="cover" :src="getSiteName + '/upload/images/user/300_'+item.userInfo.pic2" mode="aspectFill"></image>
				<view class="txt">
					<view class="name nowrap">{{ item.userInfo.title}}</view>
					<view class="data"><text class="Arial">30</text>岁•<text class="Arial">186cm</text>•江门市</view>
				</view>
				<view class="bg"></view>
			</view>
		</view>	
	
	</view>
</template>

<script>
	export default {
		props:["data","myclass"],
	
		data() {
			return {
				getSiteName: this.getSiteName()
			}
		},
		methods: {
		}
	}
</script>
<style scoped="">
.length-people{padding: 10rpx;background-color: #fff;display: flex;flex-wrap: wrap;}
.length-people-item{position: relative;height: 440rpx;width: calc(50% - 20rpx);border-radius: 12rpx;overflow: hidden;margin: 10rpx;}
.length-people-item .cover{max-width: 100%;max-height: 100%;display: flex;}
.length-people-item .txt{position: absolute;bottom: 0;left: 0;width: 100%;color: #fff;padding: 12rpx 16rpx;line-height: 1;z-index: 10;}
.length-people-item .name{font-size: 32rpx;}
.length-people-item .data{font-size: 26rpx;margin-top: 16rpx;}
.length-people-item .bg{position: absolute;bottom: 0;left: 0;width: 100%;z-index: 9;height: 120rpx;background-image: linear-gradient(transparent , rgba(0,0,0,0.8));}
</style>