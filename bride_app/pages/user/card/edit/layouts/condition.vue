<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="datum bg-f">
				<weui-input v-model="ruleform.age" label="年龄" placeholder="请选择" name="age" changeField="value" type="manyselect"
				 dataKey="ageArr"></weui-input>
				<weui-input v-model="ruleform.height" label="身高" placeholder="请选择" name="height" changeField="value" type="manyselect"
				 dataKey="heightArr"></weui-input>
				<weui-input v-model="ruleform.salary" label="月收入" placeholder="请选择" name="profession" changeField="value" type="select"
				 dataKey="salaryArr"></weui-input>
				<dxAddress v-model="ruleform.address" labeltxt="工作城市" datatype="require" ref="address" addressHidden left></dxAddress>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="value"></weui-input>
				<weui-input v-model="ruleform.smoking" label="是否吸烟" placeholder="请选择" name="smoking" changeField="label" type="select"
				 dataKey="smokingArr"></weui-input>
				<weui-input v-model="ruleform.drank" label="是否喝酒" placeholder="请选择" name="drank" changeField="label" type="select"
				 dataKey="drinkArr"></weui-input>
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
					age: '',
					address:''
				},
				vaildate:{},
				heightValue: [0, 0],
				ageValue: [0, 0],
				heightArr: [],
				ageArr: [],
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
				educationArr:[
					{label:'小学',value: 1},
					{label:'初中',value: 2},
					{label:'中专',value: 3},
					{label:'大专',value: 4},
					{label:'本科',value: 5},
					{label:'硕士',value: 6},
					{label:'博士',value: 7},
				],
				smokingArr:[
					{label:'经常抽烟',value: 1},
					{label:'不抽',value: 2},
					{label:'特定场合抽',value: 3},
				],
				drinkArr:[
					{label:'经常喝',value: 1},
					{label:'不喝',value: 2},
					{label:'特定场合喝',value: 3},
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
					let heightTemp = [];
					for (let i = 139; i < 220; i++) {
						let heightChildren = [];
						heightChildren.push({
							label: '不限',
							value: '不限'
						});
						for (let j = i + 1; j < 220; j++) {
							heightChildren.push({
								label: j + 'cm',
								value: j + 'cm',
							});
						}
						if (i == 139) heightTemp.push({
							label: '不限',
							value: '不限',
							children: heightChildren
						});
						else heightTemp.push({
							label: i + 'cm',
							value:  i + 'cm',
							children: heightChildren
						});
					}
					console.log(heightTemp);
					this.heightArr = heightTemp;

					let ageTemp = [];
					for (let i = 18; i < 60; i++) {
						let ageChildren = [];
						ageChildren.push({
							label: '不限',
							value: '不限',
						});
						for (let j = i + 1; j < 60; j++) {
							ageChildren.push({
								label: j + '岁',
								value: j + '岁',
							});
						}
						if (i == 18) ageTemp.push({
							label: '不限',
							value: '不限',
							children: ageChildren
						});
						else ageTemp.push({
							label: i + '岁',
							value:  i + '岁',
							children: ageChildren
						});
					}
				});
			},
			
		},
		onLoad(options) {
			this.type = options.type;
			this.ajax();
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
			.dx-label{text-align: left;}
			.picker{text-align: left;}
			.picker-label{color: #999;}
		}
		.dx_ft-access{position: absolute;bottom: 58rpx;right: 0rpx;}
	}
}
</style>