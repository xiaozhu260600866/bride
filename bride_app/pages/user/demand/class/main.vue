<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show && data.release">
			<view class="disclaimer">
				<view class="box">免责声明：平台发布的所有信息（收费、免费）；平台只负责发布、展示，与平台本身无关，平台不负任何责任。</view>
			</view>
			<view class="bg-f bd-te bd-be">
				<dx-divider dividerWidht="60rpx" :size="15" color="#666" dividerColor="#999">请选择你要发布的栏目</dx-divider>
			</view>
			<view class="bg-f">
				<dx-nav-class :data="lists" @click="openChildren" myclass="mtb10" num="5" :imgR="22" :imgWidth="44" :imgHeight="44" :namePTop="0"></dx-nav-class>
			</view>
			<view class="select-Fdiag" v-if="selectDiag">
				<view class="Fdiag-box">
					<view class="topTips item">请选择发布栏目</view>
					<view class="conBox">
						<view class="item" @click="goto('/pages/user/demand/create_edit/index?category='+parent.name +','+v.label,1)" v-for="v in childrenArr" v-if="!id">{{v.label}}</view>
						<view class="item" @click="goto('/pages/user/demand/create_edit/index?category='+parent.name +','+v.label+'&id='+id+'&repeat=1',1)" v-for="v in childrenArr" v-if="id">{{v.label}}</view>
					</view>
					<view class="bottomCancel item" @click="selectDiag = false">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxDivider from "doxinui/components/divider/divider"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components: {dxDivider,dxNavClass},
		data() {
			return {
				formAction: '/category',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				selectDiag: false,
				childrenArr:[],
				parent:{},
				id:'',
				lists:[]
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
			this.ajax();
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		methods: {
			openChildren(parent){
				 if(parent.children && parent.children.length){
					 this.childrenArr = parent.children;
					 this.selectDiag = true;
					 this.parent =parent;
				 }else{
					 return this.goto('/pages/user/demand/create_edit/index?category='+parent.name,1)
				 }
			},
			ajax() {
				this.lists = [ ];
				this.getAjax(this,{type:3}).then(msg => {
					console.log(this.data);
					this.listsShow = true;
					this.data.lists.forEach(msg=>{
						this.lists.push({
							name:msg.label,
							id:msg.value,
							cover:msg.cover,
							children:msg.children
						});
					});
					
				});
			},
			
		}
	}
</script>
