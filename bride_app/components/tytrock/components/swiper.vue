<template>
    <div style="position: relative;z-index: 1;padding: 0 30upx;border-radius: 12upx;">
		
        <swiper class="swiper w-b100" :indicator-dots="indicatorDots" :indicator-active-color="indicatorDotsActColor" :vertical="false" :autoplay="true" :duration="100" :circular="true" :style="'height:'+imgheights[current]+'rpx'">
            <swiper-item v-for="(item,index) in lists" v-if="item" class="w-b100">
				<image class="bdr6 w-b100" :src="item.coverUrl"  @load="imageLoad" :style="'height:'+imgheights[current]+'rpx;'"   @click="clickCover(item)"/>
            </swiper-item>
        </swiper>
    </div>
	<!-- width:'+imgwidth+'rpx;' -->
</template>
<script>
export default {
	props:{
		data:{
			type: Array,
			default: []
		},
		purl:{
			type: Array,
			default: []
		},
		indicatorDots:{
			type: Boolean,
			default: true
		},
		indicatorDotsActColor:{
			type: String,
			default: "#000000"
		}
	},
    data() {
        return {
			lists:this.data,
            vertical: false,
            autoplay: true,
            duration: 100,
            circular: true,
            imgheights: [],
            imgwidth: 750,
            current: 0,
        }
    },
	watch:{
		data(value){
			this.lists = value
		}
	},
    methods: {
		clickCover(item){
			if(item.url){
				this.goto(item.url,1);
			    return false;
			}
			if(item.cover){
			   this.previewImage(item.cover,this.purl)
			}
			
		},
        imageLoad(e) {
            var imgwidth = e.mp.detail.width,
                imgheight = e.mp.detail.height,
                ratio = imgwidth / imgheight;
            var viewHeight = 750 / ratio;
            var imgheight = viewHeight
            var imgheights = this.imgheights;
            imgheights.push(imgheight)
            this.imgheights = imgheights;
        },
    }
}

</script>
<style>
</style>
