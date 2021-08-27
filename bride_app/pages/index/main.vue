<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom: 25px">
			<!-- <view slot="floatBtn">
				<floatBtn type="2" icon="icon-float-feedback" myclass="float-nav-blue" iSize="fs-22" openType="contact" title="咨询" shadow></floatBtn>
			</view> -->
		</page>
		<view v-if="data.show">
			<THeader :data="data" :city="city" title="寻找心仪的TA" showCity searchUrl="/pages/search/card/main" noborder></THeader>
			<view class="bg-f groupAd bannerSwiper swiper_box">
				<myswiper :data="data.ad1" :tbPadding="0"></myswiper>
			</view>
			<view class="mb8" v-if="data.location.length">
				<view class="InavClass navSwiper">
					<dx-nav-class :data="data.location" :isturnpage="true" @click="classNav" :num="5" :namePTop="10" :imgR="16" :tbPadding="10" :pageNum="5"></dx-nav-class>
				</view>
			</view>
			<view class="bg-f">
				<view class="sec-title">同城置顶</view>
				<view class="cross-people">
					<scroll-view :scroll-x="true">
						<view class="cross-people-item" v-for="item in data.lists.data" @click="goto('/pages/people/show/index?id='+item.id,1)">
							<image class="cover" :src="item.headerPic" mode="aspectFill"></image>
							<view class="txt">
								<view class="name nowrap">{{item.name}}</view>
								<view class="data"><text class="Arial">{{item.userInfo.age}}</text>岁•<text class="Arial">{{item.userInfo.height}}cm</text></view>
							</view>
							<view class="bg"></view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="TopNav">
				<scroll-view scroll-x="true">
					<view class="liNav" :class="showNav == 1?'cur':''" @click="showNav=1">
						<text class="ANav">推荐</text>
					</view>
					<view class="liNav" :class="showNav == 2?'cur':''" @click="showNav=2">
						<text class="ANav">同城</text>
					</view>
					<view class="liNav" :class="showNav == 3?'cur':''" @click="showNav=3">
						<text class="ANav">新人</text>
					</view>
				</scroll-view>
			</view>
			<view class="infoGroup" v-if="showNav==1">
				<peopleLists :data="data.lists2.data" @thumb="thumb3" v-if="listsShow" :ad="data.ad2"></peopleLists>
				<!-- <view class="bg-f ptb15 text-center fs-14 fc-3" @click="goto('/pages/demand/index/main',2)">点击查看更多</view> -->
			</view>
			<view v-if="showNav==2">
				<cardLists :lists="data.lists.data" :data="data" myclass="index-card"></cardLists>
			</view>
			<view class="copyright" @click="phone('13318639080')">技术合作：广东科阅云</view>
		</view>
		<selectCity ref="selectCity" title="请选择配送区域" :OFFicon="true" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
		<dx-diag :tbPadding="0" :lrPadding="0" v-if="data.diag" ref="diag">
		　　<view @click="goto(data.diag.url,1)">
				<image class="w-b100 flex bdr6" :src="getSiteName+'/upload/images/disAd/800_'+ data.diag.poster_cover" mode="widthFix" v-if="data.diag.poster_cover"></image>
				<image class="w-b100 flex bdr6" :src="getSiteName+'/upload/images/poster/800_'+ data.diag.pic" mode="widthFix" v-if="data.diag.pic"></image>
		　　</view>
		</dx-diag>
	</view>
</template>
<style>
@import "./index.css";
</style>
<script>
	import marque from "xiaozhu/uniapp/components/marque";
	import productLists from "@/components/productLists";
	import figureLists from "@/components/figureLists";
	import THeader from '@/components/THeader';
	import businessLists from '@/components/business_lists';
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import selectCity from "@/components/selectCity.vue"
	import dxDiag from "doxinui/components/diag/diag"
	import cardLists from "@/components/cardLists"
	import peopleLists from "@/components/peopleLists"
	export default {
		components: {marque,productLists,figureLists,dxNavClass,businessLists,selectCity,dxDiag,THeader,cardLists,peopleLists},
		data() {
			return {
				formAction: '/shop/wapindex2',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				waterCityData:'',
				ruleform:{province:'广东省'},
				provinceArr:[],
				townArr:[],
				cityArr:[],
				areaArr:[],
				vaildate:{},
				listsShow:false,
				showType:0,
				showNav: 1,
				city:'',
				tabs: [
					{value: 0,name: "最新消息"},
					//{value: 1,name: "热门"},
				],
				otherData: {
					ANavType: 0,
					searchVal: ''
				},
				childrenKey:0,
				childrenShow:false,
				children:[],
				lists:[
					{
						headerPic:'/static/fenxiaobg.jpg',
						nickname:'',
						isSubscribe: 0,
						userInfo:{
							company_logo:'',
							name:'东信梅',
							position:'普通员工',
							company_name:'江门市东信科技有限公司',
						}
					},
					{
						headerPic:'/static/image/E01.png',
						nickname:'',
						isSubscribe: '',
						userInfo:{
							company_logo:'',
							name:'东信梅',
							position:'普通员工',
							company_name:'江门市东信科技有限公司',
						}
					}
				]
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
			return this.shareSource(this, '找人脉，找服务，选到数字名片',"notshare");
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
			this.getMyAddress(this,msg=>{
				this.ajax();
			})
			
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
				if(!this.waterCityData)this.waterCityData = uni.getStorageSync("waterCityData");
				this.getAjax(this,{showType:this.showType}).then(msg => {
					this.listsShow = true;
					if(this.data.nextPage == 1){
						this.$refs.diag.thisDiag  = true;
					}
					
				});
			},
			classNav(v){
				return this.goto(v.url,1);
				v.key = parseInt(v.key);
				this.childrenShow = false
				this.childrenKey = v.key
				setTimeout(()=>{
					this.childrenShow = true;
					this.children = this.data.location[v.key].children;
				},300);
				
				//this.$refs.text.data = this.children;
			},
			childrenNav(v){
				//console.log(v)
				if(v.name == '桶装水城'){
					return this.goto('/pages/water-mall/main',2)	
				}else{
					return this.goto(v.url,1);
				}
				
			},
		},
	}
</script>
