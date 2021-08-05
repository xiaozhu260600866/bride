<template>
	<dx-diag :title="title ? title :'请选择城市'" width="76%" :OFFicon="OFFicon?false:true" ref="areaDiag">
		<view class="selectArea">
			<weui-input v-model="ruleform.province" name="province" changeField="label" type="select" dataKey="provinceArr"
			 placeholder="请选择省份" @callback="provinceCallBack"></weui-input>
			<weui-input v-model="ruleform.city" name="city" changeField="label" type="select" dataKey="cityArr"
			 placeholder="请选择城市" @callback="cityCallBack"></weui-input>
			<weui-input v-model="ruleform.town" name="town" changeField="label" type="select" dataKey="townArr"
			 placeholder="请选择区县" @callback="townCallBack"></weui-input>
			<weui-input v-model="ruleform.area" name="area" changeField="label" type="select" dataKey="areaArr"
			 placeholder="请选择地区" @callback="areaCallBack"></weui-input>
		</view>
		<view class="btn mt15 flex-center">
		<!-- 	<view class="w-b40 pr15"><dx-button block round @click="toggleCity">取消</dx-button></view> -->
			<view class="w-b100"><dx-button type="primary" block round @click="submit">确认</dx-button></view>
		</view>
	</dx-diag>
	
</template>

<script>
	import dxDiag from "doxinui/components/diag/diag"
	export default{
		props:["title","provinceArr","cityArr","areaArr","townArr",'ruleform','OFFicon'],
		components: {dxDiag},
		data() {
			return {
				diag:false
			}
		},
		methods:{
			submit(){
				if(!this.ruleform.area){
					return this.getError("请选择配送区域");	
				}
				this.postAjax('/updateArea',this.ruleform).then(msg=>{
					
				})
				this.$refs.areaDiag.thisDiag=false;
				uni.setStorageSync("province",this.ruleform.province);
				uni.setStorageSync("city",this.ruleform.city);
				uni.setStorageSync("area",this.ruleform.area);
				uni.setStorageSync("town",this.ruleform.town);
				this.$emit('callBack',this.ruleform);
			},
			toggleCity() {
				this.$refs.areaDiag.thisDiag=false;
			},
			init(){
				this.$refs.areaDiag.thisDiag=true;
				if(	uni.getStorageSync("waterCityData")){
					// this.getParent(this).ruleform.province = uni.getStorageSync("waterCityData").province;
					// this.getParent(this).ruleform.city = uni.getStorageSync("waterCityData").city;
					// this.getParent(this).ruleform.town = uni.getStorageSync("waterCityData").town;
					// this.getParent(this).ruleform.area = uni.getStorageSync("waterCityData").area;
				}
				this.postAjax("/city.html",{fid:0}).then(msg=>{
					this.getParent(this).provinceArr = msg.data.arr;
					this.provinceCallBack({value:40});
				});
			},
			provinceCallBack(e){
				this.getParent(this).ruleform.province = e.label;
				this.getParent(this).ruleform.city = "";
				this.getParent(this).ruleform.town = "";
				this.getParent(this).ruleform.area = "";
				this.postAjax("/city.html",{fid:e.value}).then(msg=>{
					this.getParent(this).cityArr = msg.data.arr;
					if(this.ruleform.city){
						msg.data.arr.forEach(v=>{
							if(this.ruleform.city == v.label){
								this.cityCallBack({value:v.value,label:v.label});
							}
						})
					}
				});
			},
			cityCallBack(e){
				this.getParent(this).ruleform.city = e.label;
				this.getParent(this).ruleform.town = "";
				this.getParent(this).ruleform.area = "";
				this.postAjax("/city.html",{fid:e.value}).then(msg=>{
					this.getParent(this).townArr = msg.data.arr;
				});
			},
			townCallBack(e){
				this.getParent(this).ruleform.town = e.label;
				this.getParent(this).ruleform.area = "";
				this.postAjax("/city.html",{fid:e.value}).then(msg=>{
					this.getParent(this).areaArr = msg.data.arr;
				});
			},
			areaCallBack(e){
				this.getParent(this).ruleform.area = e.label;
			}
		}
	}
</script>

<style>
</style>
