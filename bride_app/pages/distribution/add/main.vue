<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="container" v-if="data.show">
			<!-- <view class="header-bg">
				<image :src="getSiteName+'images/site/fenxiaobg-02.jpg'" class="flex" mode="widthFix" />
			</view> -->
			<view class="template" v-if="data.can_add">
				<view class="not-add" v-if="data.passing">
					<view class="not-add2">
						<view class="p">您的申请已经提交，请等待审核，谢谢!</view>
						<navigator class="a" @click="goto('/pages/user/index/main',2)">
							<button type="button" hover-class="none" class="dx-btn-big dx-btn-red">
								<text class="iconfont icon-car2"></text> 返回</button>
						</navigator>
					</view>
				</view>
				<view v-else>
					<form @submit="formSubmit" report-submit='true'>
						<view class="validform_ajax">
							<view class="list-group">
								<view class="list-group-item">
									<view class="value">填写真实信息，成为我们的合作伙伴！</view>
								</view>
								<view class="list-group-item">
									<view class="value">
										<input type="text" placeholder="请填写您的姓名" class="form-control" v-model.lazy="ruleform.name" />
									</view>
								</view>
								<view class="list-group-item">
									<view class="value">
										<input type="text" placeholder="请填写您的手机号码" class="form-control" v-model.lazy="ruleform.phone" />
									</view>
								</view>
								<!-- <view class="dx-cell dx-select select-item" @click="openCity">
									<view class="dx-cell_bd">
										{{ruleform.city2 ? ruleform.city2 : '请选择所在区域'}}
									</view>
									<view class="dx-cell_ft dx_ft-access"></view>
								</view> -->
								<view class="list-group-item">
									<button hover-class="none" class="dx-btn-big dx-btn-red" form-type="submit">提交</button>
								</view>
							</view>
						</view>
					</form>
				</view>
			</view>
			<view class="template" v-else>
				<view class="not-add">
					<view class="not-add2">
						<view class="p">本店累计消费
							<text>{{data.candis}}</text>元，才可成为商家，您已消费
							<text>{{data.order_sum}}</text>元，请继续努力。</view>
						<navigator class="a" @click="goto('/pages/user/index/main',2)">
							<button type="button" hover-class="none" class="dx-btn-big dx-btn-red">
								<text class="iconfont icon-car2"></text> 返回</button>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<selectCity ref="selectCity" title="请选择所在区域" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
	</view>
</template>
<style scoped="">
@import url("xiaozhu/uniapp/font/globalFont.css");
@import url("xiaozhu/css/dx-input.css"); 
</style>
<script>
	import "./index.css";
	import selectCity from "@/components/selectCity.vue"
	export default {
		components:{selectCity},
		data() {
			return {
				formAction: '/add-dis.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {
					phone: '',
					name: '',
					city2:'',
				},
				vaildate: { /*验证规则，目前支前有，require|phone|integer|price*/
					phone: {
						name: '电话',
						vaild: 'require|phone',
						errorMessage:'电话'
					},
					name: {
						name: '姓名',
						vaild: 'require',
						errorMessage:'姓名'
					},
				},
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
			if(	uni.getStorageSync("waterCityData")){
				this.ruleform.province = uni.getStorageSync("waterCityData").province;
				this.ruleform.city = uni.getStorageSync("waterCityData").city;
				this.ruleform.town = uni.getStorageSync("waterCityData").town;
				this.ruleform.area = uni.getStorageSync("waterCityData").area;
				this.$set(this.ruleform,"city2",uni.getStorageSync("waterCityData").province+','+ uni.getStorageSync("waterCityData").city+','+ uni.getStorageSync("waterCityData").town+',' + uni.getStorageSync("waterCityData").area);
			}else{
				this.ruleform.province = '广东省';
			}
			this.ajax();
		},
		methods: {
			formSubmit: function(e) {
				// if(!this.ruleform.area){
				// 	return this.getError('请选择城市');
				// }
				this.vaildForm(this, res => {
					if (res) {
						this.ruleform.formId = e.mp.detail.formId;
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								this.goto('/pages/distribution/index/main');
							}
						});
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
			ajax() {
				this.getAjax(this).then(msg => {
					  if(msg.user.userInfo.name){
							this.ruleform.name = msg.user.userInfo.name;
							this.ruleform.phone = msg.user.userInfo.phone;
					  }
				});
			}
		}
	}
</script>
