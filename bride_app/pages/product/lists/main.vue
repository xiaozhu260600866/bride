<template>
	<view class="container">
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<view class="tui-header-box">
				<view class="tui-header" style="width: 100%;height: 88upx">
					<view class="tui-searchbox tui-search-mr" style="margin-top: 7px;" @tap="search">
						<icon type="search" :size='13' color='#999'></icon>
						<text class="tui-search-text" v-if="!ruleform.content">搜索商品</text>
						<view class="tui-search-key" v-if="ruleform.content ">
							<view class="tui-key-text">{{ruleform.content}}</view>
							<tui-icon name="shut" :size='12' color='#fff'></tui-icon>
						</view>
					</view>
				</view>
			</view>
			<!--header-->
			<!--screen-->
			<!-- <view class="tui-header-screen" style="top: 88upx;">
				<view class="tui-screen-top">
					<view class="tui-top-item tui-icon-ml" :class="[tabIndex==0?'tui-active tui-bold':'']" data-index="0" @tap="screen">
						<view>{{selectedName}}</view>
						<tui-icon :name="selectH>0?'arrowup':'arrowdown'" :size="14" :color="tabIndex==0?'#e41f19':'#444'" tui-icon-class="tui-ml"></tui-icon>
					</view>
					<view class="tui-top-item tui-icon-ml" :class="[tabIndex==1?'tui-active tui-bold':'']" data-index="1" @tap="screen">
						<view>{{selectedName2}}</view>
					</view>
					<view class="tui-top-item tui-icon-ml" :class="[tabIndex==2?'tui-active tui-bold':'']" data-index="2" @tap="screen">
						<view>{{selectedName3}}</view>
					</view>
					<view class="tui-dropdownlist" :class="[selectH>0?'tui-dropdownlist-show':'']" :style="{height:px(selectH)}">
						<view class="tui-dropdownlist-item tui-icon-middle" :class="[item.selected?'tui-bold':'']" v-for="(item,index) in dropdownList[tabIndex]"
						 :key="index" @tap.stop="dropdownItem" :data-index="index">
							<text class="tui-ml tui-middle">{{item.name}}</text>
							<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected" tui-icon-class="tui-middle"></tui-icon>
						</view>

					</view>
					<view class="tui-dropdownlist-mask" :class="[selectH>0?'tui-mask-show':'']" @tap.stop="hideDropdownList"></view>
				</view>
			</view> -->
			<!--screen-->
			<view class="swiper-banner">
				<myswiper :data="swiper"></myswiper>
			</view>
			<productLists :data="data" type="1"></productLists><!-- :style="{marginTop:px(dropScreenH-155)}" -->

			<!--顶部下拉筛选弹层 属性-->
			<tui-top-dropdown bgcolor="#f7f7f7" :show="dropScreenShow" :paddingbtm="110" :translatey="dropScreenH"
				@close="btnCloseDrop">
				<scroll-view class="tui-scroll-box" scroll-y :scroll-top="scrollTop">
					<view class="tui-seizeaseat-20"></view>
					<view class="tui-drop-item tui-icon-middle" :class="[item.selected?'tui-bold':'']"
						v-for="(item,index) in attrData" :key="index" @tap.stop="btnSelected" :data-index="index">
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"
							tui-icon-class="tui-middle"></tui-icon>
						<text class="tui-ml tui-middle">{{item.name}}</text>
					</view>
					<view class="tui-seizeaseat-30"></view>
				</scroll-view>
				<view class="tui-drop-btnbox">
					<view class="tui-drop-btn tui-btn-white" hover-class="tui-white-hover" :hover-stay-time="150"
						@tap="reset">重置</view>
					<view class="tui-drop-btn tui-btn-red" hover-class="tui-red-hover" :hover-stay-time="150"
						@tap="btnSure">确定</view>
				</view>
			</tui-top-dropdown>
			<!---顶部下拉筛选弹层 属性-->
			<!--加载loadding-->
			<hasMore :parentData="data"></hasMore>
			<!--加载loadding-->

		</div>
		<selectCity ref="selectCity" title="请选择配送区域" :OFFicon="true" :ruleform="ruleform" :townArr="townArr"
			:cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
	</view>
</template>

<script>
	import "./index.css";
	import tuiIcon from "xiaozhu/uniapp/thorui/components/icon/icon"
	import tuiDrawer from "xiaozhu/uniapp/thorui/components/drawer/drawer"
	import tuiLoadmore from "xiaozhu/uniapp/thorui/components/loadmore/loadmore"
	import tuiNomore from "xiaozhu/uniapp/thorui/components/nomore/nomore"
	import tuiTopDropdown from "xiaozhu/uniapp/thorui/components/top-dropdown/top-dropdown"
	import productLists from "@/components/productLists";
	import selectCity from "@/components/selectCity.vue"
	export default {
		components: {
			tuiIcon,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore,
			tuiTopDropdown,
			productLists,
			selectCity
		},
		data() {
			return {
				mpType: 'page', //用来分清父和子组件
				formAction: '/shop/product/lists',
				siteName: this.getSiteName(),
				data: this.formatData(this),
				vaildate: {},
				provinceArr: [],
				townArr: [],
				cityArr: [],
				areaArr: [],
				swiper: [],
				ruleform: {
					province: '广东省',
					content: ''
				},
				searchKey: "", //搜索关键词
				width: 200, //header宽度
				height: 64, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				dropScreenH: 0, //下拉筛选框距顶部距离,
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false,
				scrollTop: 0,
				orderBy: "id",
				tabIndex: 0, //顶部筛选索引
				isList: false, //是否以列表展示  | 列表或大图
				drawer: false,
				drawerH: 0, //抽屉内部scrollview高度
				selectedName: "综合",
				selectedName2: '销量',
				selectedName3: '新品',
				waterCityData: {},
				selectH: 0,
				dropdownList: [
					[{
						name: "综合",
						selected: true,
						orderByPrice: '',
					}, {
						name: "价格升序",
						selected: false,
						orderByPrice: 'desc',
					}, {
						name: "价格降序",
						selected: false,
						orderByPrice: 'asc',
					}],
					[{
						name: "综合",
						selected: true,
						orderBySelfNum: '',
					}, {
						name: "销售升序",
						selected: false,
						orderBySelfNum: 'desc',
					}, {
						name: "销售降序",
						selected: false,
						orderBySelfNum: 'asc',
					}],
					[{
						name: "综合",
						selected: true,
						orderByIsnew: '',
					}, {
						name: "新品升序",
						selected: false,
						orderByIsnew: 'desc',
					}, {
						name: "新品降序",
						selected: false,
						orderByIsnew: 'asc',
					}]

				],
				attrArr: [],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true
			}
		},
		onLoad: function(options) {

			let fclass = -1;
			if (options.id) {
				this.fclassForIndex = options.id;
			}
			if (options.fclass) {
				this.fclassForIndex = options.fclass;
			}
			if (options.name) {
				this.ruleform.content = options.name;

			}
			console.log(2);
			this.ajax();

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
					this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight +
					7);
					this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight +
					6);
					this.searchKey = options.searchKey || "";
					//略小，避免误差带来的影响
					this.dropScreenH = this.height * 750 / res.windowWidth + 186;
					this.drawerH = res.windowHeight - uni.upx2px(100) - this.height
				}
			})
		},
		methods: {
			cityCallBack(item) {
				uni.setStorageSync("waterCityData", item);
				uni.setStorageSync("waterCity", item.province + item.city + item.town + item.area);
				this.ajax();
				this.waterCityData = item;
				console.log(item);
			},
			ajax() {

				if (!this.waterCityData) this.waterCityData = uni.getStorageSync("waterCityData");
				this.setTitle("全部");
				if (this.ruleform.content) {
					this.fclassForIndex = -1;
				}
				this.getAjax(this, {
					fclassForIndex: this.fclassForIndex,
					name: this.name,
					name: this.ruleform.content
				}).then(msg => {
					let options = this.data.query;
					if (msg.class && msg.class.cover2) {
						let coverArr = msg.class.cover2.split(",");
						for (let i = 0; i < coverArr.length; i++) {
							this.swiper.push({
								cover: this.getSiteName() + "/upload/images/product/800_" + coverArr[i]
							})
						}
					}
					if (options.id) {
						this.data.productClass.forEach((v, i) => {
							if (v.children) {
								v.children.forEach((v1, i1) => {
									if (v1.value == options.id) {
										this.actIndex = i;
										this.actChildIndex = i1;
										//this.title = v1.label;
										this.setTitle(v1.label);
									}
								});
							}
						});
					}
					if (options.fclass) {
						this.data.productClass.forEach((v, i) => {
							if (v.value == options.fclass) {
								this.actIndex = i;
								this.actChildIndex = -1;
								//this.title = v.label;
								this.setTitle(v.label);
							}
						});
					}
					if (this.$store.state.mutations.fclass) {
						this.data.productClass.forEach((v, i) => {
							if (v.value == this.$store.state.mutations.fclass) {
								this.actIndex = i;
								this.actChildIndex = -1;
								//this.title = v.label;
								this.setTitle(v.label);
							}
						});
					}
					if (this.fclassForIndex == 0) {
						this.setTitle("全部");
					}
				});


			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			btnDropChange: function(e) {
				let index = e.currentTarget.dataset.index;
				let arr = JSON.parse(JSON.stringify(this.attrArr[index].list));
				if (arr.length === 0) {
					this.$set(this.attrArr[index], "isActive", !this.attrArr[index].isActive)
				} else {
					this.attrData = arr;
					this.attrIndex = index;
					this.dropScreenShow = true;
					this.$set(this.attrArr[index], "isActive", false);
					this.scrollTop = 1;
					this.$nextTick(() => {
						this.scrollTop = 0
					});
				}
			},
			btnSelected: function(e) {
				let index = e.currentTarget.dataset.index;
				this.$set(this.attrData[index], "selected", !this.attrData[index].selected)
			},
			reset() {
				let arr = this.attrData;
				for (let item of arr) {
					item.selected = false;
				}
				this.attrData = arr
			},
			btnCloseDrop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				this.dropScreenShow = false;
				this.attrIndex = -1
			},
			btnSure: function() {
				let index = this.attrIndex;
				let arr = this.attrData;
				let active = false;
				let attrName = "";
				//这里只是为了展示选中效果,并非实际场景
				for (let item of arr) {
					if (item.selected) {
						active = true;
						attrName += attrName ? ";" + item.name : item.name
					}
				}
				let obj = this.attrArr[index];
				this.btnCloseDrop();
				this.$set(obj, "isActive", active);
				this.$set(obj, "selectedName", attrName);
			},
			showDropdownList: function(index) {
				this.selectH = 246;
				this.tabIndex = index;

			},
			hideDropdownList: function() {
				this.selectH = 0
			},
			dropdownItem: function(e) {

				let index = e.currentTarget.dataset.index;
				let arr = this.dropdownList[this.tabIndex];
				console.log(arr);
				for (let i = 0; i < arr.length; i++) {
					if (i == index) {
						arr[i].selected = true;
					} else {
						arr[i].selected = false;
					}
				}
				console.log(arr);
				this.dropdownList[this.tabIndex] = arr;

				if (this.tabIndex == 0) this.selectedName = index == 0 ? '综合' : '价格';
				if (this.tabIndex == 1) this.selectedName = index == 0 ? '综合' : '销量';
				if (this.tabIndex == 2) this.selectedName = index == 0 ? '综合' : '新品';
				this.selectH = 0;
				for (let i in this.dropdownList[this.tabIndex][index]) {
					if (i.indexOf("orderBy") != -1) {
						this.$mp.query[i] = this.dropdownList[this.tabIndex][index][i];
					}
				}
				console.log(this.dropdownList);
				this.ajax();
			},
			screen: function(e) {
				let index = e.currentTarget.dataset.index;
				this.tabIndex = index;
				if (index == 0) {
					this.$mp.query.orderByIsnew = "";
					this.$mp.query.orderBySelfNum = "";
					this.showDropdownList(index);
				} else if (index == 1) {
					this.$mp.query.orderBySelfNum = "desc";
					this.$mp.query.orderByIsnew = "";
					this.$mp.query.orderByPrice = "";
					this.ajax();
				} else if (index == 2) {
					this.$mp.query.orderByIsnew = "desc";
					this.$mp.query.orderBySelfNum = "";
					this.$mp.query.orderByPrice = "";
					this.ajax();
				}
			},
			closeDrawer: function() {
				this.drawer = false
			},
			back: function() {
				if (this.drawer) {
					this.closeDrawer()
				} else {
					uni.navigateBack()
				}
			},
			search: function() {
				this.goto('/pages/search/product/main', 1);
			},
			detail: function() {
				uni.navigateTo({
					url: '../productDetail/productDetail'
				})
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		}
	}
</script>
