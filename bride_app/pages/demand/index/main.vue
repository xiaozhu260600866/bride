<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom: 25px">
			<div slot="floatBtn" v-if="data.show">
				<view @click="goto(data.show && data.phone ? '/pages/user/demand/create_edit/index' : '/pages/user/card/register/index',1)" >
					<floatBtn icon="icon-count-plus" myclass="float-nav-blue" iSize="fs-16" nSize="fs-13" title="发布"></floatBtn>
				</view>
			</div>
		</page>
		555666
		<div v-if="data.show">
			777888
			<!-- <THeader :data="data" :callBack="true" :waterCityData="waterCityData"  title="搜索动态" searchUrl="/pages/search/demand/main" @callBack="$refs.selectCity.init()" noborder></THeader> -->
			<div>
				<!-- 轮播图 -->
				<!-- <div class="bg-f swiper-banner bannerSwiper" v-if="data.ad4.length">
					<myswiper :data="data.ad4" :tbPadding="0"></myswiper>
				</div>
				<view class="navSwiper" v-if="data.location_category.length">
					<swiper class="swiper bgf mb8" :vertical="vertical" :autoplay="false" :indicator-dots="true" :duration="duration"
					 :circular="circular" :style="data.location_category[0].length<=5 ? 'height: 100px;' : 'height: 410rpx;'" >
						<swiper-item v-for="(parent,parentKey) in data.location_category">
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
				</view> -->
				<!-- 广告 -->
				<!-- <div id="banner" class="pt5" v-if="data.silders && data.silders.data.length">
					<myswiper :lists="data.silders.data"></myswiper>
				</div> -->
				<view>
					<dx-tabs-scroll :tabs="tabs" v-model="showType" @change="listsShow = false;ajax()" :height="46" borderColor="#387ef8"
					 :curSize="18" curColor="#000" curBold="bold" :nameSize="16" nameBold="bold" nameColor="#333" :borderHeight="6" :borderRadius="6"
					 :borderWidth="16"></dx-tabs-scroll>
					<!-- <demand-lists :data="data.lists.data" @thumb="thumb3" v-if="listsShow"></demand-lists> -->
					<trendsLists :data="data.lists.data"></trendsLists>
				</view>
				
				<view class="copyright" @click="phone('13318639080')">版权所有：广东科阅云</view>
			</div>
		</div>
		<selectCity ref="selectCity" title="请选择配送区域" :OFFicon="true" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
	</view>
</template>

<script>
	import marque from "xiaozhu/uniapp/components/marque";
	import THeader from '@/components/THeader';
	import productLists from "@/components/productLists";
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll";
	import demandLists from "@/components/demandLists";
	import selectCity from "@/components/selectCity.vue";
	import trendsLists from "@/components/trendsLists";
	export default {
		components: {marque,THeader,productLists,dxTabsScroll,demandLists,selectCity,trendsLists},
		data() {
			return {
				formAction: '/shop/wapindex2?demand=1',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				city:'',
					waterCityData:'',
				ruleform:{province:'广东省'},
				provinceArr:[],
				townArr:[],
				cityArr:[],
				areaArr:[],
				vaildate:{},
					listsShow:false,
					showType:1,
				tabs: [
					{value: 1,name: "附近"},
					{value: 2,name: "热门"},
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
			if(uni.getStorageSync('city')){
				this.city = uni.getStorageSync('city');
			}
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
			if(!uni.getStorageSync('city')){
				uni.setStorageSync('city','江门市');
			}
			if(uni.getStorageSync('city')){
				this.city = uni.getStorageSync('city');
			}
			
			this.ajax();
			// this.getMyAddress(this,msg=>{
			// 	this.ajax();
			// })
			
		},
		methods: {
			cityCallBack(item){
				uni.setStorageSync("waterCityData",item);
				uni.setStorageSync("waterCity",item.province + item.city+ item.town + item.area);
				this.ajax();
				this.waterCityData = item;
				console.log(item);
			},
			thumb3(key){
				let item = this.data.lists.data[key];
				
				this.postAjax("/articleOrder/thumb",{articleOrder_id:item.id},"notloading").then(msg=>{
					 if(msg.data.status == 2){
						 //this.getParent()
						 //this.$set(item,"thumb",!item.thumb);
						 item.thumb = !item.thumb;
						 if(item.thumb){
							 item.thumbCount ++;
						 }else{
							  item.thumbCount --;
						 }
					 }
				});
			},
			toProduct(item) {
				if (item.num > 0 && item.canHot) {
					return this.goto('/pages/hot/show/index?id=' + item.id, 1);
				}
			},
			ajax() {
				this.getAjax(this,{showType:this.showType}).then(msg => {
					console.log(this.data);
					this.listsShow = true;
				});
			}
		},
	}
</script>
<style>
@import "./index.css";
</style>