<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<view class="con-money p15 pb0 bg-f mb8">
				<view class="fs-16 fc-6 pb15">可提现金额（<text class="Arial">￥{{data.price}}</text>）</view>
				<view class="m-input flex lh-50 pb15">
					<text class="fs-20 pr5">￥</text>
					<view class="flex1">
						<weui-input v-model="ruleform.amount" myclass="input fs-20 w-b100" placeholder="请输入提现金额" type="text" name="amount"></weui-input>
					</view>
				</view>
			</view>
			<dx-button myclass="m20 mb0" type="success" size="lg" @click="formSubmit" block>提交</dx-button>
			<view class="fs-14 fc-6 text-center pt10">注意：提现金额满<text class="fc-orange Arial plr3">10元</text>后才能提现</view>
			<!-- <view class="action">
				<view class="action-icon">
					<view class="name mt20 fs16">
						我的可提现佣金
					</view>
					<view class="price-red fs-price fs-20">
						￥
						<span class="price fs-30">{{data.price}}</span>
					</view>
				</view>
				<div>
					<button class="dx-btn-lg dx-btn-orange" @click="submit">提交</button>
					<p class="fc-6 text-center fs-14">提现金额必须为100的倍数，48小时内审核</p>
				</div>
			</view> -->
			<div class="share-overlay" @click="toggleDiag" v-if="thisDiag" style="z-index: 1"></div>
			<div class="layermchild layermanim bounceIn p15" v-if="thisDiag">
				<div class="layermcont">
					<div class="verifyCode p">
						<weui-input v-model="ruleform.name" label='提现人' errorMessage="提现人" type="text" name="name" datatype="require"></weui-input>
						<weui-input v-model="ruleform.amount" label='金额' errorMessage="金额" type="select" name="amount" datatype="require"
						 dataKey="amountArr" changeField="value"></weui-input>
						<weui-input v-model="ruleform.blank_name" label='开户行' errorMessage="开户行" type="text" name="blank_name" datatype="require"></weui-input>
						<weui-input v-model="ruleform.blank_cardno" label='银行卡' errorMessage="银行卡" type="text" name="blank_cardno"
						 datatype="require"></weui-input>
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="verifyBtn dx-btn-big dx-btn-red"></myform>
					</div>
				</div>

			</div>
		</section>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/user/do-money',
				mpType: 'page', //用来分清父和子组件
				thisDiag: false,
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				amountArr: [
					{label: '100元',value: 100},
					{label: '200元',value: 200},
					{label: '300元',value: 300},
					{label: '500元',value: 500},
					{label: '1000元',value: 1000},
				],
				ruleform: {
					
				},
				vaildate: { /*验证规则，目前支前有，require|phone|integer|price*/
					
				}
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
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			},
			toggleDiag() {
				this.thisDiag = !this.thisDiag;
			},
			submit() {
				this.toggleDiag();
			},
			formSubmit(e) {
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						setTimeout(() => {
							this.goto("/pages/user/recharge/list/main?historyUrl=del");
						}, 1000)
					}
				});
			},
		}
	}
</script>
