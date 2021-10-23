<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="bg-f add-input">
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="电话" type="text" name="phone"></weui-input>
				<weui-input v-model="ruleform.remark" myclass="textarea" label="描述" type="textarea" name="remark" datatype="require"></weui-input>
				<view class="fs-16 fc-red pb10">（申请红娘需要支付10000元）</view>
			</view>
			<!-- <dxftButton type="primary" size="lg" @click="goto('/pages/distribution/add/payed',1)">提交</dxftButton> -->
			<dxftButton type="primary" size="lg" @click="formSubmit()">提交</dxftButton>
		</view>
	</view>
</template>
<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/add-dis.html',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
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
			this.ajax();
		},
		methods: {
			formSubmitForH5(){
				this.payUniapp(this.config,msg=>{
					this.goto("/pages/distribution/add/payed");
				});
			},
			formSubmit: function(e) {
				this.vaildForm(this, res => {
					if (res) {
						
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								//this.goto('/pages/distribution/index/main');
								this.config = msg.data.config;
								this.formSubmitForH5();
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

<style scoped="">
@import "./index.css";
</style>