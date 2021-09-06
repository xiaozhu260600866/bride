<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="datum bg-f">
				<weui-input v-model="ruleform.age" label="年龄" placeholder="请选择" name="age" changeField="value" type="manyselect"
				 dataKey="ageArr" datatype="require"></weui-input>
				<weui-input v-model="ruleform.height" label="身高" placeholder="请选择" name="height" changeField="value" type="select"
				 dataKey="heightArr" datatype="require"></weui-input>
				<weui-input v-model="ruleform.salary" label="月收入" placeholder="请选择" name="salary" changeField="value" type="select"
				 dataKey="salaryArr" datatype="require"></weui-input>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="value" datatype="require"></weui-input>
				<weui-input v-model="ruleform.smoking" label="是否吸烟" placeholder="请选择" name="smoking" changeField="label" type="select"
				 dataKey="smokingArr" datatype="require"></weui-input>
				<weui-input v-model="ruleform.drank" label="是否喝酒" placeholder="请选择" name="drank" changeField="label" type="select"
				 dataKey="drinkArr" datatype="require"></weui-input>
				 
				 
				 <weui-input v-model="ruleform.car_record" label="是否有车" placeholder="请选择" name="car_record" changeField="label" type="select"
				  dataKey="carRecordArr" datatype="require"></weui-input>
			
				 
				 <weui-input v-model="ruleform.house_record" label="是否有房" placeholder="请选择" name="house_record" changeField="label" type="select"
				  dataKey="houseRecordArr" datatype="require"></weui-input>
				 
				 
				<weui-input v-model="ruleform.marriage" label="婚烟状况" placeholder="请选择" type="select" name="marriage" dataKey="marriageArr"
				 changeField="label" datatype="require"></weui-input>
				 
				 
				 
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
				formAction: '/user',
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
					
				],
				educationArr:[
					
				],
				houseRecordArr:[
					{label:'有房',value: '有房'},
					{label:'无房',value: '无房'},
				],
				carRecordArr:[
					{label:'有车',value: '有车'},
					{label:'无车',value: '无车'},
				],
				smokingArr:[
					{label:'经常抽烟',value: '经常抽烟'},
					{label:'不抽',value: '不抽'},
					{label:'特定场合抽',value: '特定场合抽'},
				],
				drinkArr:[
					{label:'经常喝',value: '经常喝'},
					{label:'不喝',value: '不喝'},
					{label:'特定场合喝',value: '特定场合喝'},
				],
				marriageArr:[
					{label:'未婚',value: '未婚'},
					{label:'离异',value: '离异'},
					{label:'丧偶',value: '丧偶'},
				]
			}
		},
		mounted() {
			let arr = [];
			for (var i = 18; i < 60; i++) {
				arr.push({label:i,value:i,children:[]});
				for (var j = i+1; j < 60; j++) {
					arr[arr.length-1].children.push(
						{label:j,value:j},
						
					)	
				}	
			}
			this.ageArr = arr;
		},
		methods: {
			submit(){
				this.$set(this.ruleform,"marry_condition",JSON.stringify(this.ruleform));
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",{marry_condition:this.ruleform.marry_condition,phone:this.data.user.userInfo.phone}).then(msg=>{
							this.back();
						});
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
						this.salaryArr = msg.salaryArr;
						this.educationArr = msg.educationArr;
						this.heightArr = msg.heightScopeArr;
						//this.ageArr = msg.ageScopeArr;
						if(msg.user.userInfo.marry_condition){
							 this.ruleform = JSON.parse(msg.user.userInfo.marry_condition);	
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