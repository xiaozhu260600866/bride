<template>
	<view class="business">
		<view v-for="v in data" v-if="(otherData.ANavType == v.userInfo.industry && v.role == 5 ) || (otherData.ANavType == 0 && v.role == 5) ">
			<view class="bus-box">
				<view class="list-item" @click="toMerchant(v)">
					<view class="info-left mr10" v-if="v.gerProduct.length == 0">
						<image class="img" mode="aspectFill" :src="v.headerPic.indexOf('doxinsoft')!=-1 ?v.headerPic:getSiteName+'/images/wap/business_img.jpg'"></image>
					</view>
					<view class="info-con">
						<view class="CItem fs-16 nowrap lh-20 fw-bold">{{ v.userInfo.company_name }}</view>
						<view class="Cmark fs-15 fc-3 wrap2" v-if="v.userInfo.remark">{{ v.userInfo.remark }}</view>
						<view class="CItem fs-13 nowrap lh-20 mt5 fc-6">{{ v.userInfo.address }}</view>
						<view class="labelG flex mt5">
							<view class="class-label">{{v.userInfo.getIndustry[0]}}</view>
							<view class="class-label" v-if="v.userInfo.getIndustry.length ==2">{{v.userInfo.getIndustry[1]}}</view>
						</view>
					</view>
					<div class="num fs-13 fc-9">
						<p class="p fs-12">距离</p>
						<p class="p distance Arial">
							{{getLocation1(v.location)}}
						</p>
					</div>
					<view style="position:absolute;right:10px;bottom:0" v-if="type == 'choose'" @click="$emit('callBack',v)">
						<button class="dx-btn dx-btn-orange">选择</button>
					</view>
				</view>
				<view class="bus-pro flex-between mt15 1" v-if="v.gerProduct.length">
					<view v-for="item in v.gerProduct">
						<view class="pro-item" @click="goto(item.is_group ? '/pages/group/show/main?id='+item.id :'/pages/product/show/main?id='+item.id,1)">
							<view class="timg">
								<image class="img" :src="getSiteName+'/upload/images/product/'+item.cover" />
								<view class="tprice fs-13 fc-white Arial text-center w-b100 lh-22">￥{{ item.price }}</view>
							</view>
							<view class="fs-13 lh-20 pt5 text-center nowrap">{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
import filterKm from '@/components/filterKm';

export default {
	props: ["data", 'type', 'otherData'],
	data() {
		return {
			getSiteName: this.getSiteName(),
		}
	},
	methods:{
		getLocation1(value){
			if(value > 1000){
				value = value / 1000;
				return value = value.toFixed(1)+"km";
			}else{
				return value+'m';
			}
		},
		toMerchant(v){
			this.goto('/pages/business/show/main?id='+v.id,1);
		}
	},
	components: { filterKm }
}

</script>
<style type="text/css">
.business{background-color: #fff;}
.business .bus-box{padding: 24rpx 0;margin: 0 30rpx;border-bottom: 1rpx #eee solid;}
.business .list-item {display: flex;align-items: center;position: relative;}
.business .list-item .info-left .img {width: 200rpx;height: 200rpx;display: flex;border-radius: 12rpx;}
.business .list-item .info-con {width: 100%;flex: 1;overflow: hidden;}
.business .list-item .info-con .CItem {width: 100%;}
.business .list-item .info-con .Cmark {margin-top: 10rpx;line-height: 36rpx;width: 100%;}
.business .list-item .info-con .people {width: 100%;line-height: 32rpx;}
.business .list-item .num {text-align: right;line-height: 40rpx;width: 80rpx;margin-left: 20rpx;}
.business .list-item .num .p {height: 40rpx;line-height: 40rpx;}
.business .pro-item{width: 200rpx;}
.business .pro-item .timg{position: relative;}
.business .pro-item .timg .tprice{position: absolute;bottom: 0; left: 0;background: rgba(0,0,0,0.5);border-radius: 0 0 12rpx 12rpx;}
.business .pro-item .img{width: 100%;display: flex;height: 160rpx;border-radius: 12rpx;}

.business .labelG .class-label{font-size: 24rpx;color: #387ef8;padding: 0 8rpx;border-radius: 8rpx;height: 40rpx;line-height: 38rpx;margin-right: 20rpx;border: 1rpx #387ef8 solid;}
</style>
