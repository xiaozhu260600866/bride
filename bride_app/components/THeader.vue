<template>
	<view >
		<view class="tsearch" :class="[noborder?'noborder':'',myclass]">
			<view class="lcity" @click="to" v-if="showCity">{{waterCityData ?waterCityData.area : city}}<text class="icon dxi-icon dxi-icon-down"></text></view>
			<view class="bg-f plr10 ptb5 flex1" @click="goto(searchUrl ? searchUrl :'/pages/search/product/main',1)">
				<view class="searchbox bg-f7 fc-9 plr15">
					<span class="iconfont icon-search fs-13 pr5"></span>
					<span class="search-text fs-13">{{ title ? title:'搜索内容'}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["title","waterCityData","city",'searchUrl','noborder','showCity'],
		data() {
			return {
				noborder: true,
			}
		},
		methods: {
			to(){
				return this.callBack ? this.callBack2() : this.goto('/pages/search/searchCity/main',1);
			},
			callBack2(){
				console.log(2)
				this.$emit('callBack');
			}
		}
	}
</script>

<style>
.searchbox {display: flex;align-items: center;overflow: hidden;z-index: 999;position: relative;}
/* 普通搜索 */
.tsearch{width: 100%;z-index: 10;display: flex;align-items: center;background-color: #fff;font-size: 30rpx;border-bottom: 1rpx #eee solid;}
.tsearch.noborder{border-bottom: 0;}
.tsearch .lcity{padding: 0 10rpx 0 20rpx;color: #666;}
.tsearch .lcity .icon{font-size: 24rpx;padding-left: 16rpx;}
.tsearch .searchbox{height: 32px;line-height: 32px;width: 100%;margin: 0 auto;border-radius: 16px;font-size: 12px;}


</style>