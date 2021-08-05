<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<div class="bg-f">
				<view id="add_table">
					<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
					<weui-input v-model="ruleform.phone" label="电话" type="text" name="phone" datatype="require|phone"></weui-input>
					<!-- <dxAddress v-model="ruleform.address" datatype="require" ref="address"></dxAddress> -->
					
					<view :class="['dx-cell','dx-select']" @click="openCity">
						<view class="dx-cell_hd">
							<slot name="left" />
							<view class="dx-label">城市<span class="star">*</span></view>
						</view>
						<view class="dx-cell_bd">
							<div>
								{{ruleform.city2 ? ruleform.city2 : '请选择所在区域'}}
							</div>
						</view>
						<view class="dx-cell_ft dx_ft-access"></view>
					</view>
					<weui-input v-model="ruleform.address" label="地址" type="text" name="address" datatype="require" @callback="locationRes"></weui-input>
					<weui-input v-model="ruleform.default" label="默认" type="switch" name="default"></weui-input>
				</view>
				<view id="footer-btn">
					<myform class="w-b100" :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f-dx-btn dx-btn-orange w-b100"></myform>
				</view>
			</div>
			<!-- 地址列表 -->
		</view>
		<selectCity ref="selectCity" title="请选择所在区域" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
	</view>
</template>
<style scoped="">
@import url("xiaozhu/uniapp/font/globalFont.css");
@import url("xiaozhu/css/dx-input.css"); 
</style>
<script>
	import dxAddress from "xiaozhu/uniapp/components/addressAndCity";
	import selectCity from "@/components/selectCity.vue"
	import "./index.css";
	export default {
		components:{
			dxAddress,selectCity
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				ruleform: {
					default: false,
					address: '',
					city2:'',
				},
				vaildate: {},
				getSiteName: this.getSiteName(),
				townArr:[],
				cityArr:[],
				areaArr:[],
				provinceArr:[],
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.formAction = '/shop/user/address-edit';
				this.ajax();
			} else {
				this.formAction = '/shop/user/address-add';
				this.data.show = true;
				if(	uni.getStorageSync("waterCityData")){
					this.ruleform.province = uni.getStorageSync("waterCityData").province;
					this.ruleform.city = uni.getStorageSync("waterCityData").city;
					this.ruleform.town = uni.getStorageSync("waterCityData").town;
					this.ruleform.area = uni.getStorageSync("waterCityData").area;
					this.$set(this.ruleform,"city2",uni.getStorageSync("waterCityData").province+','+ uni.getStorageSync("waterCityData").city+','+ uni.getStorageSync("waterCityData").town+',' + uni.getStorageSync("waterCityData").area);
				}else{
					this.ruleform.province = '广东省';
				}
			}
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(this);
				query.select('#add_table').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				}).exec();
			},5000)
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.detail;
					this.$set(this.ruleform, 'address', this.ruleform.address);
					if(	uni.getStorageSync("waterCityData")){
						this.ruleform.province = uni.getStorageSync("waterCityData").province;
						this.ruleform.city = uni.getStorageSync("waterCityData").city;
						this.ruleform.town = uni.getStorageSync("waterCityData").town;
						this.ruleform.area = uni.getStorageSync("waterCityData").area;
						this.$set(this.ruleform,"city2",uni.getStorageSync("waterCityData").province+','+ uni.getStorageSync("waterCityData").city+','+ uni.getStorageSync("waterCityData").town+',' + uni.getStorageSync("waterCityData").area);
					}else{
						this.ruleform.province = '广东省';
					}
					
					
				});
			},
			openCity(){
				this.$refs.selectCity.init();
			},
			cityCallBack(item){
				uni.setStorageSync("waterCityData",item);
				uni.setStorageSync("waterCity",item.province + item.city+ item.town + item.area);
				//this.ajax();
				//this.waterCityData = item;
				//this.ruleform.city2 = item.province+','+ item.city+','+ item.town+',' + item.area
				this.$set(this.ruleform,"city2",item.province+','+ item.city+','+ item.town+',' + item.area);
			},
			locationRes(res) {
				console.log(res);
				this.ruleform.location_x = res.latitude;
				this.ruleform.location_y = res.longitude;
				this.ruleform.address = res.address;
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=' +
						'LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&get_poi=1',
					success: res2 => {
						this.ruleform.city = res2.data.result.address_component.city;
					}
				});
			},
			formSubmit(e) {
				this.vaildForm(this, res => {
					if (res) {
						if (!this.ruleform.address) {
							this.getError('地址还没有添加');
							return false;
						}
						if(!this.ruleform.area){
							return this.getError('请选择城市');
						}
						this.ruleform.county  = this.ruleform.town + this.ruleform.area;
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								let packageId = wx.getStorageSync('package');
								if (packageId) {
									this.goto("/pages/package/left_num/main?id=" + packageId);
								}
								let order_no = wx.getStorageSync('order_no')+'';
								if (order_no) {
									if(order_no.indexOf('b')!=-1){
										this.goto("/pages/package/order/buy/main?order_no=" + order_no);
									}else{
										this.goto("/pages/order/buy/main?order_no=" + order_no);
									}
									
									
								} else {
									this.goto("/pages/user/address/lists/main?order_no=" + order_no);
								}
							}
						});
					}
				})

			},
		}
	}
</script>
