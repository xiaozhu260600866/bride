<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view class="p10" v-if="data.show">
			<dx-tag class="mr5" v-for="v in hobbyTags" :type="v.checked ? 'success':'info'" @click="v.checked= !v.checked">{{v.label}}</dx-tag>
			<dxftButton type="primary" size="lg" round @click="submit">确认</dxftButton>
		</view>
	</view>
</template>

<script>
	import dxftButton from "doxinui/components/button/footer-button"
	import dxTag from "doxinui/components/tag/tag"
	export default {
		components:{dxftButton,dxTag},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				cur: 1,
				hobbyShow: false,
				hobbyTags:[
					{label:'篮球',value:'篮球',checked:false},
					{label:'跑步',value:'跑步',checked:false},
					{label:'探险',value:'探险',checked:false},
					{label:'看书',value:'看书',checked:false},
					{label:'美食',value:'美食',checked:false},
					
				]
			}
		},
		mounted() {
		
		},
		methods: {
			submit(){
				let res =[];
				for (var i = 0; i < this.hobbyTags.length; i++) {
					 if(this.hobbyTags[i].checked){
						 res.push(this.hobbyTags[i].value);
					 }
				}
				if(res.length == 0){
					return this.getError("还没有选择");
				}
				this.postAjax("/user/info",{hobby:res.join(","),phone:this.data.user.userInfo.phone}).then(msg=>{
					if(msg.data.status == 2){
						this.back();
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					if(msg.user.userInfo.hobby){
						 let hobbyArr = msg.user.userInfo.hobby.split(",");
						 this.hobbyTags.forEach(hobby=>{
							 if(this.in_array(hobby.value,hobbyArr)){
								  hobby.checked = true;
							 }
							 
						 })
						 
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
@import "xiaozhu/css/dx-input.css";
@import "css.scss";
.datum{
	padding: 0 30rpx
	::v-deep .dx-cell{
		display: block;padding: 24rpx 0;
		.dx-cell_hd{
			.star{display: none;}
			.dx-label{width: 100%;}
		}
		.dx-cell_bd{
			padding: 10rpx 30rpx 0 0;color: #434343;
			.dx-label{text-align: left;}
			.picker{text-align: left;}
			.picker-label{color: #999;}
			.input-placeholder{color: #999;}
			.value{
				display: flex;align-items: center;flex-wrap: wrap;
				.tag{
					&:last-child .comma{display: none;}
				}
			}
		}
		.dx_ft-access{position: absolute;top: 116rpx;right: 0rpx;}
	}
}
</style>