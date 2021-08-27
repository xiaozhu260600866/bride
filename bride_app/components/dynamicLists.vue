<template>
	<view class="dynamic-box" :class="[myclass]">
		<!-- 个人详情显示 -->
		<block v-if="type == 1">
			
			<view class="dynamic-li">
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
				<!-- <view class="thumbs mr20">
					<span :class="['iconfont fs-15', item.thumb ? 'fc-red icon-trends-thumbs-fill' : 'icon-trends-thumbs']" @click="thumb(v)"></span>
					<span class="num pl5">{{item.thumbCount}}</span>
				</view> -->
			</view>
			<view class="more" v-if="data.length > 2" @click="goto('/pages/people/show/layouts/dynamic',1)">查看更多>></view>
		</block>
		<!-- 个人列表显示 -->
		<block v-if="type == 2" v-for="(item,key) in data" :key="key">
			<view class="dynamic-item">
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
			<view class="flex-between flex-middle ptb8" v-if="edit">
				<view class="Arial fs-14 fc-7">{{item.created_at}}</view>
				<view class="edit_btn">
					<dx-button size="small" myclass="plr20" round @click="del(item)">删除</dx-button>
					<dx-button type="primary" size="small" myclass="plr20 ml5" round @click="goto('/pages/user/demand/create_edit/index?id='+item.id+'&category='+item.category,1)">编辑</dx-button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		components:{},
		props:["data","type",'myclass','edit'],
		data() {
			return {
				getSiteName: this.getSiteName(),
				thumbs: false,
			}
		},
		methods: {
			previewImage:function(url){
				uni.previewImage({
					urls: [url]
				})
			},
			del(item) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除这个地址吗',
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
		}
	}
</script>
<style scoped="">
.dynamic-item{display: flex;padding: 30rpx 0;border-bottom: 1rpx #eee solid;background-color: #fff;}
.dynamic-item:last-child{border-bottom: 0;}
.dynamic-item .left{text-align: center;margin-right: 30rpx;}
.dynamic-item .right{flex: 1;}
.dynamic-item .title{color: #434343;line-height: 1.6;font-size: 30rpx;text-align: justify;padding-bottom: 20rpx;}
.dynamic-item .photo{display: flex;flex-wrap: wrap;}
.dynamic-item .photo .img{width: calc(33.33% - 10rpx);margin: 0 10rpx 10rpx 0;height: 180rpx;display: flex;border-radius: 12rpx;}
.dynamic-box .more{font-size: 28rpx;text-align: center;padding: 30rpx;color: #434343;}
</style>