<template>
	<view>
		<view :class="['trend-list',myclass]">
			<!-- 循环开始 -->
			<view :class="['trend-list-item',type == 1?'trend-list-li':'trend-list-my',edit?'trend-list-edit':'']" v-for="(v,key) in data">
				<view class="trend-list-box">
					<view class="top flex" v-if="type == 1">
						<view class="head mr10">
							<image class="img" :src="v.getUser ? v.getUser.headerPic :''" mode="aspectFill" />
						</view>
						<view class="info flex1">
							<view class="name fs-16">{{ v.name }}</view>
							<view class="flex-baseline" v-if="v.getUser">
								<!-- <view :class="['age',v.getUser.userInfo.sex == 0 ? 'blue' : 'red']"><span :class="['iconfont',,v.getUser.userInfo.sex == 0 ?  'icon-man':'icon-women']"></span>{{v.getUser.userInfo.age}}</view> -->
								<view class="tag flex-middle fs-13 fc-6">
									<view class="lab" v-if="v.getUser.userInfo.age"><text class="Arial">{{v.getUser.userInfo.age}}</text>岁</view>
									<view class="dot mlr5" v-if="v.getUser.userInfo.age&&v.getUser.userInfo.height"></view>
									<view class="lab Arial" v-if="v.getUser.userInfo.height">{{v.getUser.userInfo.height}}cm</view>
									<view class="dot mlr5" v-if="v.getUser.userInfo.height&&v.city"></view>
									<view class="lab">{{v.city}}</view>
								</view>
							</view>
						</view>
						<!-- <view class="data fs-12 fc-9 lh-26">{{ v.created_at }}</view> -->
					</view>
					<!-- <view class="left" v-if="type == 2">
						<view class="day Arial fs-22 lh-30">{{ v.day }}</view>
						<view class="month Arial fs-15 lh-20">{{v.date}}</view>
					</view> -->
					<view class="bcon">
						<view class="con">
							<view class="rCon">
								{{v.title}}
							</view>
							<view class="image-group" v-if="v.getCover">
								<view class="img-item" v-for="(cover,coverIndex) in v.getCover">
									<image class="img" :src="cover.img " mode="aspectFill" @click="previewImage(cover.img,'article')" />
								</view>
							</view>
						</view>
						<!-- <view class="bottom flex-middle fc-6">
							<view class="item mr20">
								<span :class="['iconfont fs-15', v.thumb ? 'fc-red icon-demand-thumb-fill' : 'icon-trends-thumbs']" @click="thumb(v)"></span>
								<span class="num pl5">{{v.thumbCount}}</span>
							</view>
						</view> -->
						<view class="fc-9 fs-13 pt8">
							<text :class="['iconfont fs-15 pr10', v.thumb ? 'fc-red icon-demand-thumb-fill' : 'icon-trends-thumbs']" @click="thumb(v)" v-if="!edit"></text>
							<text class="span Arial">{{v.thumbCount}}</text>
							<text>点赞</text>
							<text class="Arial pl15">{{v.created_at}}</text>
						</view>
					</view>
				</view>
				<view class="edit_btn pt10 flex-right bd-te" v-if="edit">
					<dx-button size="small" myclass="plr20" round @click="del(item)">删除</dx-button>
					<dx-button type="primary" size="small" myclass="plr20 ml8" round @click="goto('/pages/user/demand/create_edit/index?id='+v.id+'&category='+v.category,1)">编辑</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: ['myclass','data','type','edit'],
	data() {
		return {
			thumbs: false,
			systemDate:'',
		}
	},
	methods: {
		del(item) {
			uni.showModal({
				title: '提示',
				content: '您确定要删除这条动态吗？',
				success: res => {
					if (res.confirm) {
						this.postAjax('/ajax/mydel', {
							id: item.id,
							tablename: 'article_orders'
						}).then(msg => {
							if (msg.data.status == 2) {
								this.getParent(this).ajax();
							}
						});
					}
				}
			})
		},
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
/* 列表 */
.trend-list-li{padding: 30rpx;margin-bottom: 16rpx;overflow: hidden;width: 100%;}
.trend-list-li .bcon{margin-left: 112rpx;}
.trend-list-li .head .img {width: 92rpx;height: 92rpx;display: flex;border-radius: 50%;}
.trend-list-li .info .age{height: 40rpx;line-height: 40rpx;padding: 0 10rpx;border-radius: 20rpx;color: #fff;font-size: 24rpx;}
.trend-list-li .info .age.red{background: #ffa1ae;}
.trend-list-li .info .age.blue{background: #a3b4fc;}
.trend-list-li .info .age .iconfont{font-size: 20rpx;padding-right: 6rpx;}
.trend-list-li .con .rCon{padding-top: 20rpx;}

/* 个人列表 */
.trend-list-my{padding-top: 30rpx;}
.trend-list-my .trend-list-box{display: flex;}
.trend-list-my:last-child .bcon{border-bottom: 0;}
.trend-list-my .left{text-align: center;margin-right: 30rpx;}
.trend-list-my .bcon{flex: 1;border-bottom: 1rpx #eee solid;padding-bottom: 30rpx;}

/* 个人发布 */
.trend-list-edit{margin-bottom: 24rpx;border-bottom: 0;padding: 30rpx;}
.trend-list-edit .bcon{border-bottom: 0;}

/* 总 */
.trend-list-item{position: relative;background: #fff;}
.trend-list-item .con{min-height: 100rpx;}
.trend-list-item .con .rCon {text-align: justify;line-height: 44rpx;padding-bottom: 20rpx;}
.trend-list-item .con .image-group {display: flex;flex-wrap: wrap;}
.trend-list-item .con .image-group .img-item {margin: 0 6rpx 6rpx 0;width: calc(33.33% - 6rpx);}
.trend-list-item .con .image-group .img-item .img{height: 180rpx;display: flex;width: 100%;border-radius: 8rpx;}
.trend-list-item .tabs .p{height: 48rpx;line-height: 48rpx;padding: 0 20rpx;background-color: #fef3dd;border-radius: 4rpx;color: #b6a88d;font-size: 24rpx;display: inline-block;}
.trend-list-item .pl-list{display: flex;flex-wrap: wrap;padding-bottom: 6rpx;}
.trend-list-item .pl-list .dateil{color: #333;}
</style>
