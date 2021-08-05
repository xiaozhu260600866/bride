<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div v-if="data.show">
			<div class="order-sec">
				<orderPro :data="data.detail.products"></orderPro>
			</div>
			<div class="mb10 bg-f cinfo">
				<weui-input v-model="ruleform.after_type" name="after_type" datatype="require" label="售后类型" changeField="label" type="select" :dataKey="'afterArr'"></weui-input>
				<weui-input v-model="ruleform.after_cause" name="after_cause" datatype="require" label="申请原因" changeField="value" type="select" :dataKey="'aftercauseArr'"></weui-input>
				<weui-input v-model="ruleform.after_content" label="说明" type="textarea" myclass="text-area" name="after_content"  datatype="require"></weui-input>
				<weui-input v-model="ruleform.after_logo" name="after_logo" label="上传图片" type="upload" upurl='order' allowUpLoadNum="5"></weui-input>
			</div>
			<view id="footer-btn" v-if="ruleform.status !=10 ">
				<myform class="w-b100" :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f-dx-btn dx-btn-red w-b100"> </myform>
			</view>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import orderPro from "@/components/orderPro";
	export default {
		components: {
			orderPro
		},
		data() {
			return {
				aftercauseArr: [{
						label: '多拍/错拍/不想要',
						value: 1
					},
					{
						label: '不喜欢/效果不好',
						value: 2
					},
					{
						label: '货物与描述不符',
						value: 3
					},
					{
						label: '质量问题',
						value: 4
					},
					{
						label: '收到商品少件/破损',
						value: 5
					},
					{
						label: '卖家发错货',
						value: 6
					},
					{
						label: '其他',
						value: 7
					}
				],
				afterArr: {},
				formAction: '/shop/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				vaildate: {}
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
			formSubmit() {
				this.postAjax('/shop/order/after-sale', this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.goto("/pages/order/service/main?shareSource=share&status=10");
						//this.back();
					}
				});;
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.afterArr = msg.afterArr;
					this.ruleform = msg.detail;
					this.ruleform.after_logo = msg.detail.after_logo ? msg.detail.after_logo.split(",") : [];
				});
			}
		}
	}
</script>
