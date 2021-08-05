<template>
	<view>
		<view :class="['trend-list',myclass]">
			<!-- 循环开始 -->
			<view :class="['list-item']" v-for="(v,key) in trendLists">
				<view class="top flex">
					<view class="head mr10">
						<image class="img" :src="v.headerPic" mode="aspectFill" />
					</view>
					<view class="info flex1">
						<view class="name fs-15">{{ v.nickname }}</view>
						<view class="flex">
							<view :class="['age',v.sex == 0 ? 'blue' : 'red']"><span :class="['iconfont',v.sex == 0 ?  'icon-man':'icon-women']"></span>{{v.age}}</view>
							<view class="city fs-12 fc-9 pl10 lh-20">{{v.city}}</view>
						</view>
					</view>
					<view class="data fs-12 fc-9 lh-26">{{ v.published_at }}</view>
				</view>
				<view class="bcon">
					<view class="con">
						<view class="rCon">
							{{v.content}}
						</view>
						<view class="image-group mt5" v-if="v.getCover">
							<view class="img-item" v-for="(cover,coverIndex) in v.getCover">
								<image class="img" :src="cover.img " mode="aspectFill" @click="previewImage(img,'article')" />
							</view>
						</view>
					</view>
					<view class="tabs mt15 mb20">
						<span class="p">#{{v.tabs}}#</span>
					</view>
					<view class="bottom flex-middle fc-6">
						<view class="item mr20">
							<span :class="['iconfont icon-trends-thumbs fs-15', thumbs==true ? 'fc-red' : '']" @click="thumbs = !thumbs"></span>
							<span class="num pl5">0</span>
						</view>
						<view class="item mr20">
							<span class="iconfont icon-trends-evalute fs-15"></span>
							<span class="num pl5">{{v.evalute.length}}</span>
						</view>
					</view>
					<view class="plcon mt10" v-if="v.evalute.length">
						<view class="pl-list fs-14" v-for="(item,key) in v.evalute" :key="key">
							<view class="name" v-if="item.getUser.userName">{{ item.getUser.userName }}</view>
							<view class="dateil plr3" v-if="item.getUser.userName">回复</view>
							<view class="name">{{ item.userName }} ：</view>
							<view class="dateil">{{ item.getUser.content ? item.getUser.content : item.content }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['myclass'],
	data() {
		return {
			thumbs: false,
			trendLists:[
				{
					headerPic: '/static/fenxiaobg.jpg',
					nickname: '一杯清茶',
					content: '一个的生活，简单的同时也行清净',
					sex: 1,
					age: '30',
					city: '广东-广州',
					tabs: '一起旅行',
					getCover: [
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
						{img: '/static/fenxiaobg.jpg'},
					],
					evalute: [
						{
							id: 1,
							userName: '蒲公英',
							content: '小姐姐可以了解一下吗？',
							getUser: {
								userName: '',
								content: '',
							}
							
						},
						{
							id: 1,
							userName: '蒲公英',
							content: '小姐姐可以了解一下吗？',
							getUser: {
								userName: '一杯清茶',
								content: '可以吖',
							}
							
						}
					],
					published_at: '03-23 17:44',
					
				},
				{
					headerPic: '/static/show-top-bg.jpg',
					nickname: '荒北游鱼',
					content: '一个的生活，简单的同时也行清净',
					sex: 0,
					age: '28',
					city: '广东-深圳',
					tabs: '日记',
					getCover: [
						{img: '/static/show-top-bg.jpg'},
						{img: '/static/show-top-bg.jpg'},
					],
					evalute: [
						
					],
					published_at: '03-22 10:13',
					
				}
			]
		}
	},
	methods: {
		
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
.trend-list .con .rCon {text-align: justify;line-height: 44rpx;padding: 30rpx 0 20rpx;}
.trend-list .con .image-group {display: flex;flex-wrap: wrap;}
.trend-list .con .image-group .img-item {margin: 0 6rpx 6rpx 0;width: calc(33.33% - 6rpx);}
.trend-list .con .image-group .img-item .img{height: 180rpx;display: flex;width: 100%;border-radius: 8rpx;}
.trend-list .tabs .p{height: 48rpx;line-height: 48rpx;padding: 0 20rpx;background-color: #fef3dd;border-radius: 4rpx;color: #b6a88d;font-size: 24rpx;display: inline-block;}
.trend-list .pl-list{display: flex;flex-wrap: wrap;padding-bottom: 6rpx;}
.trend-list .pl-list .dateil{color: #333;}
</style>
