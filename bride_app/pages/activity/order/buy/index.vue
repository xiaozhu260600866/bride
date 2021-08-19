<template>
	<view>
		<view class="bg-white"></view>
		<view class="zindex2">
			<dxtitle name="请填写参与者真实信息" Lline></dxtitle>
			<view class="remark fc-9 fs-13 pb10 pl30" style="margin-top: -20rpx;">以下信息保密,仅用于确认身份</view>
			<weui-input v-model="ruleform.addr_name" label="真实姓名" myclass="fs-16" type="text" name="addr_name" datatype="require"></weui-input>
			<weui-input v-model="ruleform.addr_idCard" label="身份证" myclass="fs-16" type="number" name="addr_idCard" datatype="require|idCard"></weui-input>
			<weui-input v-model="ruleform.addr_phone" label="手机号码" myclass="fs-16" type="number" name="addr_phone" datatype="require|phone"></weui-input>
			<weui-input v-model="ruleform.pay_method" label="支付方式" myclass="fs-16" name="radio" changeField="value" type="radio" dataKey="payMethodArr" :row="true" ></weui-input>
			<view id="footer" >
				<view class="f_left price fs-18 plr10">￥
					<span class="fs-24">{{data.detail.amount}}</span>
				</view>
				<view class="f_right mr15 mb5">
					<dx-button type="danger" round @click="submit">提交订单</dx-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import dxtitle from "doxinui/components/title/title";
	export default {
		components:{
			dxtitle
		},
		data() {
			return {
				formAction: '/activity/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{pay_method:1},
				vaildate:{},
				payMethodArr:[
					{label:'微信支付',value:1},
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
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/activity/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/activity/order/payed/index?order_no=" + order_no);
				});
			},
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.ruleform.activity_id= this.data.detail.id;
						this.ruleform.amount = this.data.detail.amount;
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							  if (msg.data.status == 2) {
							  	this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
							  }
						});
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					//this.setTitle(this.data.siteConfig.web_name);
					this.detail = msg.detail;
				});
			}
		}
	}
</script>

<style scoped>
/* 结算脚部 */
#footer {height: 100upx;line-height: 100upx;position: fixed;left: 0;bottom: 0;width: 100%;background: #fff;display: flex;align-items: center;z-index: 1;border-top: 1upx solid #f7f7f7;}
#footer .f_left {color: #FF4351;flex: 1;overflow: hidden;}
#footer>section{flex: 1;overflow: hidden;}
#footer .f_right .nav{color: #fff;background: #FF4351;font-size: 30upx;border-radius: 40upx;line-height: 80upx;padding: 0 50upx!important;margin: 0 10upx;}
#footer .f_right .nav-o{color: #232325;font-size: 30upx;border-radius: 40upx;line-height: 78upx;padding: 0 50upx!important;margin: 0 10upx;border: 1upx solid #8c8c8c;}
#footer .f_right span{font-size: 30upx;}

/deep/.dx-cell,/deep/.dx-cell .dx-input{font-size: 32upx;}
/deep/.dx-cell .dx-checkbox uni-radio{zoom: 100%;}

</style>
