<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="block-sec edit-write mt5">
				
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">联系信息</view>
				<view @click="uploadHeaderImg">
					<weui-input v-model="ruleform.pic" label="头像" type="txt" name="header" myclass="headerPic" >
						<view slot="right" class="slot-right flex1 flex-between flex-middle">
							<image :src="ruleform.pic" class="img"></image>
							<view class="dxi-icon dxi-icon-right fs-12 fc-9"></view>
						</view>
					</weui-input>
				</view>
				<weui-input v-model="ruleform.name" label="姓名" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.phone" label="手机" type="number" name="phone" datatype="require"></weui-input>
				<!-- <weui-input v-model="ruleform.email" label="邮箱" type="text" name="email"></weui-input> -->
				<weui-input v-model="ruleform.wechat" label="微信号" type="text" name="wechat"></weui-input>
				<!--<dxAddress v-model="ruleform.address2" labeltxt="所在区域" datatype="require" ref="address" addressHidden left></dxAddress>
				 <weui-input v-model="ruleform.address" label="地址" type="location" name="address" datatype="require" navClass="dx-btn-blue" @callback="location"></weui-input> -->
				<dx-address v-model="ruleform.address" labeltxt="工作生活在" addressHidden left></dx-address>
			</view>
			<view class="block-sec edit-write">
				<view class="edit-write-title">
					<text>个人独白</text>
					<text class="main-color edit-nav" v-if="ruleform.remark"
					 @click="goto('/pages/user/card/edit/layouts/intro?type=personal',1)">编辑</text>
				</view>
				<!-- 添加内容后显示 -->
				<view class="detail-info" v-if="ruleform.remark">
					<view class="content" v-if="ruleform.remark">{{ruleform.remark}}</view>
				</view>
				<!-- 添加内容前显示 -->
				<view class="add-info" @click="goto('/pages/user/card/edit/layouts/intro?type=personal',1)" v-else>
					<view class="main-color fs-16">+添加个人独白</view>
					<view class="fs-14 fc-6">让别人更好的了解你</view>
				</view>
			</view>
			
			<view class="block-sec edit-write">
				<block v-if="ruleform.age">
					<view class="edit-write-title">
						<text>基础信息</text>
						<text class="main-color edit-nav" @click="goto('/pages/user/card/edit/layouts/info',1)">编辑</text>
					</view>
					<view class="tag-group pl12">
						<view class="tag" v-if="ruleform.sex">{{ ruleform.sex==0?'男':'女' }}</view>
						<view class="tag" v-if="ruleform.age"><text class="Arial">{{ ruleform.age }}</text>岁</view>
						<view class="tag" v-if="ruleform.address">{{ ruleform.address }}</view>
						<view class="tag" v-if="ruleform.education">{{ ruleform.education }}</view>
						<view class="tag Arial" v-if="ruleform.height">{{ ruleform.height }}</view>
						<view class="tag" v-if="ruleform.profession">{{ ruleform.profession }}</view>
						<view class="tag" v-if="ruleform.salary"><text class="Arial">{{ ruleform.salary }}</text>元</view>
						<view class="tag" v-if="ruleform.marriage">{{ ruleform.marriage }}</view>
					</view>
				</block>
				<view class="edit-select" @click="goto('/pages/user/card/edit/layouts/info',1)" v-else>
					<weui-input v-model="ruleform.info" label="基础信息" placeholder="请选择" type="emptySelect" name="info"></weui-input>
				</view>
			</view>
			
			<view class="block-sec edit-write">
				<block v-if="ruleform.marry_condition">
					<view class="edit-write-title">
						<text>择偶条件</text>
						<text class="main-color edit-nav" @click="goto('/pages/user/card/edit/layouts/condition',1)">编辑</text>
					</view>
					<view class="tag-group pl12">
						<view class="tag" v-for="item in ruleform.marry_condition" v-if="item">{{ item }}</view>
					</view>
				</block>
				<view class="edit-select" @click="goto('/pages/user/card/edit/layouts/condition',1)" v-else>
					<weui-input v-model="ruleform.condition" label="择偶条件" placeholder="请选择" type="emptySelect" name="condition"></weui-input>
				</view>
				
			</view>
	

			<view class="block-sec edit-write">
				<block v-if="hobbyTags.length">
					<view class="edit-write-title">
						<text>兴趣爱好</text>
						<text class="main-color edit-nav" @click="goto('/pages/user/card/edit/layouts/hobby',1)">编辑</text>
					</view>
					<view class="tag-group pl12">
						<view class="tag" v-for="item in hobbyTags">{{ item }}</view>
					</view>
				</block>
				<view class="edit-select" @click="goto('/pages/user/card/edit/layouts/hobby',1)" v-else>
					<weui-input v-model="ruleform.hobby" label="兴趣爱好" placeholder="请选择" type="emptySelect" name="hobby"></weui-input>
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
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{address:'',},
				show:false,
				vaildate:{},
			
				infoTags:['1980年','160cm','本科','5000~10000','广东江门','IT工程师'],
				condTags:['25~30岁','160cm以上','大专以上','5000~10000','广东江门','未婚','介意有子女'],
				hobbyTags:[]
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
				this.ruleform.location_x = res.latitude;
				this.ruleform.location_y = res.longitude;
				// uni.request({
				// 	url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=' +
				// 		'LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&get_poi=1',
				// 	success: res2 => {
				// 		console.log(res2);
				// 		if (!this.ruleform.address || canUpdate) {
				// 			//this.getError("ok")
				// 			this.ruleform.location_x = res.latitude;
				// 			this.ruleform.location_y = res.longitude;
				// 			this.ruleform.address = res2.data.result.address;
				// 			this.ruleform.city = res2.data.result.address_component.city;
				// 			console.log(res2.data.result.address_component.city)
				// 			console.log(1)
				// 		}
				// 	},
				// 	fail:res2=>{
				// 		this.getError(JSON.stringify(res2));
				// 	}
				// });
			},
			location(res) {
				console.log(res);
				this.ruleform.location_x = res.latitude;
				this.ruleform.location_y = res.longitude;
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							
						});
					}
				})
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
					if(msg.user.userInfo.marry_condition){
						 this.ruleform.marry_condition = JSON.parse(msg.user.userInfo.marry_condition);
						 console.log(this.ruleform.marry_condition)
					}
					if(msg.user.userInfo.hobby){
						 this.hobbyTags = msg.user.userInfo.hobby.split(",");
						
					}
					this.show = true;
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