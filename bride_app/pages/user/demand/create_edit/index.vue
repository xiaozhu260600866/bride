<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show">
			<!-- <view class="className main-bg" @click="goto('/pages/user/demand/class/main')" v-if="!ruleform.id">{{childrenName}}</view>
			<view class="className main-bg" @click="goto('/pages/user/demand/class/main?id='+ruleform.id)" v-if="ruleform.id">{{childrenName}}</view> -->
			<view class="content mb12 bg-f">
				<weui-input v-model="ruleform.title" placeholder="请描述您的发布信息…" type="textarea" name="title" datatype="require"></weui-input>
				<weui-input v-model="ruleform.cover" type="upload" upurl='articleOrder' allowUpLoadNum="5" name="cover"></weui-input>
			</view>
			<view class="mb12 bg-f text">
				<weui-input v-model="ruleform.top" label="是否置顶" type="switch" name="top" v-if="!ruleform.id && !data.a"></weui-input>
				<weui-input v-model="ruleform.category" label="动态分类" type="select" changeField="label" datatype="require" dataKey="category" name="category" ></weui-input>
			
				<view class="block-sec" v-if="ruleform.top && !ruleform.id">
					<weui-input v-model="ruleform.article_order_expires_id" label="置顶时间" name="article_order_expires_id" changeField="value"
					 type="radio" dataKey="articleOrderExpire" :row="true" Labelleft datatype="require"></weui-input>
				</view>
				<view class="block-sec" v-if="ruleform.top && ruleform.id ">
					<weui-input v-model="ruleform.top_expire_date" label="置顶有效期" type="txt" name="top_expire_date" :disabled="true"></weui-input>
				</view>
				<weui-input v-model="ruleform.amount" myclass="xiaozhu2" label="发贴费用" type="txt" name="amount" :disabled="true" style="display: none;" ></weui-input>
			</view>
			<!-- <view class="bg-f mb12" v-if="data.release">
				<weui-input v-model="ruleform.red_packet" label="是否塞福利(可提高阅读量和转发量)" type="switch" name="red_packet" @callBack="packetCallBack"></weui-input>
			</view> -->
			<!-- 一般用法 -->
			<view class="bg-f mb12" v-if="ruleform.red_packet == true">
				<view v-if="ruleform.red_packet_average == true">
					<weui-input v-model="ruleform.red_packet_amount" label="单个金额" placeholder="0.1至2000元" type="text" name="red_packet_amount"
					 datatype="require|price"></weui-input>
					<weui-input v-model="ruleform.red_packet_num" label="总共几份" placeholder="总共多少份(至少一份)" type="number" name="red_packet_num"
					 datatype="require"></weui-input>
				</view>
				<view v-else>
					<weui-input v-model="ruleform.red_packet_amount" label="福利金额" placeholder="1至2000元" type="text" name="red_packet_amount"
					 datatype="require|price"></weui-input>
					<weui-input v-model="ruleform.red_packet_num" label="分成几份" placeholder="分成多少份(至少一份)" type="number" name="red_packet_num"
					 datatype="require"></weui-input>
				</view>
				<weui-input v-model="ruleform.red_packet_average" label="是否平均分配福利" type="switch" name="red_packet_average"></weui-input>
			</view>
			<!-- <view class="pay_method bg-f mb12 fs-16" v-if="!ruleform.id">
				<weui-input v-model="ruleform.pay_method" name="pay_method"  label="支付方式" changeField="value" type="radio"
				 dataKey="pay_methods"></weui-input>
				<view class="ptb10 plr15">
					<view class="flex-between flex-middle" v-if="ruleform.pay_method == 2">
						<view>可用积分：<text class="Arial plr3">{{data.user.integral}}</text></view>
						<view>合计：<text class="Arial plr3">{{integral}}</text>积分</view>
					</view>
					<view class="flex-between flex-middle" v-if="ruleform.pay_method == 1">
						<view></view>
						<view>合计：<text class="Arial plr3">{{amount}}</text>元 </view>
					</view>
				</view>
				合计:<text class="Arial plr3">{{amount}}</text>元</view>
				 帐户只有{{data.user.integral}}</text>积分
				 积分支付（可用<text class="Arial plr3">{{integral}}</text>分）
			</view> -->
			<!-- <view class="pay_method bg-f mb12">
				<radio-group class="radio-group" @change="radioChange">
					<label class="radio-item">
						<view class="left">
							<radio :value="item.value" :checked="index === current" />
							<view>微信支付</view>
						</view>
						<view class="right">合计:<text class="Arial plr3">10</text>元</view>
					</label>
					<label class="radio-item">
						<view class="left">
							<radio :value="item.value" :checked="index === current" />
							<view>积分支付（可用<text class="Arial plr3">{{data.user.integral}}</text>分）</view>
						</view>
						<view class="right">合计:<text class="Arial plr3">{{data.user.integral}}</text>积分</view>
					</label>
				</radio-group>
			</view> -->
			<dxftButton size="lg" type="primary" @click="submit">确认发布</dxftButton>
			<selectCity ref="selectCity" title="请选择所在区域" :ruleform="ruleform" :townArr="townArr" :cityArr="cityArr" :provinceArr="provinceArr" :areaArr="areaArr" @callBack="cityCallBack"></selectCity>
			
			<view class="agreement mlr20 mtb25 flex-middle fs-14 fc-6">
				<checkbox-group @change="checkboxChange"><checkbox :value="1" :checked="true"/></checkbox-group>
				<view>我已阅读并同意</view>
				<view class="main-color" @click="goto('/pages/news/show/main?id=280',1)">《发布须知》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxftButton from "doxinui/components/button/footer-button"
	import selectCity from "@/components/selectCity.vue"
	export default {
		components: {
			dxftButton,
			selectCity
		},
		computed:{
			integral(){
				
				return this.amount * parseFloat(this.data.integralConfig);
			},
			amount(){
				console.log(12);
				let amount = 0;
				if(this.ruleform.top){
					this.data.articleOrderExpire.forEach(v=>{
						if(this.ruleform.article_order_expires_id && this.ruleform.article_order_expires_id ==v.value ){
							amount+=parseFloat(v.amount);
						}
					});
				}
				amount+=parseFloat(this.ruleform.amount);
				if(this.data.show && this.data.user.integral &&　this.data.integralConfig && amount){
					if( (amount * this.data.integralConfig ) < parseInt(this.data.user.integral) ){
					    console.log("001457");
						this.ruleform.pay_method = 2;
					}else{
						this.ruleform.pay_method = 1;
						this.pay_methods.splice(1,1);
					}
				}
				if(this.ruleform.red_packet_amount){
					if(this.ruleform.red_packet_average){
						amount+=parseFloat(this.ruleform.red_packet_amount) * parseInt(this.ruleform.red_packet_num)
					}else{
						amount+=parseFloat(this.ruleform.red_packet_amount)
					}
					
				}
				
				return amount;
			}
		},
		data() {
			return {
				formAction: '/articleOrder/create',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				repeat:"",
				ruleform: {
					price: '',
					top: false,
					city2:'',
					province:'广东省',
					pay_method:1,
					red_packet_amount:'',
					category:""
				},
				townArr:[],
				cityArr:[],
				areaArr:[],
				provinceArr:[],
				childrenName: '',
				vaildate: {},
				articleOrderExpire: [],
				selectData: [],
				category:[],
				pay_methods: [
					/* {label: '翼支付',value: 3}, */
					{label: '积分支付',value: 2},
					{label: '微信支付',value: 1},
				
				],
			}
		},
		methods: {
			packetCallBack(){
				if(this.ruleform.red_packet){
					this.pay_methods.splice(1,1);	
				}else{
					this.pay_methods = [];
					this.pay_methods.push(
						{label: '微信支付',value: 1},
						{label: '积分支付',value: 2},
					);
				}
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			checkboxChange(e){
				let value =  e.mp.detail.value.length;
				this.ruleform.agress = value;
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
				this.$set(this.ruleform,"city2",item.province+'/'+ item.city+'/'+ item.town+'/' + item.area);
				
			},
			submit() {
				this.vaildForm(this, res => {
					if (res) {
						if(!this.ruleform.city2){
							this.getError("您还没有选择城市");
						}
						this.ruleform.role = 2;
						this.ruleform.noPay4=1;
						//this.ruleform.amount = this.amount;
						this.ruleform.area = uni.getStorageSync("waterCityData").area;
						this.postAjax(this.formAction, this.ruleform).then(msg => {
							if (msg.data.status == 2) {
								if (msg.data.config) {
									this.payUniapp(msg.data.config, msg2 => {
										this.goto("/pages/user/demand/create_edit/payed/main?order_no=" + msg.data.order_no, 1);
									});
								} else {
									if(this.ruleform.id){
										this.goto("/pages/user/demand/lists/index?status=4");
									}else{
										if(this.ruleform.pay_method == 2){
											this.goto("/pages/user/demand/create_edit/payed/main?order_no=" + msg.data.order_no, 1);
										}
									}
									
								}

							}
						});
					}
				})
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
			getThisAddress(res, canUpdate) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=' +
						'LT6BZ-ZAOC6-KUFSB-MR4F4-OOMX5-S6BTW&get_poi=1',
					success: res2 => {
						console.log(res2);
						if (!this.ruleform.address || canUpdate) {
							this.ruleform.location_x = res.latitude;
							this.ruleform.location_y = res.longitude;
							this.ruleform.address = res2.data.result.address;
							this.ruleform.city = res2.data.result.address_component.city;
							console.log(res2.data.result.address_component.city)
							console.log(1)
						}
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.category = msg.category;
					this.articleOrderExpire = msg.articleOrderExpire;
					if (msg.detail && !this.ruleform.title) {
						this.ruleform = msg.detail;
						this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") : [];
						this.ruleform.province = '广东省';
						if(this.repeat){
							this.ruleform.category = this.data.query.category;
						}
					} else {
						this.ruleform.amount = msg.amount;
						this.ruleform.name = msg.user.userInfo.name;
						this.ruleform.phone = msg.user.userInfo.phone;
					
						this.ruleform.province = msg.user.userInfo.province;
						this.ruleform.city = msg.user.userInfo.city;
						this.ruleform.town = msg.user.userInfo.country;
						this.$set(this.ruleform,"city2",this.ruleform.province + this.ruleform.city+this.ruleform.town);
						
					}
					
					wx.getLocation({
						type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						altitude:true,
						success: res => {
							console.log(res);
							this.getThisAddress(res, false);
						},
						fail: res => {

						},
						cancel: res => {

						}
					});
				});
			}
		},
		onLoad(options) {
			if (options.id) {
				this.formAction = "/articleOrder/edit";
				console.log("A");
			}
			if (options.category) {
				this.ruleform.category = options.category;
				if (this.ruleform.category.split(",").length > 1) {
					this.childrenName = this.ruleform.category.split(",")[1];
					this.setTitle(this.ruleform.category.split(",")[0])
				}
				if(options.repeat){
					this.repeat = options.repeat;
				}
			}
			
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},

	}
</script>
<style scoped="">
@import url("xiaozhu/uniapp/font/globalFont.css");
@import url("xiaozhu/css/dx-input.css"); 

</style>

