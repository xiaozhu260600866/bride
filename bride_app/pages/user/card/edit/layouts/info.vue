<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="datum bg-f">
				<!-- <weui-input v-model="ruleform.nickname" label="昵称" type="txt" name="nickname"></weui-input>
				<weui-input v-model="ruleform.id" label="ID" type="txt" name="id"></weui-input> -->
				<weui-input v-model="ruleform.sex" label="性别" name="sex" changeField="value" type="radio" dataKey="sexArr" 
				 :row="false" myclass="sexArr"></weui-input>
				<weui-input v-model="ruleform.age" label="年龄" name="age" changeField="value" type="select" dataKey="ageArr"></weui-input>
				<!-- <dxAddress v-model="ruleform.address" labeltxt="城市" datatype="require" addressHidden left></dxAddress> -->
				<dx-address v-model="ruleform.address" addressHidden class="address" left labeltxt="工作生活在"></dx-address>
				<weui-input v-model="ruleform.education" label="学历" placeholder="请选择" type="select" name="education" dataKey="educationArr"
				 changeField="label"></weui-input>
				<weui-input v-model="ruleform.height" label="身高" placeholder="请选择" type="select" name="height" dataKey="heightArr"
				 changeField="label"></weui-input>
				<weui-input v-model="ruleform.profession" label="职业" placeholder="请输入您的职业" type="text" name="profession" datatype="require"></weui-input>
				<weui-input v-model="ruleform.salary" label="月收入" placeholder="请选择" name="profession" changeField="label" type="select"
				 dataKey="salaryArr"></weui-input>
				<weui-input v-model="ruleform.marriage" label="婚烟状况" placeholder="请选择" type="select" name="marriage" dataKey="marriageArr"
				 changeField="label"></weui-input>
				<weui-input v-model="ruleform.car_record" label="是否有车" placeholder="请选择" name="car_record" changeField="label" type="select"
				 dataKey="carRecordArr"></weui-input>
				<weui-input v-model="ruleform.house_record" label="是否有房" placeholder="请选择" name="house_record" changeField="label" type="select"
				 dataKey="houseRecordArr"></weui-input>
				<weui-input v-model="ruleform.smoking" label="是否吸烟" placeholder="请选择" name="smoking" changeField="label" type="select"
				 dataKey="smokingArr"></weui-input>
				<weui-input v-model="ruleform.drank" label="是否喝酒" placeholder="请选择" name="drank" changeField="label" type="select"
				 dataKey="drinkArr"></weui-input>
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
				ruleform:{},
				vaildate:{},
				sexArr:[
					{label:'男',value: 1},
					{label:'女',value: 2},
				],
				ageArr:[],
				educationArr:[],
				heightArr:[],
				salaryArr:[],
				smokingArr:[
					{label:'经常抽烟',value: '经常抽烟'},
					{label:'不抽',value: '不抽'},
					{label:'特定场合抽',value: '特定场合抽'},
				],
				houseRecordArr:[
					{label:'有房',value: '有房'},
					{label:'无房',value: '无房'},
				],
				carRecordArr:[
					{label:'有车',value: '有车'},
					{label:'无车',value: '无车'},
				],
				drinkArr:[
					{label:'经常喝',value: '经常喝'},
					{label:'不喝',value: '不喝'},
					{label:'特定场合喝',value: '特定场合喝'},
				],
				marriageArr:[
					{label:'未婚',value: 1},
					{label:'离异',value: 2},
					{label:'丧偶',value: 3},
					{label:'已婚（申请做红娘）',value: 3},
				]
			}
		},
		mounted() {
		
		},
		methods: {
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							 if(msg.data.status == 2){
								 this.back();
							 }
							
						});
					}
				})
				
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.user.userInfo;
					this.$set(this.ruleform,"nickname",msg.user.nickname);
					this.ruleform.remark_pic = msg.user.userInfo.remark_pic ? msg.user.userInfo.remark_pic.split(","): [],
					this.ruleform.remark_pic_company = msg.user.userInfo.remark_pic_company ? msg.user.userInfo.remark_pic_company.split(","): [],
					this.industryData = msg.industryArr;
					this.salaryArr = msg.salaryArr;
					this.heightArr = msg.heightArr;
					this.educationArr = msg.educationArr;
					this.ageArr = msg.ageArr;
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
			.dx-label{width: 100%;}
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