<template>
	<view class="dynamic-box" :class="[myclass,type==1?'':'plr20']">
		<!-- 个人详情显示 -->
		<block v-if="type == 1">
			
			<view class="dynamic-item" v-for="(item,key) in data" :key="key" v-if="key < 3">
				<view class="left">
					<view class="day Arial fs-22 lh-30">{{ item.day }}</view>
					<view class="month Arial fs-15 lh-20">{{item.date}}</view>
				</view>
				<view class="right">
					<view class="title" v-if="item.title">{{ item.title }}</view>
					<view class="photo" :class="[item.title?'':'mt5']">
						<image class="img" :src="v.img" v-for="v in item.getCover" mode="aspectFill" @click="previewImage(v.img)"></image>
					</view>
				</view>
			</view>
			<view class="more" v-if="data.length > 2" @click="goto('/pages/people/show/layouts/dynamic',1)">查看更多>></view>
		</block>
		<!-- 个人列表显示 -->
		<block v-if="type == 2">
			
			<view class="dynamic-item" v-for="(item,key) in data" :key="key">
				<view class="left">
					<view class="day Arial fs-22 lh-30">{{ item.day }}</view>
					<view class="month Arial fs-15 lh-20">{{item.date}}</view>
				</view>
				<view class="right">
					<view class="title" v-if="item.title">{{ item.title }}</view>
					<view class="photo" :class="[item.title?'':'mt5']">
						<image class="img" :src="v" v-for="v in item.photo" mode="aspectFill" @click="previewImage(v)"></image>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		components:{},
		props:["data","type"],
		data() {
			return {
				getSiteName: this.getSiteName()
			}
		},
		methods: {
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
		}
	}
</script>
<style scoped="">
.dynamic-item{display: flex;padding: 30rpx 0;border-bottom: 1rpx #eee solid;}
.dynamic-item:last-child{border-bottom: 0;}
.dynamic-item .left{text-align: center;margin-right: 30rpx;}
.dynamic-item .right{flex: 1;}
.dynamic-item .title{color: #434343;line-height: 1.6;font-size: 30rpx;text-align: justify;padding-bottom: 20rpx;min-height: 100rpx;}
.dynamic-item .photo{display: flex;flex-wrap: wrap;}
.dynamic-item .photo .img{width: calc(33.33% - 10rpx);margin: 0 10rpx 10rpx 0;height: 180rpx;display: flex;border-radius: 12rpx;}
.dynamic-box .more{font-size: 28rpx;text-align: center;padding: 30rpx;color: #434343;}
</style>