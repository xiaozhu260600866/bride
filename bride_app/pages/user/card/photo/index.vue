<template>
	<view class="pb50">
		<page></page>
		<view class="bg-white"></view>
		<view class="pb10 zindex2" v-if="data.show">
			<image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :server-url-delete-image="serverUrlDeleteImage" :server-url="serverUrl" :form-data="uploadImageData" :showUploadProgress="true" fileKeyName="file"></image-upload>
			<!-- <view id="footer-btn">
				<view class="f-dx-btn dx-btn-red">编辑</view>
			</view> -->
		</view>
	</view>
</template>

<script>

import imageUpload from "@/components/tytrock/components/image-upload"
export default {
	components: {
		imageUpload
	},
	data() {
		return {
			formAction: '/user/photo/lists',
			imageData:[],
			getSiteName: this.getSiteName(),
			data: this.formatData(this),
			uploadImageData: {
				token: '',
				type: "image",
				pathname: '',
				thumbsize: "200"
			},
			serverUrl:   this.getSiteName() + '/ajax/app-upload-pic',
			serverUrlDeleteImage: this.$store.state.apiInterfaceUrl + '/base/upload-delete',
		}
	},
	onLoad: function(option){
		this.ajax();
	},
	onShow(){
		// photos({}).then((res)=>{
		// 	let imageDataTemp = [];
		// 	res.data.lists.forEach((element)=>{
		// 		imageDataTemp.push(element.url);
		// 	})
		// 	this.imageData = imageDataTemp;
		// })
	},
	methods: {
		ajax() {
			this.getAjax(this).then(msg => {
				if(msg.lists.data.length){
					msg.lists.data.forEach(v=>{
						this.imageData.push(v.url);
					});
				}
			});
		},
		addImage(res){
			console.log(res);
			let uploadArr = res.currentImagesPath;
			let uploadStr = '';
			let imageName = '';
			for(let i=0; i<uploadArr.length;i++){
				imageName = uploadArr[i];
				uploadStr += imageName;
			}
			this.postAjax('/user/photo/create',{url:uploadStr}).then(msg=>{
				 if(this.data.status == 2){
					 this.ajax();
				 }
			});
			// photo({action: 'upload', images: uploadStr}).then((res)=>{
				
			// })
		},
		deleteImage(e){
			this.postAjax('/user/photo/del',{url:e.currentImage}).then(msg=>{
				 if(this.data.status == 2){
					 this.ajax();
				 }
			});
		}
	}
}
</script>