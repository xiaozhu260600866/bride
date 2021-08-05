<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pb60" v-if="data.show">
			<view class="content mb12 bg-f">
				<weui-input v-model="ruleform.name" label="产品标题" type="text" name="name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.price" label="服务价格" type="number" name="price" datatype="require|price"></weui-input>
				<weui-input v-model="ruleform.num" label="库存" type="number" name="num" datatype="require"></weui-input>
				<weui-input v-model="ruleform.fclass" label="产品类别" name="fclass" type="manyselect" dataKey="fclassArr"
				 changeField="value" datatype="require" v-if="!ruleform.id"></weui-input>
			</view>
			<view class="content mb12 bg-f">
				<view class="secName pb5">服务详情介绍</view>
				<weui-input v-model="ruleform.content" placeholder="请描述您的服务详情…" type="textarea" name="content" datatype="require"></weui-input>
				<view class="secName">产品缩略图</view>
				<weui-input v-model="ruleform.thumb_pic" type="upload" upurl='product' allowUpLoadNum="1" name="thumb_pic"></weui-input>
				<view class="secName">产品详情介绍图</view>
				<weui-input v-model="ruleform.cover" type="upload" upurl='product' allowUpLoadNum="5" name="cover"></weui-input>
			</view>
			<view class="agreement mlr20 mtb25 flex-middle fs-14 fc-6">
				<checkbox-group @change="agree"><checkbox value="cb"   /></checkbox-group>
				<view>我已阅读并同意</view>
				<view class="main-color" @click="goto('/pages/news/show/main?id=280',1)">《发布须知》</view>
			</view>
			<dxftButton size="lg" type="primary" @click="submit">确认发布</dxftButton>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxftButton from "doxinui/components/button/footer-button"
	import selectCity from "@/components/selectCity.vue"
	export default {
		components: {
			dxftButton,
			selectCity
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				fclassArr:[],
				vaildate:{},
				ruleform: {
					agree:0
				},
			}
		},
		methods: {
			agree(event){
				if(event.target.value.length){
					console.log("a")
					this.ruleform.agree = 1;	
				}else{
					console.log("b")
					this.ruleform.agree = 0;	
				}
			},
			submit() {
				if(!this.ruleform.agree){
					this.getError("请勾选并同意商家服务协议");
					return false;
				}
				this.vaildForm(this, res => {
					if (res) {
						this.postAjax("/shop/product/createOrEdit", this.ruleform).then(msg => {
							if(msg.data.status == 2){
								this.goto("/pages/user/service/lists/index");	
							}
						});
					}
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.fclassArr = msg.lists
					if(msg.detail){
						this.ruleform = msg.detail;
						this.ruleform.cover = this.ruleform.cover ? this.ruleform.cover.split(",") :[];
						this.ruleform.thumb_pic = this.ruleform.thumb_pic ? this.ruleform.thumb_pic.split(",") :[];
					}
				});
			}
		},
		onLoad(options) {
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},

	}
</script>


