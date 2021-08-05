<template>
	<view class="bg-f pb50" style="height: 100vh;">
		<page :parentData="data" :formAction="formAction"></page>
		<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="f-sub-btn fs16"></myform>
		<view v-if="data.show">
			<weui-input v-model="ruleform.name" label="门店名称" type="text" name="name" datatype="require"></weui-input>
			<weui-input v-model="ruleform.remark" label="备注" type="textarea" name="remark" datatype="require"></weui-input>
			<weui-input v-model="ruleform.radio" label="标题1" type="switch" name="radio" datatype="require"></weui-input>
			<weui-input v-model="ruleform.address" label="定位" type="location" name="address"></weui-input>
			<weui-input v-model="ruleform.phone" label="电话" type="text" name="phone"></weui-input>
			<weui-input v-model="ruleform.sms" label="定位" type="sms" name="sms" :phone="ruleform.phone" action="/auth/sendSms"></weui-input>
			<weui-input v-model="ruleform.sendType" label="送货方式" name="sendType" changeField="value" type="radio" dataKey="sendTypeArr"
			 :radioType="true"></weui-input>
			<weui-input v-model="ruleform.sendType" label="送货方式" name="sendType" changeField="value" type="select" dataKey="sendTypeArr"></weui-input>
			<weui-input v-model="ruleform.logo" label="上传LOGO" type="upload" upurl='article' allowUpLoadNum="5" name="logo"
			 datatype="require"></weui-input>
			<weui-input v-model="ruleform.needArr" label="需求类型" name="needArr" type="manyselect" dataKey="selectData"
			 changeField="value"></weui-input>
			<weui-input v-model="ruleform.date" label="日期" type="date" name="date"></weui-input>
			<weui-input v-model="ruleform.time" label="时间" type="time" name="time"></weui-input>
			<dx-address v-model="ruleform.addr_address"></dx-address>
		</view>
	</view>
</template>

<script>
	import "./form.css";
	export default {
		data() {
			return {
				formAction: '/shop/wapindex',
				ruleform: {
					addr_address: '广东省,江门市',
					remark:'',
					sendType: '2',
					sendType2: '2',
					needArr: '服务类,咨询管理'
				},
				selectData: [{
					label: '服务类',
					value: '服务类',
					children: [{
							label: '工商财税法律',
							value: '工商财税法律'
						},
						{
							label: '咨询管理',
							value: '咨询管理'
						},
						{
							label: '数据信息',
							value: '数据信息'
						},
						{
							label: '人力资源',
							value: '人力资源'
						},
						{
							label: '电商营销',
							value: '电商营销'
						},
						{
							label: '医疗健康',
							value: '医疗健康'
						},
					]
				}, {
					label: '产品类',
					value: '产品类',
					children: [{
							label: '电子电工',
							value: '7'
						},
						{
							label: '五金管材',
							value: '8'
						},
						{
							label: '家电日用',
							value: '9'
						},
						{
							label: '机械设备',
							value: '10'
						}
					]
				}],
				sendTypeArr: [{
						label: '普通',
						value: '1',
					},
					{
						label: '加急',
						value: '2',
					},
					{
						label: '自提',
						value: '3'
					},
				],
				sendTypeArr2: [{
						label: '普通',
						value: '1',
					},
					{
						label: '加急',
						value: '2',
					},
					{
						label: '自提',
						value: '3'
					},
				],
				vaildate: {},
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			formSubmit(){
				console.log('a');	
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
