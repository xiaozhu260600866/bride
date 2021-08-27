<template>
	<view>
		<view :class="['trend-list',myclass]">
			<!-- 循环开始 -->
			<view :class="['list-item']" v-for="(v,key) in data">
				<view class="top flex">
					<view class="head mr10">
						<image class="img" :src="v.getUser ? v.getUser.headerPic :''" mode="aspectFill" />
					</view>
					<view class="info flex1">
						<view class="name fs-16">{{ v.name }}</view>
						<view class="flex-baseline" v-if="v.getUser">
							<view :class="['age',v.getUser.userInfo.sex == 0 ? 'blue' : 'red']"><span :class="['iconfont',,v.getUser.userInfo.sex == 0 ?  'icon-man':'icon-women']"></span>{{v.getUser.userInfo.age}}</view>
							<view class="tag flex-middle fs-13 fc-6 pl10">
								<view class="lab Arial">{{v.getUser.userInfo.height}}m</view>
								<view class="dot mlr5"></view>
								<view class="lab">{{v.city}}</view>
							</view>
						</view>
					</view>
					<view class="data fs-12 fc-9 lh-26">{{ v.created_at.split(".")[0] }}</view>
				</view>
				<view class="bcon">
					<view class="con">
						<view class="rCon">
							{{v.title}}
						</view>
						<view class="image-group" v-if="v.getCover">
							<view class="img-item" v-for="(cover,coverIndex) in v.getCover">
								<image class="img" :src="cover.img " mode="aspectFill" @click="previewImage(img,'article')" />
							</view>
						</view>
					</view>
					<view class="bottom flex-middle fc-6">
						<view class="item mr20">
							<span :class="['iconfont icon-trends-thumbs fs-15', v.thumb ? 'fc-red' : '']" @click="thumb(v)"></span>
							<span class="num pl5">{{v.thumbCount}}</span>
						</view>
						<!-- <view class="item mr20">
							<span class="iconfont icon-trends-evalute fs-15"></span>
							<span class="num pl5">{{v.evalute.length}}</span>
						</view> -->
					</view>
					<!-- <view class="plcon mt10" v-if="v.evalute.length">
						<view class="pl-list fs-14" v-for="(item,key) in v.evalute" :key="key">
							<view class="name" v-if="item.getUser.userName">{{ item.getUser.userName }}</view>
							<view class="dateil plr3" v-if="item.getUser.userName">回复</view>
							<view class="name">{{ item.userName }} ：</view>
							<view class="dateil">{{ item.getUser.content ? item.getUser.content : item.content }}</view>
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['myclass','data'],
	data() {
		return {
			thumbs: false,
			systemDate:'',
		}
	},
	methods: {
		date(){
			const nowDate = new Date();
			const date = {
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() + 1,
				date: nowDate.getDate(),
			}
			const newmonth = date.month>10?date.month:'0'+date.month
			const day = date.date>10?date.date:'0'+date.date
			let systemDate = date.year + '-' + newmonth + '-' + day
			console.log(222,systemDate)
		}
	}
}

</script>
<style>
.trend-list .list-item {padding: 30rpx;position: relative;background: #fff;margin-bottom: 16rpx;overflow: hidden;width: 100%;}
.trend-list .bcon{margin-left: 112rpx;}
.trend-list .head .img {width: 92rpx;height: 92rpx;display: flex;border-radius: 50%;}
.trend-list .info .age{height: 40rpx;line-height: 40rpx;padding: 0 10rpx;border-radius: 20rpx;color: #fff;font-size: 24rpx;}
.trend-list .info .age.red{background: #ffa1ae;}
.trend-list .info .age.blue{background: #a3b4fc;}
.trend-list .info .age .iconfont{font-size: 20rpx;padding-right: 6rpx;}
.trend-list .con .rCon {text-align: justify;line-height: 44rpx;padding: 20rpx 0 20rpx;}
.trend-list .con .image-group {display: flex;flex-wrap: wrap;}
.trend-list .con .image-group .img-item {margin: 0 6rpx 6rpx 0;width: calc(33.33% - 6rpx);}
.trend-list .con .image-group .img-item .img{height: 180rpx;display: flex;width: 100%;border-radius: 8rpx;}
.trend-list .tabs .p{height: 48rpx;line-height: 48rpx;padding: 0 20rpx;background-color: #fef3dd;border-radius: 4rpx;color: #b6a88d;font-size: 24rpx;display: inline-block;}
.trend-list .pl-list{display: flex;flex-wrap: wrap;padding-bottom: 6rpx;}
.trend-list .pl-list .dateil{color: #333;}
</style>
