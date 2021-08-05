<template>
	<section v-if="shareDiv">
		<div class="" v-if="shareBtn == true">
			<!-- <div class="share-overlay"></div> -->
			<div class="pshare-dig">
				<div class="pshare-group">
					<button hover-class="none" class="group-item p0" open-type="share">
						<p class="iconfont icon-pshare-wechat"></p>
						<p class="words">发给好友</p>
					</button>
					<div class="group-item" @click="loadImg(data)">
						<p class="iconfont icon-pshare-save"></p>
						<p class="words">生成二维码海报</p>
					</div>
				</div>
				<div class="cancel-btn" @click="shareBtn = false">取消</div>
			</div>
		</div>
		<div class="poster">
			<image :src="posterFilePath" hidden @load="imageLoad" data-index="0">
			<!-- <image class="img" :src="posterFilePath" v-if="tempFilePath :style="'width:'+images[0].width+'px;height:'+images[0].height+'px;'"></image> -->
			<!--  v-if="!img"" -->
			
			<canvas :style="'width:'+width_+'px;height:'+(images[0].height+200)+'px;left:-999px'" canvas-id="firstCanvas"></canvas>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		props: ["data", "posterFilePath",  "qrcodeFilePath" ,"headimgurl"],
		data() {
			return {
				shareBtn: false,
				height: 0,
				shareDiv: true,
				images: [],
				show: false,
				width_: 0,
				img: '',
				tips:'长按图片购买',
				tips2:'前往购买',
				getSiteName: this.getSiteName(),
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.width_ = res.windowWidth
					this.height = res.windowHeight
				}
			})
		},
		methods: {
			imageLoad(e) {
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width_, //如:375 i6屏宽
					viewHeight = this.width_ / ratio; //计算的高度值
				var image = [];
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image[e.target.dataset.index] = {
					width: viewWidth,
					height: viewHeight
				}
				console.log(image);
				this.images = image;
				
				console.log(2222,this.width_);

				var ctx = uni.createCanvasContext("firstCanvas", this)

				//背景
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, this.width_, this.images[0].height + 200)

				//广告图
				// ctx.drawImage(this.proposterBg, 0, 0, this.width_, this.images[0].height)
				ctx.drawImage(this.posterFilePath, 0, 38, this.width_, this.images[0].height)
				ctx.drawImage('../../static/sharePr-top.jpg', 0, 0, this.width_, 38)

				// this.height = this.images[0].height + 120 ;

				//脚部背景
				ctx.setFillStyle('#fff')
				ctx.fillRect(0,this.images[0].height+38,this.width_,160)

				// 符号
				ctx.setFontSize(14)
				ctx.setFillStyle('#ff4251')
				ctx.fillText('￥', 15, this.images[0].height + 68)

				//售价
				ctx.setFillStyle('#ff4251')
				ctx.font = '22px Arial'
				ctx.fillText(this.data.product.price, 30, this.images[0].height + 68)
				if (this.data.product.new_price) {
					// 原价
					ctx.setFontSize(12)
					ctx.setFillStyle('#999')
					ctx.fillText(this.data.product.new_price, this.data.product.price.length*15+15, this.images[0].height+67)

					//删除线
					ctx.setFillStyle('#aaa')
					ctx.fillRect(this.data.product.price.length*15+14, this.images[0].height+62, this.data.product.new_price.length*6.5, 1)
				}

				// 产品标题
				ctx.setFontSize(16)
				ctx.setFillStyle('#333')
				let productName = this.drawArticle(ctx, this.data.product.name, this.width_ - 140, 15, this.images[0].height + 98)

				// //二维码
				ctx.drawImage(this.qrcodeFilePath, this.width_ - 105, this.images[0].height+60, 90, 90)
				
				// 长按识别
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText(this.tips, this.width_-this.tips.length*12-24, this.images[0].height+166)
				// ctx.fillText(this.tips2, this.width_-this.tips2.length*12-35, this.images[0].height+170)

				// 微信头像
				ctx.drawImage(this.headimgurl, 15, this.images[0].height + 152, 24, 24)
				console.log("微信头像"+this.headimgurl)
				ctx.drawImage('../../static/head-bg.png', 15, this.images[0].height + 152, 24, 24)
				
				// 名称
				ctx.setFontSize(13)
				ctx.setFillStyle('#666')
				if(this.data.dis){
					ctx.fillText(this.data.dis.name + '为你推荐', 48, this.images[0].height + 168)
				}else{
					ctx.fillText('为你推荐', 48, this.images[0].height + 168)
				}


				ctx.draw();

				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: "firstCanvas",
						success: res => {
							console.log("97543");
							this.img = res.tempFilePath;
						},
						fail: res => {}
					}, this)
				}, 1000);
			},
			drawArticle(ctx, kl, width, x, y) {
				let chr = kl.split('') // 分割为字符串数组
				let temp = ''
				let row = []
				for (let a = 0; a < chr.length; a++) {
					if (ctx.measureText(temp).width < width) {
						temp += chr[a]
					} else {
						a--
						row.push(temp)
						temp = ''
					}
				}
				row.push(temp)

				for (var b = 0; b < row.length; b++) {
					// 控制最多显示3行
					if (b < 2) {
						ctx.fillText(row[b], x, y + b * 26);
					}
				}
				let _len = row.length > 2 ? 2 : row.length
				return y + (_len - 1) * 26
			},
			loadImg(data) {
				this.shareBtn = false;
				this.open();
			},
			open() {

				uni.previewImage({
					current: this.img, // 当前显示图片的http链接
					urls: [this.img] // 需要预览的图片http链接列表
				})
			},
			ajax(msg) {
				console.log(msg);
				this.product = msg.product;
				this.dis = msg.dis;
				wx.downloadFile({
					url: this.getSiteName + '/upload/images/product/' + msg.product.poster_cover,
					success: res => {
						this.posterFilePath = res.tempFilePath;
						this.show = true;
						console.log(this.posterFilePath);
						console.log(108);
					},
					fail: res => {
						console.log(res);
					}
				});
			}
		},
	}
</script>
<style type="text/css" scoped="">
/* 分享浮动 */
.pshare-float {position: fixed;right: 10px;bottom: 85px;border-radius: 6px;min-width: 100px;box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);-webkit-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);-moz-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);z-index: 100;}
.pshare-float:before {content: "";display: block;position: absolute;right: 8px;top: -12px;height: 12px;width: 1px;background-color: rgba(0, 0, 0, 0.4);}
.pshare-float .ficon {position: absolute;top: -30px;right: 0;background-color: rgba(0, 0, 0, 0.6);width: 18px;height: 18px;line-height: 18px;text-align: center;border-radius: 50%;}
.pshare-float .fprice {border-bottom: 1px #EE4543 dashed;}
.pshare-float .ftitle {border-radius: 6px 6px 0 0;}
.pshare-float .fbtn .dx-btn-sm {border-radius: 14px;}
.pshare-dig {position: fixed;width: 100%;background: #fff;left: 0;bottom: 0;z-index: 100;border-radius: 30px 30px 0 0;}
.pshare-dig .pshare-group {background: #F3F3F5;display: flex;padding: 40px 10%;border-radius: 30px 30px 0 0;}
.pshare-group .group-item {width: 100%;text-align: center;background: transparent;}
.pshare-group .group-item .iconfont {font-size: 50px;line-height: 60px;}
.pshare-group .group-item .words {font-size: 14px;color: #666;padding-top: 10px;line-height: 20px;}
.pshare-dig .cancel-btn {height: 50px;line-height: 50px;color: #666;text-align: center;font-size: 15px;}
.poster {display: flex;align-items: center;justify-content: center;position: absolute;left: -1300px;height: 100%;bottom: 0;}
/* position: absolute;left: -1300px;height: 100%;bottom: 0; */
</style>
