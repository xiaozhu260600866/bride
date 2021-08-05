<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="banner"><myswiper :data="data.categoryCover"></myswiper></view>
			<!-- <dx-tabs-scroll :tabs="data.children" :nameSize="14" v-model="data.query.category" curColor="#13cc0c" borderColor="#13cc0c" @change="ajax" v-if="!data.query.red_packet"></dx-tabs-scroll> -->
			<dx-nav-class v-if="data.children.length >1" :data="data.children" myclass="mb12" filedCover="getcover" @click="changeChildren" :num="5" :isturnpage="true" :pageNum="10"></dx-nav-class>
			<!-- <div class="Nav_btn pb10 mb12">
				<div class="item w-b20"  v-for="v in data.children" @click="data.query.category = v.name;ajax()" v-if="!data.query.red_packet">
					<div class="Nav_img">
						<img :src="v.getcover" class="img">
					</div>
					<div :class="['txt',data.query.category == v.name ? 'fc-red' :'fc-3']">{{ v.name }}</div>
				</div>
			</div> -->
			<demand-lists :data="data.lists.data" @thumb="thumb3"></demand-lists>
			<hasMore :parentData="data" source="nodata"></hasMore>
		</view>
	</view>
</template>

<script>
	import demandLists from "@/components/demandLists";
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	import "./index.css";
	export default {
		components: {demandLists,dxTabsScroll,dxNavClass},
		data() {
			return {
				formAction: '/articleOrder/lists?type=all',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				swiper:[]
				
			}
		},
		methods: {
			
			changeChildren(v){
				console.log("log");
				if(this.data.query.merchant_industry){
					this.data.query.merchant_industry = v.name;
				}else{
					this.data.query.category = v.name;
				}
				
				if(this.data.query.showType && this.data.query.showType == 'city'){
					this.$set(this.data.query,"cityNew",uni.getStorageSync("city"));
				}else if(this.data.query.showType && this.data.query.showType == 'town'){
					console.log("009")
					console.log(this.data.query.showType)
					this.$set(this.data.query,"townNew",uni.getStorageSync("town"));
				}else if(this.data.query.showType && this.data.query.showType == 'area'){
					this.$set(this.data.query,"areaNew",uni.getStorageSync("area"));
				}
				
				this.getAjax(this,this.data.query).then(msg => {
					this.setTitle(this.data.query.category);
					if(msg.parent && msg.parent.cover2){
						let coverArr = msg.parent.cover2.split(",");
						for (let i=0;i<coverArr.length;i++) {
							this.swiper.push(
								{cover:this.getSiteName+"/upload/images/product/800_"+coverArr[i]}
							)
						}
					}
				});
			},
			ajax() {
			
				
			
			},
			thumb3(key){
				let item = this.data.lists.data[key];
				
				this.postAjax("/articleOrder/thumb",{articleOrder_id:item.id},"notloading").then(msg=>{
					 if(msg.data.status == 2){
						 //this.getParent()
						 //this.$set(item,"thumb",!item.thumb);
						 item.thumb = !item.thumb;
						 if(item.thumb){
							 item.thumbCount ++;
						 }else{
							  item.thumbCount --;
						 }
					 }
				});
			},
		},
		onLoad(options) {
			if(options){
				if(options.showType && options.showType == 'city'){
					this.$set(this.data.query,"cityNew",uni.getStorageSync("city"));
				}else if(options.showType && options.showType == 'town'){
					console.log("009")
					console.log(options.showType)
					this.$set(this.data.query,"townNew",uni.getStorageSync("town"));
				}else if(options.showType && options.showType == 'area'){
					this.$set(this.data.query,"areaNew",uni.getStorageSync("area"));
				}
				setTimeout(()=>{
					this.getAjax(this,this.data.query).then(msg => {
						this.setTitle(this.data.query.category);
						if(options.showType && options.showType == 'city'){
							this.$set(this.data.query,"cityNew",uni.getStorageSync("city"));
						}else if(options.showType && options.showType == 'town'){
							console.log("009")
							console.log(options.showType)
							this.$set(this.data.query,"townNew",uni.getStorageSync("town"));
						}else if(options.showType && options.showType == 'area'){
							this.$set(this.data.query,"areaNew",uni.getStorageSync("area"));
						}
						// if(msg.parent && msg.parent.cover2){
						// 	let coverArr = msg.parent.cover2.split(",");
						// 	for (let i=0;i<coverArr.length;i++) {
						// 		this.swiper.push(
						// 			{cover:this.getSiteName+"/upload/images/product/800_"+coverArr[i]}
						// 		)
						// 	}
						// }
					});
				},2000)
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
			return this.shareSource(this, '选到');
		},
		
		checkAuth(v){
			return this.goto('/pages/index/main',2);
		},
		
	}
</script>
