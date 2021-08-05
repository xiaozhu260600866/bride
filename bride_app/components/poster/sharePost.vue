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
					<div class="group-item" @click="loadImg()">
						<p class="iconfont icon-pshare-save"></p>
						<p class="words">生成二维码海报</p>
					</div>
				</div>
				<div class="cancel-btn" @click="shareBtn = false">取消</div>
			</div>
		</div>
		<div class="poster">
			<image :src="cover" hidden mode="widthFix" @load="imageLoad" class="w-b100"></image>
			<image  :src="img" hidden mode="widthFix"></image>
			<canvas :style="'width:'+width+'px;height:'+height2+'px;left:-999px'" canvas-id="firstCanvas"></canvas>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		props: ["ruleform"],
		data() {
			return {
				getSiteName: this.getSiteName(),
				shareBtn: false,
				shareDiv: true,
				width: 0,
				height: 0,
				height2:600,
				imgWidth: 0,
				imgHeight: 0,
				bgHight:0,
				tips:'长按识别二维码',
				tips2:'查看详情',
				content:'在做弹框的时候，如果是从top、bottom出来，会自动填满宽度，但是从center出来，就只是内容大小。怎么样给父级设置宽度也没用。如果设置固定值，就不能做到自适应。尝试过用vue的方法，但是不成功，用微信小程序的方法会在编译的时候报错 ，虽然运行的时候没问题。',
				len:0,
				len2:0,
				img: '',
				cover:'/static/fenxiaobg.jpg',
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(111);
					this.width = res.windowWidth
					this.height = res.windowHeight
				}
			});
			console.log(2222,this.width,this.height);
		},
		methods: {
			imageLoad(e) {
				console.log("90867")
				var $width = e.detail.width, //获取图片真实宽度
					$height = e.detail.height,
					ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width, //如:375 i6屏宽
					viewHeight = this.width / ratio, //计算的高度值
					bgHeight = viewHeight;
				var image = [];
				this.imgWidth = viewWidth;
				this.imgHeight = viewHeight;
				this.bgHight = bgHeight
				console.log(33333,this.imgWidth,this.imgHeight,this.bgHeight);
				
				var ctx = uni.createCanvasContext('firstCanvas',this);
			
				// 内容
				ctx.setFontSize(14)
				ctx.setFillStyle('#fff')
				console.log(this.ruleform.title);
				let detail2 = this.drawArticle(ctx, this.ruleform.title, this.width-50, 20, 180)
				ctx.fillText(this.ruleform.title, 20, 180)
			
				
				ctx.setFillStyle('#fff')
				ctx.fillRect(0, 0, 375, this.height2)
				
				// 类别名称
				ctx.setFontSize(16)
				ctx.setFillStyle('#000')
				// ctx.fillText(this.ruleform.category, 20, 55)
				let category = this.drawArticle2(ctx, this.ruleform.category, this.width-160, 20, 40)
				
				// 发布时间
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText(this.ruleform.created_at, 20, 45+this.len2*22)
				
				// 浏览人数
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText(this.ruleform.views+'人浏览', 20, 65+this.len2*22)
				
				// // 二维码
				 ctx.drawImage(this.ruleform.qrcodeFilePath,this.width-110, 15, 100, 100)
				
				// 浏览人数
				ctx.setFontSize(12)
				ctx.setFillStyle('#999')
				ctx.fillText(this.tips, this.width-this.tips.length*12-18, 130)
				ctx.fillText(this.tips2, this.width-this.tips2.length*12-35, 146)
				
				// 内容
				ctx.setFontSize(14)
				ctx.setFillStyle('#333')
				let detail = this.drawArticle(ctx, this.ruleform.title, this.width-50, 20, 180)
				
				
				//图片
				ctx.drawImage(this.ruleform.productFirstCover,15, 180+this.len*30, this.imgWidth-30,this.imgHeight)
				
				
				console.log(44444)
				
				ctx.draw();
				this.height2 = this.imgHeight+200+this.len*30;
				
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: "firstCanvas",
						success: res => {
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
					// 控制最多显示5行
					if (b < 5) {
						ctx.fillText(row[b], x, y + b * 30);
					}
					// console.log(666, b);
				}
				var _len = row.length > 5 ? 5 :row.length
				this.len = _len;
				console.log(777, _len,b,this.len);
				return y + (_len - 1) * 30
			},
			drawArticle2(ctx, kl, width, x, y) {
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
					// 控制最多显示5行
					if (b < 5) {
						ctx.fillText(row[b], x, y + b * 22);
					}
					// console.log(666, b);
				}
				var _len = row.length > 5 ? 5 :row.length
				this.len2 = _len;
				console.log(777, _len,b,this.len);
				return y + (_len - 1) * 30
			},
			loadImg() {
				this.shareBtn = false;
				this.open();
			},
			open() {

				uni.previewImage({
					current: this.img, // 当前显示图片的http链接
					urls: [this.img] // 需要预览的图片http链接列表
				})
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
.poster {display: flex;align-items: center;justify-content: center;position: absolute;left: -1300px;height: 100%;}
</style>
