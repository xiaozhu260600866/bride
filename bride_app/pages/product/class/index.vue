<template>
	<view class="container" v-if="data.show">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" size='13' color='#999'></icon>
				<!-- #endif -->
				<text class="tui-search-text">搜索商品</text>
			</view>
		</view>

		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:height+'px'}">
			<view v-for="(v,key) in data.lists" :key="key" class="tab-bar-item" :class="[currentTab==key ? 'active' : '']"
			 :data-current="key" @tap.stop="swichNav">
				<text>{{v.label}}</text>
			</view>
		</scroll-view>
		<block>
			<scroll-view scroll-y class="right-box" :style="{height:height+'px'}" >
				<!--内容部分 start 自定义可删除-->
				<view class="page-view">
					<view class="class-box">
						<view class="class-item">
							<view class="g-container">
								<view class="g-box" @tap.stop="goto('/pages/shop/product/lists/index?id='+item.value,1)"   v-for="(item,index) in data.lists[currentTab].children" :key="index">
									<image :src="item.cover" class="g-image" />
									<view class="g-title">{{item.label}}</view>
								</view>
							</view>
						</view>

					</view>
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/product/class',
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				tabbar: ["推荐分类", "进口超市", "国际名牌", "奢侈品", "海囤全球", "男装", "女装", "男鞋", "女鞋", "钟表珠宝", "手机数码", "电脑办公", "家用电器", "玩具乐器",
					"运动户外", "宠物生活", "特产馆"
				],
				height: 0, //scroll-view高度
				currentTab: 0, //预设当前项的值
				scrollTop: 0 //tab标题的滚动条位置
			}
		},
		onLoad: function(options) {
			uni.getSystemInfo({
				success: (res) => {
					let header = 92;
					// #ifdef H5
					header = 0;
					// #endif
					this.height = res.windowHeight - uni.upx2px(header)
				}
			});
			this.ajax();

		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		methods: {
			// 点击标题切换当前页时改变样式
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			},
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.checkCor();
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail'
				})
			},
			productList(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})
			},
			search: function() {
				this.goto('/pages/search/product/index',1);
			}
		}
	}
</script>


