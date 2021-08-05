<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="show">
			<cardTemplate :type="ruleform.card_style_type" :ruleform="data.user"></cardTemplate>
			<view class="block-sec edit-write mt5">
				<view @click="uploadHeaderImg">
					<weui-input v-model="ruleform.pic" label="头像" type="txt" name="header" myclass="headerPic" >
						<view slot="right" class="slot-right flex1 flex-between flex-middle">
							<image :src="ruleform.pic" class="img"></image>
							<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
						</view>
					</weui-input>
				</view>
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.header" label="名片样式" type="txt" name="header" myclass="cardTemplate">
					<view slot="right" class="slot-right flex1 flex-middle" @click="goto('/pages/user/card/template/index',1)">
						<image src="https://card.doxinsoft.com/images/wap/cardMode-06.jpg" class="img" mode="widthFix" v-if="ruleform.card_style_type==1"></image>
						<image src="https://card.doxinsoft.com/images/wap/cardMode-02.jpg" class="img" mode="widthFix" v-if="ruleform.card_style_type==2"></image>
						<image src="https://card.doxinsoft.com/images/wap/cardMode-01.jpg" class="img" mode="widthFix" v-if="ruleform.card_style_type==3"></image>
						<view class="flex1 text-right pr15 fs-15 main-color">更换名片样式</view>
						<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
					</view>
				</weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">联系信息</view>
				<weui-input v-model="ruleform.phone" label="手机" type="number" name="phone" datatype="require"></weui-input>
				<weui-input v-model="ruleform.email" label="邮箱" type="text" name="email"></weui-input>
				<weui-input v-model="ruleform.wechat" label="微信号" type="text" name="wechat"></weui-input>
				<dxAddress v-model="ruleform.address2" labeltxt="所在区域" datatype="require" ref="address" addressHidden left></dxAddress>
				<weui-input v-model="ruleform.address" label="地址" type="location" name="address" datatype="require" navClass="dx-btn-blue" @callback="location"></weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">公司信息</view>
				<weui-input v-model="ruleform.company_name" label="公司" type="text" name="company_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.position" label="职位" type="text" name="position"></weui-input>
				<weui-input v-model="ruleform.industry" label="行业" name="industry" type="manyselect" dataKey="industryData"
				 changeField="value" datatype="require"></weui-input>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">
					<text>业务介绍</text>
					<text class="main-color edit-nav" v-if="ruleform.remark.length || ruleform.remark_pic.length"
					 @click="goto('/pages/user/card/edit/layouts/intro?type=personal',1)">编辑</text>
				</view>
				<!-- 添加内容后显示 -->
				<view class="detail-info" v-if="ruleform.remark.length || ruleform.remark_pic.length">
					<view class="content" v-if="ruleform.remark">{{ruleform.remark}}</view>
					<image class="w-b100" :src="getSiteName + '/upload/images/user/800_'+cover" v-for="cover in ruleform.remark_pic" mode="widthFix"></image>
				</view>
				<!-- 添加内容前显示 -->
				<view class="add-info" @click="goto('/pages/user/card/edit/layouts/intro?type=personal',1)" v-else>
					<view class="main-color fs-16">+添加业务介绍</view>
					<view class="fs-14 fc-6">让客户更好的了解你</view>
				</view>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">
					<text>公司简介</text>
					<text class="main-color edit-nav" v-if="ruleform.remark_company.length || ruleform.remark_pic_company.length"
					 @click="goto('/pages/user/card/edit/layouts/intro?type=company',1)">编辑</text>
				</view>
				<!-- 添加内容后显示 -->
				<view class="detail-info" v-if="ruleform.remark_company.length || ruleform.remark_pic_company.length">
					<view class="content" v-if="ruleform.remark_company">{{ruleform.remark_company}}</view>
					<image class="w-b100" :src="getSiteName + '/upload/images/user/800_'+cover" v-for="cover in ruleform.remark_pic_company" mode="widthFix"></image>
				</view>
				<!-- 添加内容前显示 -->
				<view class="add-info" @click="goto('/pages/user/card/edit/layouts/intro?type=company',1)" v-else>
					<view class="main-color fs-16">+添加公司简介</view>
					<view class="fs-14 fc-6">让客户更好的了解你</view>
				</view>
			</view>
			<dxftButton type="primary" size="lg" round @click="submit()">保存</dxftButton>
		</view>
	</view>
</template>

<script>
	import cardTemplate from '@/components/cardTemplate'
	import dxftButton from "doxinui/components/button/footer-button"
	import dxImages from "doxinui/components/images/images"
	export default {
		components:{cardTemplate,dxftButton,dxImages},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{address:''},
				show:false,
				vaildate:{},
				areaData: [{
					label: '江门市',
					value: 1,
					children: [
						{label: '蓬江区',value: '蓬江区'},
						{label: '新会区',value: '新会区'},
						{label: '江海区',value: '江海区'},
						{label: '鹤山市',value: '鹤山市'},
						{label: '开平市',value: '开平市'},
						{label: '台山市',value: '台山市'},
					]
				}, {
					label: '广州',
					value: 2,
					children: [
						{label: '越秀区',value: '7'},
						{label: '荔湾区',value: '8'},
						{label: '增城区',value: '9'},
						{label: '海珠区',value: '10'},
					]
				}],
				industryData: [{
					label: '服务类',
					value: '服务类',
					children: [
						{label: '工商财税法律',value: '工商财税法律'},
						{label: '咨询管理',value: '咨询管理'},
						{label: '数据信息',value: '数据信息'},
						{label: '人力资源',value: '人力资源'},
						{label: '电商营销',value: '电商营销'},
						{label: '医疗健康',value: '医疗健康'},
					]
				}, {
					label: '产品类',
					value: '产品类',
					children: [
						{label: '电子电工',value: '7'},
						{label: '五金管材',value: '8'},
						{label: '家电日用',value: '9'},
						{label: '机械设备',value: '10'},
					]
				}],
			}
		},
		mounted() {
		
		},
		methods: {
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
			getThisAddress(res, canUpdate) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=' +
						'LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&get_poi=1',
					success: res2 => {
						console.log(res2);
						if (!this.ruleform.address || canUpdate) {
							//this.getError("ok")
							this.ruleform.location_x = res.latitude;
							this.ruleform.location_y = res.longitude;
							this.ruleform.address = res2.data.result.address;
							this.ruleform.city = res2.data.result.address_component.city;
							console.log(res2.data.result.address_component.city)
							console.log(1)
						}
					},
					fail:res2=>{
						this.getError(JSON.stringify(res2));
					}
				});
			},
			location(res) {
				console.log(res);
				this.ruleform.location_x = res.latitude;
				this.ruleform.location_y = res.longitude;
			},
			uploadHeaderImg() {
				this.updateHeadImg(res => {
					this.ruleform.pic = res;
					console.log(this.ruleform.pic);
					
				});
			},
			submit(){
				this.ruleform.province = this.$refs.address.lotusAddressData.provinceName;
				this.ruleform.city = this.$refs.address.lotusAddressData.cityName;
				this.ruleform.country = this.$refs.address.lotusAddressData.townName;
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							 this.goto("/pages/user/index/main",2);
						});
					}
				})
				
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): [],
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): [],
					this.industryData = msg.industryArr;
					if(this.ruleform.province){
						this.$set(this.ruleform,"address2",this.ruleform.province+this.ruleform.city+this.ruleform.country);
					}
					if(!this.ruleform.address){
						wx.getLocation({
							type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							altitude:true,
							success: res => {
								console.log(res);
								this.getThisAddress(res, true);
							},
							fail: res => {
						
							},
							cancel: res => {
						
							}
						});
					}
					this.show = true;
					
				});
			},
			
		},
		onLoad(options) {
			this.ajax();
		},
		onShow(){
			this.onShow(this);
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import "./index.css";
</style>