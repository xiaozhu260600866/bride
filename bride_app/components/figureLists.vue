<template>
	<view>
		<view class="figureL" :class="{figureEdit:edit}" v-for="(item,key) in data">
			<view class="figureL-box">
				<view class="figureL-list mb10" @click="goto('/pages/user/card/show/index?user_id='+item.id,1)">
					<view class="list-left">
						<image class="img" :src="getSiteName + '/upload/images/user/300_'+item.userInfo.pic2" mode="aspectFill"></image>
					</view>
					<view class="list-right flex-ac-between flex-wrap">
						<view class="w-b100">
							<view class="Atitle fs-16 lh-20">{{ item.userInfo.title}}</view>
							<!-- <view class="fs-14 fc-3 flex-middle mt5">
								<view>{{item.userInfo.name}}</view>
								<view class="ml10" v-if="item.userInfo.position">{{item.userInfo.position}}</view>
							</view> -->
						</view>
						<view class="labelG flex mt5 w-b100">
							<view class="class-label" v-for="v in item.userInfo.getTag">{{v}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<myswiper :data="ad" v-if="key == 4"></myswiper>
		</view>	
	
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{dxImages},
		props:["data","edit","type","ad"],
	
		data() {
			return {
				getSiteName: this.getSiteName()
			}
		},
		methods: {
			thumb2(item,key){
				this.$emit("thumb",key);
				
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
.figureL{background-color: #fff;position: relative;}
.figureEdit{margin: 24upx;border-radius: 12upx;overflow: hidden;}
.figureL-box{padding: 20upx 0;margin: 0 30upx;border-bottom: 2upx #eee solid;}
.figureEdit .figureL-box{border-bottom: 0;}
.figureL-list{display: flex;}
.figureL-list .list-left{margin-right: 30upx;}
.figureL-list .list-left .img{width: 240upx;height: 200upx;border-radius: 12upx;display: flex;}
.figureL-list .list-right{flex: 1;overflow: hidden;width: 100%;}

.figure-con{text-align: justify;}
.figure-con .content{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;}

.figureL .read{line-height: 16px;display: flex;justify-content: space-between;align-items: center;line-height: 36upx;}
.figureL .read .right{display: flex;align-items: center;}
.figureL .read-nav{display: flex;align-items: center;color: #636363;margin-left: 20upx;height: 48upx;line-height: 48upx;padding: 0 26upx 0 20upx;border-radius: 24upx;border: 2upx #ddd solid;}
.figureL .read-nav .iconfont{padding-right: 10upx;font-size: 28upx;}
.figureL .read-nav .span{font-size: 12px;color: #636363;}

.edit_btn{padding: 16upx 30upx;display: flex;justify-content: flex-end;border-top: 1upx #eee solid;}

.labelG .class-label{font-size: 24rpx;color: #666;padding: 0 12rpx;border-radius: 8rpx;height: 44rpx;line-height: 42rpx;margin-right: 20rpx;border: 1rpx #eee solid;}
</style>