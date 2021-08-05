<template>
	<view>
		<view class="demandL" :class="{demandEdit:edit}" v-for="(item,key) in data">
			<view class="demandL-box">
				<view class="demandL-list mb10" @click="goto('/pages/demand/show/index?id='+item.id,1)">
					<view class="list-left">
						<image class="img" :src="item.getLogo" mode="aspectFill"></image>
					</view>
					<view class="list-right">
						<view class="Atitle fs-16 lh-20 fw-bold">{{ item.title}}</view>
						<view class="fs-13 mt5 nowrap fc-9"><text class="iconfont icon-hongbao fs-14 pr2 fc-red" v-if="item.red_packet"></text>{{ item.category }}</view>
						<view class="fs-15 wrap2 fc-3 mt5 lh-20">{{ item.getUser.userInfo.company_name }}</view>
					</view>
					<view class="list-location fs-13 fc-9" v-if="item.juli">
						<view class="p fs-12">距离</view>
						<view class="p distance Arial">{{countLocation(item.juli)}}</view>
					</view>
				</view>
				<view class="read">
					<view class="left fc-9 fs-13 flex1">
						<text class="span Arial">{{item.views}}</text>
						<text>查看</text>
						<text class="Arial pl15">{{item.created_at}}</text>
					</view>
					<view class="right">
						<view class="read-nav" :class="item.thumb ? 'main-color': ''" @click="thumb2(item,key)">
							<text :class="['iconfont',item.thumb ? 'icon-demand-thumb-fill':'icon-demand-thumb']"></text>
							<text class="span Arial">{{item.thumbCount}}</text>
						</view>
						<view class="read-nav" @click="phone(item.phone)">
							<text class="iconfont icon-tel"></text>
							<text class="span">联系</text>
						</view>
					</view>
				</view>
			</view>
			<view class="edit_btn" v-if="edit">
				<dx-button size="small" myclass="plr20" block round @click="del(item)">删除</dx-button>
				<dx-button type="primary" size="small" myclass="plr20 ml15" block round  v-if="item.status !=4" @click="goto('/pages/user/demand/create_edit/index?id='+item.id+'&category='+item.category,1)">编辑</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{dxImages},
		props:["data","edit","type"],
	
		data() {
			return {
				
			}
		},
		methods: {
			countLocation(location){
					if(location > 1000){
						location= location / 1000;
						return  location.toFixed(1)+"km";
					}else{
						return location.toFixed(1)+'m';
					}
			},
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
.demandL{background-color: #fff;position: relative;}
.demandEdit{margin: 24upx;border-radius: 12upx;overflow: hidden;}
.demandL-box{padding: 20upx 0;margin: 0 30upx;border-bottom: 2upx #eee solid;}
.demandEdit .demandL-box{border-bottom: 0;}
.demandL-list{display: flex;align-items: center;}
.demandL-list .list-left{margin-right: 30upx;}
.demandL-list .list-left .img{width: 200upx;height: 200upx;border-radius: 12upx;display: flex;}
.demandL-list .list-right{flex: 1;overflow: hidden;width: 100%;min-height: 200upx;}
.demandL-list .list-location{text-align: right;line-height: 40upx;width: 80upx;margin-left: 20upx;}
.demandL-list .list-location .p{height: 40upx;line-height: 40upx;}

.demand-con{text-align: justify;}
.demand-con .content{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;}

.demandL .read{line-height: 16px;display: flex;justify-content: space-between;align-items: center;line-height: 36upx;}
.demandL .read .right{display: flex;align-items: center;}
.demandL .read-nav{display: flex;align-items: center;color: #636363;margin-left: 20upx;height: 48upx;line-height: 48upx;padding: 0 26upx 0 20upx;border-radius: 24upx;border: 2upx #ddd solid;}
.demandL .read-nav .iconfont{padding-right: 10upx;font-size: 28upx;}
.demandL .read-nav .span{font-size: 12px;color: #636363;}

.edit_btn{padding: 16upx 30upx;display: flex;justify-content: flex-end;border-top: 1upx #eee solid;}
</style>