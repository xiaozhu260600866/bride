<template>
	<view>
		<view class="length-people" :class="[myclass,crosswise?'row-people':'']">
			<view class="length-people-item" v-for="(item,key) in data" @click="goto('/pages/people/show/index?id='+item.id,1)">
				<view class="cover"><image class="img" :src="item.headerPic" mode="aspectFill"></image></view>
				<view class="txt">
					<view class="name" :class="[crosswise?'wrap2':'nowrap']">{{ item.userInfo.title}}</view>
					<view class="data">
						<view class="lab"><text class="Arial">{{item.userInfo.age}}</text>岁</view>
						<view class="lab"><text class="Arial">{{item.userInfo.height}}</text></view>
						<view class="lab">{{item.city}}</view>
					</view>
						<!-- • -->
				</view>
				<view class="bg" v-if="!crosswise"></view>
			</view>
		</view>	
	
	</view>
</template>

<script>
	export default {
		props:["data","myclass","crosswise"],
	
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
.length-people-item .cover{width: 100%;height: 100%;}
.length-people-item .cover .img{max-width: 100%;max-height: 100%;display: flex;}
.length-people-item .txt{position: absolute;bottom: 0;left: 0;width: 100%;color: #fff;padding: 12rpx 16rpx;line-height: 1;z-index: 10;}
.length-people-item .name{font-size: 32rpx;}
.length-people-item .data{font-size: 26rpx;margin-top: 16rpx;display: flex;align-items: center;}
.length-people-item .data .lab{position: relative;padding-right: 10rpx;margin-right: 10rpx;}
.length-people-item .data .lab::after{content: "";display: flex;position: absolute;top: 50%;margin-top: -4rpx;right: -4rpx;width: 8rpx;height: 8rpx;background-color: #fff;border-radius: 50%;}
.length-people-item .data .lab:last-child{padding: 0;margin: 0;}
.length-people-item .data .lab:last-child::after{display: none;}
.length-people-item .bg{position: absolute;bottom: 0;left: 0;width: 100%;z-index: 9;height: 120rpx;background-image: linear-gradient(transparent , rgba(0,0,0,0.8));}

.row-people{display: block;padding: 0;}
.row-people .length-people-item{width: 100%;display: flex;height: auto;margin: 0;padding: 24rpx 30rpx;border-bottom: 1rpx #eee solid;}
.row-people .length-people-item .cover{width: 160rpx;height: 160rpx;margin-right: 30rpx;border-radius: 12rpx;overflow: hidden;}
.row-people .length-people-item .cover .img{width: 100%;height: 100%;}
.row-people .length-people-item .txt{color: #333;flex: 1;position: inherit;padding: 0;display: flex;align-content: space-between;min-height: 160rpx;flex-wrap: wrap;line-height: 1.4;}
.row-people .length-people-item .name{width: 100%;}
.row-people .length-people-item .data{width: 100%;color: #636363;}
.row-people .length-people-item .data .lab{background-color: rgba(58,167,255,0.05);padding: 6rpx 10rpx;border-radius: 6rpx;margin: 10rpx 20rpx 0 0;}
.row-people .length-people-item .data .lab::after{}
</style>