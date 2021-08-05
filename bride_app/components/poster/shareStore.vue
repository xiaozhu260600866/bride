<template>
	<view v-if="shareDiv">
		<!-- 生成海报 -->
		<div class="" v-if="shareBtn == true">
			<div class="share-overlay"></div>
			<div class="pshare-dig">
				<div class="pshare-group">
					<button hover-class="none" class="group-item p0" open-type="share">
						<p class="iconfont icon-pshare-wechat"></p>
						<p class="words">发给好友</p>
					</button>
					<div class="group-item" @tap="shareFc()">
						<p class="iconfont icon-pshare-save"></p>
						<p class="words">生成二维码海报</p>
					
					</div>
				</div>
				<div class="cancel-btn" @click="shareBtn = false">取消</div>
			</div>
		</div>
		<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
		<!-- 图片展示由自己实现 -->
		<QSPopup ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button class="plr50" type="primary" size="medium" @tap.prevent.stop="saveImage()">保存图片</button>
					<button class="plr40" type="info" size="medium" @tap.prevent.stop="offCanvas()">取消</button>
				</view>
			</view>
		</QSPopup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import QSPopup from '@/components/js_sdk/QS-popup.vue';
	import _app from '@/components/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/components/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	export default {
		props: ["data", "posterFilePath", "proposterBg", "qrcodeFilePath", "fingerprint","headimgurl"],
		components:{QSPopup},
		data() {
			return {
				shareBtn: false,
				shareDiv: true,
				getSiteName: this.getSiteName(),
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId',
				count: 0,
				store:{
					name:'东信商家'
				},
				products:{
					name:'华为 HUAWEI P30 Pro 超感光徕卡四摄10倍混合变焦麒麟980芯片屏内指纹 8GB+128GB极光色全网通版双4G手机',
					price:'4999.00',
					oldPrice: '5499.00',
					getUser:{
						name:'东信科技-梅',
						headerPic:'/static/fenxiaobg.jpg'
					},
					qrcode:'https://boss.doxinsoft.com/images/wap/qrcode.jpg'
				}
			}
		},
		methods: {
			
			async shareFc() {
				console.log("posterFilePath",this.posterFilePath)
				
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10,
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
						return [{
						// 产品图
							type: 'image',
							id: 'productImage',
							url: 'https://456-0310.doxinsoft.com/upload/images/user/YnCcsYjjEM.jpg',
							serialNum: 0,
							allInfoCallback({
								drawArray
							}) {
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								return {
									dx: 0,
									dy: titleImg.dHeight,
								}
							},
							infoCallBack(imageInfo) {
								let width;
								let height;
								if (imageInfo.width > imageInfo.height) {
									width = imageInfo.width > 700 ? 700 : imageInfo.width;
									height = width / imageInfo.width * imageInfo.height;
								} else {
									height = imageInfo.height > 700 ? 700 : imageInfo.height;
									width = height / imageInfo.height * imageInfo.width;
								}
								if (width < 500) {
									width = 500;
									height = width / imageInfo.width * imageInfo.height;
								}
								let addHeight = 260;
								let addWidth = 640;
								let addRatio = addHeight / addWidth
								setBgObj({
									width,
									height: width*addRatio + height
								});
								return {
									dWidth: width,
									dHeight: height,
									addHeight: addHeight,
									addRatio: addRatio,
								}
							}
							
						},
						// 标题图
						{
							type: 'image',
							url: '/static/sharePr-top.jpg',
							id:'titleImg',
							dx: 0,
							dy: 0,
							infoCallBack(imageInfo) {
								let width;
								let height;
								width = getBgObj().width;
								height = width / imageInfo.width * imageInfo.height;
								setBgObj({
									width: getBgObj().width,
									height: getBgObj().height + height
								});
								return {
									dWidth: width,
									dHeight: height,
								}
							}
						},
						// 背景色
						{
							type: 'custom',
							serialNum: 0,
							allInfoCallback({
								drawArray
							}) {
								const productImage = drawArray.find(item => item.id === 'productImage')
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								console.log(6666,titleImg.dHeight)
								console.log(777777777,productImage.addRatio,productImage.dWidth)
								return {
									setDraw(Context) {
										Context.setFillStyle('white');
										Context.setGlobalAlpha(1);
										Context.fillRect(0, productImage.dHeight+titleImg.dHeight, productImage.dWidth, productImage.dWidth*productImage.addRatio);
										Context.setGlobalAlpha(1);
									}
								}
							}
						},
						// 商家名称
						{
							type: 'text',
							text: _this.data.detail.userInfo.company_name,
							color: '#000',
							id: 'storeName',
							serialNum: 3,
							allInfoCallback({
								drawArray
							}) {
								const productImage = drawArray.find(item => item.id === 'productImage')
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								const addHeight = productImage.dWidth*productImage.addRatio;
								return {
									size: getBgObj().width * 0.05,
									lineFeed: {
										maxWidth: getBgObj().width * 0.55,
										lineNum: 2,
										lineHeight:  getBgObj().width * 0.06
									},
									dx: 15 ,
									dy: titleImg.dHeight + productImage.dHeight + addHeight*0.2,
								}
							}
						},
						// 分享人头像
						{
							type: 'image',
							url: _this.products.getUser.headerPic,
							id:'userHead',
							allInfoCallback({
								drawArray
							}) {
								const productImage = drawArray.find(item => item.id === 'productImage')
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								const addHeight = productImage.dWidth*productImage.addRatio;
								return {
									dx: 0,
									dy: titleImg.dHeight + productImage.dHeight + addHeight*0.62,
								}
							},
							infoCallBack(imageInfo) {
								let scale = getBgObj().width * 0.1 / imageInfo.height;
								return {
									circleSet: {
										x: imageInfo.width * scale / 2,
										y: getBgObj().width * 0.1 / 2,
										r: getBgObj().width * 0.1 / 2
									}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
									dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
									dHeight: getBgObj().width * 0.1,
									/* roundRectSet: { // 圆角矩形
										r: imageInfo.width * .1
									} */
								}
							}
						},
						// 分享人名称
						{
							type: 'text',
							text: _this.products.getUser.name+'为你推荐',
							color: '#434343',
							serialNum: 4,
							id: 'userName',
							allInfoCallback({
								drawArray
							}) {
								const productImage = drawArray.find(item => item.id === 'productImage')
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								const addHeight = productImage.dWidth*productImage.addRatio;
								const headWidth = drawArray.find(item => item.id === 'userHead')
								return {
									size: getBgObj().width * 0.035,
									lineFeed: {
										maxWidth: getBgObj().width * 0.5,
										lineNum: 1
									},
									dx: headWidth.dWidth,
									dy: titleImg.dHeight + productImage.dHeight + addHeight*0.76,
								}
							}
						},
						// 二维码
						{
							type: 'image',
							url: _this.data.merchantCode,
							id:'qrocode',
							allInfoCallback({
								drawArray
							}) {
								const productImage = drawArray.find(item => item.id === 'productImage')
								const titleImg = drawArray.find(item => item.id === 'titleImg')
								const addHeight = productImage.dWidth*productImage.addRatio;
								return {
									dx: getBgObj().width- getBgObj().width * 0.35,
									dy: titleImg.dHeight + productImage.dHeight + addHeight * 0.12,
								}
							},
							infoCallBack(imageInfo) {
								return {
									dWidth: getBgObj().width * 0.32,
									dHeight: getBgObj().width * 0.32,
								}
							}
						}]
					}
				})
				_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
				this.posterImage = d.poster.tempFilePath;
				this.$refs.popup.show();
				this.shareBtn = false;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			offCanvas(){
				this.$refs.popup.hide()
			},
			saveImage() {
				// #ifndef H5
				
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImage,
					success(res) {
						console.log("gohere");
						_app.showToast('保存成功');
					},
					fail:res=>{
						console.log(this.posterImage)
						console.log(this.poster)
						console.log(res);
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.posterImage, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.$refs.popup.hide()
			}
		}
	}
</script>

<style>
	.hideCanvasView {position: relative;}
	.hideCanvas {position: fixed;top: -99999upx;left: -99999upx;z-index: -99999;}
	.flex_row_c_c {display: flex;flex-direction: row;justify-content: center;align-items: center;}
	.modalView {width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;opacity: 0;outline: 0;transform: scale(1.2);perspective: 2500upx;background: rgba(0, 0, 0, 0.6);transition: all .3s ease-in-out;pointer-events: none;backface-visibility: hidden;z-index: 999;}
	.modalView.show {opacity: 1;transform: scale(1);pointer-events: auto;}
	.flex_column {display: flex;flex-direction: column;}
	.backgroundColor-white {background-color: white;}
	.border_radius_10px {border-radius: 10px;}
	.padding1vh {padding: 1vh;}
	.posterImage {width: 80vw;}
	.flex_row {display: flex;flex-direction: row;}
	.marginTop2vh {margin-top: 2vh;}
	
	
	/* 分享按钮组 */
	.pshare-dig {position: fixed;width: 100%;background: #fff;left: 0;bottom: 0;z-index: 100;border-radius: 30px 30px 0 0;}
	.pshare-dig .pshare-group {background: #F3F3F5;display: flex;padding: 40px 10%;border-radius: 30px 30px 0 0;}
	.pshare-group .group-item {width: 100%;text-align: center;background: transparent;}
	.pshare-group .group-item .iconfont {font-size: 50px;line-height: 60px;}
	.pshare-group .group-item .words {font-size: 14px;color: #666;padding-top: 10px;line-height: 20px;}
	.pshare-dig .cancel-btn {height: 50px;line-height: 50px;color: #666;text-align: center;font-size: 15px;}
	.poster {display: flex;align-items: center;justify-content: center;}
</style>
