<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom: 25px">
			<div slot="floatBtn">
				<view @click="toMerchant" v-if="data.release">
					<floatBtn myclass="float-nav-green onetxt" nSize="fs-15" title="申请入驻"></floatBtn>
				</view>
			</div>
		</page>
		<div v-if="data.show">
			<div>
				<div class="bg-f swiper-banner" v-if="data.silders.data.length">
					<myswiper :data="data.silders.data"></myswiper>
				</div>
				<swiper class="swiper mb8 bg-f" :vertical="vertical" :autoplay="false" :indicator-dots="true" :duration="duration"
				 :circular="circular" :style="data.industry[0].length<=5 ? 'height: 190rpx;' : 'height: 380rpx;'" v-if="data.industry.length">
					<swiper-item v-for="(parent,parentKey) in data.industry">
						<div class="Nav_btn pb10">
							<div class="item" :href="v.url" v-for="v in parent" @click="goto('/pages/business/lists/index?industry_id='+v.id+'&industry='+v.label,1)">
								<div class="Nav_img">
									<img :src="v.cover" class="img">
								</div>
								<div :class="['txt',data.query.industry == v.label ? 'fc-red' :'fc-3']">{{ v.label }}</div>
							</div>
						</div>
					</swiper-item>
				</swiper>
				
				<div class="business">
					<dx-tabs-scroll v-model="showType" @change="ajax" :tabs="tabs" height="52" borderColor="#07c160"
				 curSize="17" curColor="#07c160" curBold="bold" nameSize="15"></dx-tabs-scroll>
					<businessLists :data="data.lists.data" :otherData="otherData"></businessLists>
					<hasMore :parentData="data"></hasMore>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import businessLists from '@/components/business_lists';
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	export default {
		components: { businessLists,dxTabsScroll },
		data() {
			return {
				formAction: '/wapindex?show_index2=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				city:'',
				getSiteName: this.getSiteName(),
				otherData: {
					ANavType: 0,
					searchVal: ''
				},
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				showType:0,
				tabs: [
					{value: 0,name: "全部商店"},
					{value: 1,name: "附近店铺"},
				],
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, '选到',"notshare");
		},
		onShow(){
			if(uni.getStorageSync('city')){
				this.city = uni.getStorageSync('city');
			}
			this.onShow(this);
		},
		onLoad(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			});
			if(!uni.getStorageSync('city')){
				uni.setStorageSync('city','江门市');
			}
			if(uni.getStorageSync('city')){
				this.city = uni.getStorageSync('city');
			}
			this.getMyAddress(this).then(msg=>{
				this.ajax();
			});;
			
		},
		methods: {
			changeIndustry(industry){
				this.data.thisPage = 1;
				this.data.query.industry = industry ;
				this.ajax();	
			},
			searchName(e) {
				setTimeout(() => {
					if (e.mp.type == "confirm") {
						this.otherData.searchVal = e.mp.detail.value;
					}
					if (!this.otherData.searchVal) return false;
					this.goto("/pages/business/lists/index?name=" + this.otherData.searchVal, 1);
				}, 200);
			},
			toMerchant(){
				uni.navigateToMiniProgram({
					appId: 'wxb135e689e76457d2',
					path: 'pages/index/main',
					extraData: {
						'data1': 'test'
					},
					success(res) {
					// 打开成功
					}
				})
			},
			ajax() {
				this.getAjax(this,{showType:this.showType}).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
