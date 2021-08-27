<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div v-if="step == 1">
				<!-- <THeader :data="data" :callBack="true" :waterCityData="waterCityData" @callBack="$refs.selectCity.init()" title="搜索好物" noborder></THeader> -->
				<div class="bg-f swiper_box bannerSwiper" v-if="data.silders2.data.length">
					<myswiper :data="data.silders2.data" :tbPadding="0"></myswiper>
				</div>
				<view class="navSwiper mb8" v-if="data.location.length">
					<swiper class="swiper bg-f" :vertical="vertical" :autoplay="false" :indicator-dots="true" :duration="duration"
					 :circular="circular" :style="data.location[0].length<=5 ? 'height: 100px;' : 'height: 410rpx;'" v-if="data.siteConfig.is_index == 1">
						<swiper-item v-for="(parent,parentKey) in data.location">
							<div class="Nav_btn pb10">
								<div class="item" v-for="v in parent">
									<myform :ruleform="ruleform" :vaildate="vaildate" :append="true" :data="v" @callBack="goto(v.url,1)">
										<div slot="content">
											<div class="Nav_img">
												<image :src="v.cover" class="img" />
											</div>
											<div class="txt">{{ v.name }}</div>
										</div>
									</myform>
								</div>
							</div>
						</swiper-item>
					</swiper>
				</view>
				<view class="TopNav">
					<scroll-view scroll-x="true">
						<view class="liNav cur" @click="goto('/pages/package/lists/main?fclass=7',1)">
							<text class="ANav">推荐好物</text>
						</view>
					</scroll-view>
				</view>
				<productLists :data="data" :type="2" v-if="data.lists.data.length"></productLists>
				<hasMore :parentData="data"></hasMore>
				<view class="copyright" @click="phone('13318639080')">版权所有：广东科阅云</view>
			</div>
		
			<div v-if="step == 2">
				<dx-results txt="企业服务咨询提交成功!" tips="我们将有企业服务专员与您联系。" :tipsSize="16" tipsColor="#666" @click="ruleform.phone = '' ;ruleform.content= '' ;step =1"></dx-results>
			</div>
		</div>
		<selectCity ref="selectCity" title="请选择配送区域" :OFFicon="true" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
	</view>
</template>

<script>
	import "./index.css";
	import marque from "xiaozhu/uniapp/components/marque";
	import THeader from '@/components/THeader';
	import productLists from "@/components/productLists";
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import demandLists from "@/components/demandLists";
	import dxResults from "doxinui/components/results/results"
	import dxAddress from "xiaozhu/uniapp/components/addressAndCity";
	import selectCity from "@/components/selectCity.vue"
	export default {
		components: {marque,THeader,productLists,dxTabsScroll,demandLists,dxAddress,selectCity,dxResults},
		data() {
			return {
				formAction: '/shop/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				waterCityData:'',
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				ruleform:{province:'广东省'},
				vaildate:{},
				provinceArr:[],
				townArr:[],
				cityArr:[],
				areaArr:[],
				step:1,
				tabs: [
					{value: 0,name: "今日特拼"},
					{value: 1,name: "全部"},
					{value: 2,name: "新品"},
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
		onShow(){
			this.onShow(this);
		},
		onShareAppMessage() {
			if (this.data.dis) this.data.query.distribution = this.data.dis.id;
			return this.shareSource(this, '选到',"notshare");
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
			
			this.ajax();
			
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if (res) {
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.step = 2;
							}
						});
					}
				})
			},
			cityCallBack(item){
				uni.setStorageSync("waterCityData",item);
				uni.setStorageSync("waterCity",item.province + item.city+ item.town + item.area);
				this.ajax();
				this.waterCityData = item;
				console.log(item);
			},
			toProduct(item) {
				if (item.num > 0 && item.canHot) {
					return this.goto('/pages/hot/show/index?id=' + item.id, 1);
				}
			},
			ajax() {
				this.getAjax(this).then(msg => {
						console.log(this.data);
					});
				}
				
		},
	}
</script>
