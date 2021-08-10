<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="datum bg-f">
				<weui-input v-model="ruleform.nick_name" label="昵称" type="text" name="nick_name"></weui-input>
				<weui-input v-model="ruleform.id" label="ID" type="txt" name="id"></weui-input>
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexArr" @callback="test"
				 :row="false" myclass="sexArr"></weui-input>
				<weui-input v-model="ruleform.age" label="年龄" name="age" changeField="value" type="select" dataKey="ageArr"></weui-input>
				<!-- <dxAddress v-model="ruleform.address" labeltxt="城市" datatype="require" addressHidden left></dxAddress> -->
				<dx-address v-model="ruleform.address" addressHidden class="address" left></dx-address>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.height" label="身高" placeholder="请选择" type="select" name="height" dataKey="heightArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.profession" label="职业" placeholder="请输入您的职业" type="text" name="profession" datatype="require"></weui-input>
				<weui-input v-model="ruleform.salary" label="月收入" placeholder="请选择" name="profession" changeField="value" type="select"
				 dataKey="salaryArr"></weui-input>
				<weui-input v-model="ruleform.marriage" label="婚烟状况" placeholder="请选择" type="select" name="marriage" dataKey="marriageArr"
				 changeField="label"></weui-input>
			</view>
			<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxftButton},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{
					nick_name:'东信科技-梅',
					id:'5981',
					sex: 0,
					address:'',
					salary: 1,
				},
				vaildate:{},
				sexArr:[
					{label:'男',value: 0},
					{label:'女',value: 1},
				],
				ageArr:[
				],
				educationArr:[
					{label:'小学',value: 1},
					{label:'初中',value: 2},
					{label:'中专',value: 3},
					{label:'大专',value: 4},
					{label:'本科',value: 5},
					{label:'硕士',value: 6},
					{label:'博士',value: 7},
				],
				heightArr:[
					{label:'200cm',value: 1},
					{label:'199cm',value: 2},
					{label:'198cm',value: 3},
					{label:'197cm',value: 4},
				],
				salaryArr:[
					{label:'不限',value: 1},
					{label:'10w+',value: 2},
					{label:'5w+',value: 3},
					{label:'2w-5w',value: 4},
					{label:'1w-2w',value: 5},
					{label:'7k-10k',value: 6},
					{label:'4k-6k',value: 7},
					{label:'1k-3k',value: 8},
				],
				marriageArr:[
					{label:'未婚',value: 1},
					{label:'离异无小孩',value: 2},
					{label:'离异有小孩',value: 3},
				]
			}
		},
		mounted() {
		
		},
		methods: {
			
			ajax() {
				this.getAjax(this).then(msg => {
				});
			},
			
		},
		onLoad(options) {
			this.type = options.type;
			//this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="" lang="scss">
.datum{
	padding: 0 30rpx
	::v-deep .dx-cell{
		display: block;padding: 24rpx 0;
		.dx-cell_hd{
			.star{display: none;}
		}
		.dx-cell_bd{
			padding: 10rpx 30rpx 0 0;color: #434343;
			.picker{text-align: left;}
			.picker-label{color: #999;}
		}
		.dx_ft-access{position: absolute;bottom: 58rpx;right: 0rpx;}
	}
	::v-deep .sexArr{
		.col_group{
			justify-content: flex-start;
			.dx-cell{
				display: flex;margin: 0 15px 0 0;padding: 0;
				.dx-cell_bd{padding: 0;}
			}
		}
	}
}
</style>