<template>
	<view>
		<!-- 如果是开关 -->
		<view :class="['dx-cell','dx-cell_switch',className]" v-if="type == 'switch'">
			<view class="dx-cell_bd">
				<view class="dx-label">{{ label }}</view>
			</view>
			<view class="dx-cell_ft">
				<switch @change="changeRadio($event)" :checked="currentValue ? true : false" style="zoom: 80%;" />
			</view>
		</view>
		<!-- 如果是开关结束 -->
		<!-- 如果是定位 -->
		<view :class="['dx-cell',className]" v-if="type == 'location'">
			<view :class="['dx-cell_hd']">
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['dx-cell_bd']">
				<input class="dx-input nowrap" type="text" @input="updateVal" placeholder="请选择您的位置信息" :disabled="disabled"
				 :value="currentValue">
			</view>
			<view class="dx-cell_ft">
				<view :class="['fs12','location-nav',navClass ? navClass : 'dx-btn-green']" @click="changeLocation">定位</view>
			</view>
		</view>
		<!-- 如果是定位结束 -->
		<!-- 如果是文本 -->
		<view :class="['dx-cell',className]" v-if="type == 'text' || type == 'textarea' || type == 'password' || type == 'number' || type == 'digit' || type == 'txt' || type == 'tel'">
			<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view :class="['dx-cell_hd']">
				<slot name="left" />
				<view class="dx-label" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['dx-cell_bd']">
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'text'"
				 :disabled="disabled" :value="currentValue" :focus="focus" @input="updateVal" />
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'number'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="number" />
				 <input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'tel'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="tel" />
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if="type == 'digit'"
				 :disabled="disabled" @input="updateVal" :value="currentValue" :focus="focus" type="digit" />
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" @input="updateVal"
				 v-if="type == 'password' && currentValue != undefined" :disabled="disabled" type="password" />
				<textarea maxlength="-1" class="dx-text dx-input ptb5" :placeholder="placeholder ? placeholder :'请输入'+label"
				 @input="updateVal" v-if="type == 'textarea'" style="height:80px" :disabled="disabled" :value="currentValue" />
				<view v-if="type == 'txt'">{{currentValue }}</view>
				
				<slot name="middle" />
			</view> 
			<view class="dx-cell_ft dx_ft-access" v-if="arrow"></view>
			<slot name="right" />
		</view>
		<!-- 如果是文本结束 -->
		<!-- 如果是发送验证码开始 -->
		<view :class="['dx-cell',className]" v-if="type == 'sms'" >
			<view :class="['dx-cell_hd']">
				<slot name="left" />
				<view class="dx-label" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['dx-cell_bd']">
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="disabled"   :focus="focus" @input="bingPhoneCode"/>
				<slot name="middle" />
			</view>
			  <button class="dx-btn dx-btn-green" @click="toSms">{{ smsTitle }}</button>
		</view>
		<!-- 如果是发送验证码结束 -->
		
		<!-- 如果是多选 -->
		<view :class="['dx-cell',className,radioType ? 'radioType' : '']" v-if="type == 'checkbox'">
			<view :class="['dx-cell_hd']">
				<slot name="left" />
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['dx-cell_bd']">
				<checkbox-group @change="checkboxChange">
					<!-- 横向报局 -->
					<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
					 :disabled="disabled" :value="currentValue"  hidden/>
					<label class="dx-cell mei-label dx-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType">
						<view class="dx-cell_hd dx-check_hd_in-checkbox">
							<checkbox :value="changeField == 'value' ? item.value :item.label" color="#FFCC33" style="transform:scale(0.7)" v-if="!item.checked"/>
							<checkbox :value="changeField == 'value' ? item.value :item.label" checked="true" color="#FFCC33" style="transform:scale(0.7)"  v-else/>
						</view>
						<view class="dx-cell_bd">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="dx-cell mei-label dx-check__label"  v-for="item in data" v-if="radioType">
						<view class="dx-cell_hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="dx-cell_bd">{{item.label}}</view>
						<view class="dx-cell_ft dx-check_hd_in-checkbox" >
							<checkbox :value="changeField == 'value' ? item.value :item.label" color="#FFCC33" style="transform:scale(0.7)" v-if="!item.checked"/>
							<checkbox :value="changeField == 'value' ? item.value :item.label" checked="true" color="#FFCC33" style="transform:scale(0.7)"  v-else/>
						</view>
					</label>
				</checkbox-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是多选结束 -->
		<!-- 如果是单选 -->
		<view :class="['dx-cell',className, radioType ? 'radioType' : '']" v-if="type == 'radio'">
			<view class="dx-cell_hd" v-if="label">
				<slot name="left" />
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd">
				<radio-group @change="radioChange">
					<!-- 横向报局 -->
					<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
					 :disabled="disabled" :value="currentValue"  hidden/>
					<label class="dx-cell mei-label dx-check__label" style="display:inline-block;padding-left: 0px" v-for="item in data" v-if="!radioType" :key="item.label">
					
						<view class="dx-cell_hd dx-check_hd_in-checkbox" >
							<!-- 未选中 -->
							<radio :value="item[changeField]" checked="true" v-if="item.checked"/>
							<radio :value="item[changeField]" v-else/>
						</view>
						<view class="dx-cell_bd">{{item.label}}</view>
					</label>
					<!-- 竖向报局 -->
					<label class="dx-cell mei-label dx-check__label" v-for="item in data" v-if="radioType">
						
						<view class="dx-cell_hd" v-if="item.icon">
							<span :class="item.icon"></span>
						</view>
						<view class="dx-cell_bd">{{item.label}}</view>
						<view class="dx-cell_ft dx-check_hd_in-checkbox" >
							<radio :value="changeField == 'value' ? item.value :item.label" checked="true" v-if="item.checked"/>
							<radio :value="changeField == 'value' ? item.value :item.label" v-else/>
						</view>
						
					</label>
				</radio-group>
			</view>
			<slot name="right" />
		</view>
		<!-- 如果是单选结束 -->
		
			<!-- 如果是select -->
		<view :class="['dx-cell',className]" v-if="type == 'select'">
			<view class="dx-cell_hd" v-if="label">
				<slot name="left" />
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd text-right">
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
				 :disabled="disabled" :value="currentValue"  hidden/>
				<div v-if="disabled">
					<span class="fs14">{{ currentValue }}</span>
				</div>
				<div v-else>
					<picker :value="selectKey" class="order-picker" style="wdith:100%"  :range="data" :range-key="selectLabel" @change="selectRes">
						<view class="picker" v-if="currentValue">
							{{currentValue}}
						</view>
						<view class="picker" v-else>
							{{placeholder?placeholder:'请选择'+label }}
						</view>
					</picker>
				</div>
			</view>
			<view class="dx-cell_ft dx_ft-access" v-if="!disabled"></view>
			<slot name="right" />
		</view>
		<!-- 如果是select结束 -->
		
		<!-- 如果是manyselect -->
		<view :class="['dx-cell',className]" v-if="type == 'manyselect'" @click="chooseFclass">
			<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view class="dx-cell_hd">
				<slot name="left" />
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd">
				<div class="fc-6 nowrap">
					{{ manyselectValue ?manyselectValue :'请选择'+label }}
				</div>
			</view>
			<view class="dx-cell_ft dx_ft-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是select结束 -->
		
		<!-- 如果是多张图片上传 -->
		<view :class="['dx-cell',className]" style="min-height: 160rpx" v-if="type == 'upload'">
			<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" v-if=" currentValue != undefined"
			 :disabled="disabled" :value="currentValue"  hidden/>
			<view class="dx-cell_hd" v-if="label">
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd">
				<div :class="['upload-img',className]">
					<div class="imageLists">
						<div class="il-item" v-for="item in currentValue">
							<img :src="uploadPath+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height:160rpx;width:160rpx" :class="loading">
							<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
								<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
							</p>
						</div>
					</div>
					<div class="uploadvalue" v-if="currentValue && currentValue.length<allowUpLoadNum">
					
						<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
							<!--  <input id="picul1" class="dx-uploader__input"  type="file" accept="image/*"> -->
							<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
							<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
						</button>
					</div>
					<div class="clear"></div>
				</div>
			</view>
		</view>
		<!-- 如果是滚动图片上传 -->
		<div :class="['upload-img',className]" style="min-height: 160rpx" v-if="type == 'scrollUpload'">
			<div class="imageLists" style="display: flex;white-space: nowrap;">
				<scroll-view scroll-x="true">
					<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
						<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
						<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
					</button>
					<div class="il-item" v-for="item in currentValue">
						<img :src="loading ? '' :getSiteName+'/upload/images/'+upurl+'/'+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height:160rpx;width:160rpx" :class="loading" @click="scrollUploadCallBack(item)">
						<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
							<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
						</p>
					</div>
					<slot name="img" />
				</scroll-view>
			</div>
		</div>
		<!-- 如果是滚动图片上传结束 -->

		<!-- 如果是单张图片上传 -->
		<view :class="['dx-cell',className]" style="min-height: 160rpx" v-if="type == 'singleUpload'">
			<view class="dx-cell_hd" v-if="label">
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd">
				<div :class="['upload-img',className]">
					<div class="oneImages" v-for="item in currentValue">
						<img :src="uploadPath+item" v-if="currentValue" lazy-load="true" mode="aspectFill" data-name="pic" style="height: 100%;width: 100%" >
						<p class="del-img text-center" @click="delImage" data-name="pic" :data-key="index">
							<span class="iconfont icon-xiaozhu-del fs12 fs-white"></span>
						</p>
					</div>
					<div class="uploadvalue">
						<button hover-class="none" type="button" @click="uploadImage" data-thumbsize="300" :data-upurl="upurl" :data-allowuploadnum="allowUpLoadNum" :data-type="uploadtype">
							<text class="iconfont icon-release-addimg" style="font-size: 30px;color:#ccc"></text>
							<p class="imgTxt" v-if="txtType == 'imgTxt'">{{ imgTxt }}</p>
						</button>
					</div>
					<div class="clear"></div>
				</div>
			</view>
		</view>
		<!-- 如果是单张图片上传结束 -->
		<!-- 如果是日期 -->
		<view :class="['dx-cell',className]" v-if="type == 'date'">
			<view class="dx-cell_hd">
				<slot name="left" />
				<view class="dx-label" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd text-right">
				<picker :value="selectKey" class="date-picker" style="width:100%"  mode="date" @change="bindDateChange" :start="startDate" :end="endDate">
					<view class="picker" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker" v-else>
						{{placeholder ? placeholder :'请输入'+label}}
					</view>
				</picker>
			</view>
			<view class="dx-cell_ft dx_ft-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是日期结束 -->

		<!-- 如果是时间 -->
		<view :class="['dx-cell',className]" v-if="type == 'time'">
			<view class="dx-cell_hd">
				<slot name="left" />
				<view class="dx-label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view class="dx-cell_bd">
				<picker :value="currentValue" class="date-picker" style="width:100%" mode="time" @change="bindTimeChange" :start="startTime" :end="endTime">
					<view class="picker" v-if="currentValue">
						{{currentValue}}
					</view>
					<view class="picker" v-else>
						请选择{{ label }}
					</view>
				</picker>
			</view>
			<view class="dx-cell_ft dx_ft-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是时间结束 -->
		
		<!-- 如果是点击触发 -->
		<view :class="['dx-cell',className]" v-if="type == 'clickback'">
			<view :class="['dx-cell_hd']">
				<slot name="left" />
				<view class="dx-label" v-if="label"><span class="fc-red" v-if="isRequire">*</span>{{ label }}</view>
			</view>
			<view :class="['dx-cell_bd','text-right']" @click="clickBack">
				<input class="dx-input nowrap" :placeholder="placeholder ? placeholder :'请输入'+label" :disabled="true" :value="currentValue" :focus="focus" />
				<slot name="middle" />
			</view> 
			<view class="dx-cell_ft dx_ft-access"></view>
			<slot name="right" />
		</view>
		<!-- 如果是点击触发结束 -->
		
		
		</view>
</template>
<script>
export default {
	props: ['dataKey','value', 'label', 'type', 'upurl', 'allowUpLoadNum', 'className',  'disabled', 'placeholder', 'changeField', 'uploadtype', 'name', 'datatype','navClass','imgTxt','txtType','focus','phone',"action",'radioType','fromStartDate','fromEndDate','fromStartTime','fromEndTime','uploadAction','uploadPath','selectLabel','startKey','arrow'],
	data() {
		return {
			chooseArr: [],
			data:[],
			chooseValue: '',
			check: false,
			manyselectValue: '',
			condition: false,
			isRequire: false,
			canSend:true,
			selectKey:0,
			selectManyKey:[0,0],
			smsTitle:'发送验证码',
			timer:'',
			startDate:'',
			endDate:'',
			startTime:'',
			endTime:'',

		}
	},
	onUnload(){
		clearInterval(this.timer);
	},
	methods: {
		updateVal(e){
			this.currentValue = e.mp.detail.value;
		},
		bingPhoneCode(e){
			this.currentValue = e.mp.detail.value;
		},
		toSms(){
			setTimeout(()=>{
				 var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
                    if (!phoneReg.test(this.phone || !this.phone)) {
                        this.getError("手机格式不正确");
                        return false;
                    }
                    if(this.canSend){
						this.postAjax(this.action,{phone:this.phone}).then(msg=>{
							 if (msg.data.status == 2) {
							       this.canSend = false;
							       var num = 60;
							       wx.setStorageSync('smsCode', msg.data.code);
							       this.timer = setInterval(() => {
							           num--;
							           if (num == 0) {
							               clearInterval(this.timer);
							               this.canSend = true;
							               this.smsTitle = "发送验证码";
							           } else {
							               this.smsTitle = num + "秒";
							           }
							       }, 1000)
							
							 }
						});
                    }

			},200);
		},
		scrollUploadCallBack(item){
				this.$emit("callBack",item);
		},
		chooseFclass() {
			this.condition = !this.condition;
		},
		changeRadio(event) {
			this.currentValue = !this.currentValue;
		},
		changeLocation() {
			uni.chooseLocation({
				success: msg => {
					
					this.currentValue = msg.name;
					this.$emit('callback', msg);
				}
			});
		},
		comfirm() {
			this.chooseFclass();
			let parentValue = this.data[this.selectManyKey[0]];
			
			if (!this.data[this.selectManyKey[0]].children || this.data[this.selectManyKey[0]].children.length == 0) {
				this.selectManyKey.splice(1, 1);
				this.manyselectValue = parentValue.label;
				this.currentValue = parentValue.label;
				this.$emit('callback', [parentValue]);
			} else {
				let sonValue = parentValue.children[this.selectManyKey[1]];
				this.manyselectValue = parentValue.label + "->" + sonValue.label;
				this.currentValue = parentValue.label + "," + sonValue.label;
				this.$emit('callback', [parentValue, sonValue]);
			}

		},
		bingInput(e) {
			this.currentValue = e.mp.detail.value;
		},
		selectRes(e) {
			this.currentValue = this.data[e.mp.detail.value][this.changeField];
			
			//console.log(this.currentValue)
			this.$emit('callback', this.data[e.mp.detail.value]);

		},
		bindChange(e) {
			if (this.selectManyKey[0] != e.mp.detail.value[0]) {
				this.selectManyKey = [e.mp.detail.value[0], 0];
			} else {
				this.selectManyKey = e.mp.detail.value;
			}


		},
		bindDateChange(e) {
			this.currentValue = e.mp.detail.value;
		},
		bindTimeChange(e){
			console.log(e)
			this.currentValue = e.mp.detail.value;
		},
		checkboxChange(e) {
			 let chooseArr = [];
			this.chooseArr = e.mp.detail.value;
			let parent = this.getParent(this);
			parent[this.dataKey].forEach((v, i) => {
				if (this.in_array(v.value, this.chooseArr)) {
					this.$set(parent[this.dataKey][i], "checked", true);
				} else {
					this.$set(parent[this.dataKey][i], "checked", false);
				}
				if (v.checked) {
					chooseArr.push(v.value);
				}

			});
			this.currentValue = chooseArr;
		},
		radioChange(e) {
			this.chooseValue = e.mp.detail.value;
			var chooseData = "";
			let parent = this.getParent(this);
			parent[this.dataKey].forEach((v, i) => {
				if (v[this.changeField] == this.chooseValue) {
					this.$set(parent[this.dataKey][i], "checked", true);
				} else {
					this.$set(parent[this.dataKey][i], "checked", false);
				}
				if (v.checked) {
					this.chooseValue = v[this.changeField];
					chooseData = v;
				}

			});
			this.$emit("radioCallBack",chooseData);
			this.currentValue = this.chooseValue;
		},
		in_array(value, arr) {
			let res = false;
			if (!arr) return false;
			arr.forEach((v) => {
				if (v == value) {
					res = true;
				}
			});
			return res;
		},
		uploadImage(event) {
		
			let name = event.mp.currentTarget.dataset.name;
			let upurl = event.mp.currentTarget.dataset.upurl;
			let thumbsize = event.mp.currentTarget.dataset.thumbsize;
			let allowuploadnum = event.mp.currentTarget.dataset.allowuploadnum;
			if (this.currentValue) {
				if (this.currentValue.length >= parseInt(allowuploadnum)) {
					this.getError("只允许上传" + allowuploadnum + "图片");
					return false;
				}

			}
			let uploadUrl = this.uploadAction;
			uni.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					var tempFilePaths = res.tempFilePaths;
					uni.showLoading({
						title: '上传中',
					})
					uni.uploadFile({ //上传服务器
						url: uploadUrl, //仅为示例，非真实的接口地址
						thumbsize: 300,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							//'content-type': 'multipart/form-data'
						},
						formData: {
							'upurl': upurl,
						},
						success: res => {
							let data = JSON.parse(res.data);
							let file = data.filename;
							let fileArr = this.currentValue;
							fileArr.push(file);
							//if (!this.currentValue) this.currentValue = [];
							this.currentValue=fileArr;
							
							//this.postAjax("/ajax/image-resize", { type: upurl, value: file, size: [thumbsize] }, msg => {}, this);
							uni.hideLoading();
						},
						fail: function(res) {
							
						},
						complete: function(res) {
							
						}
					})
				}
			})
		},
		delImage(event) {
			let name = event.mp.currentTarget.dataset.name;
			let key = event.mp.currentTarget.dataset.key;
			wx.showModal({
				title: '提示',
				content: "是否真的删除?",
				success: res => {
					if (res.confirm) {
						this.currentValue.splice(key, 1);
					} else if (res.cancel) {
						
					}
				}
			})
		},
		clickBack(){
			this.$emit('clickBack');
		}
	},
	computed: {
		currentValue: {
			// 动态计算currentValue的值
		
			get: function() {
				
				if (this.datatype) {
					if (this.datatype.indexOf('require') != -1 || this.datatype == "array") {
						this.isRequire = true;
					}
				} else {
					this.isRequire = false;
				}
				
				/*验证规则开始*/
				var parent = this.$parent;
			
				if (this.name && this.value == undefined) {
					if (this.type == 'upload' && this.allowUpLoadNum > 0) {
						this.$set(parent.ruleform, this.name, []);
					} else {
						this.$set(parent.ruleform, this.name, '');
						
					}

				}
				console.log(parent)
				if (this.datatype && parent.vaildate && parent.vaildate[this.name] == undefined) {
					this.$set(parent.vaildate, this.name, {
						name: this.placeholder,
						vaild: this.datatype
					});

				}
				/*验证规则结束*/

				/*如果是多选*/
				if (parent[this.dataKey] && parent[this.dataKey].length && this.type == "checkbox") {
					if(this.value.length > 0 && !this.check){
						parent[this.dataKey].forEach((v, i) => {
							if (this.in_array(v.value, this.value)) {
								this.$set(parent[this.dataKey][i], "checked", true);
							} else {
								this.$set(parent[this.dataKey][i], "checked", false);
							}
						});
					}
					this.data = parent[this.dataKey];
					this.check = true;
				} 
				/*如果是单选*/
				
				if (parent[this.dataKey] && parent[this.dataKey].length && (this.type == "radio" || this.type == "radioLists") ) {
					if(this.value && !this.check){
						parent[this.dataKey].forEach((v, i) => {
							if (v.value == this.value) {
								this.$set(parent[this.dataKey][i], "checked", true);
							} else {
								this.$set(parent[this.dataKey][i], "checked", false);
							}
						});
					}
					console.log(this.dataKey);
					this.data = parent[this.dataKey];
					this.check = true;
					
				}
				
				if(this.type == "date" && !this.value){
					if(this.startKey) this.selectKey = this.startKey;
						
				}
				if(this.type == 'date' && !this.fromStartDate){
					const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();

		            let startYear = year - 60;
		            let endYear = year + 2;
		            month = month > 9 ? month : '0' + month;;
		            day = day > 9 ? day : '0' + day;
		            this.startDate = `${startYear}-${month}-${day}`;
		            this.endDate = `${endYear}-${month}-${day}`;
				}else{
					this.startDate = this.fromStartDate;
		            this.endDate = this.fromEndDate;
				}
				
				if(this.type == 'time'){
					this.startTime = this.fromStartTime?this.fromStartTime:'00:00';
				    this.endTime = this.fromEndTime?this.fromEndTime:'23:59';
					//console.log(this.startTime)
				}
				
				if (this.type == "select" && this.changeField) {
					
					this.data = parent[this.dataKey];
					//console.log(this.data);
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i][this.changeField] == this.value) {
							this.selectKey = i;
							return parent[this.dataKey][i][this.selectLabel];
						}
					}
					if(!this.selectKey && this.startKey) this.selectKey = this.startKey;
				}

				if (this.type == "select" && this.changeField == 'label') {
					
					for (var i = 0; i < parent[this.dataKey].length; i++) {
						if (parent[this.dataKey][i][this.changeField] == this.value) {
							this.selectKey = i;
						}
					}
					if(!this.selectKey && this.startKey) this.selectKey = this.startKey;
					this.data = parent[this.dataKey];
				}
				
				if(this.type == "manyselect"){
					if(this.value){
						
						let v = this.value.split(",");
						if(v.length > 0 && !this.manyselectValue){
							if(v.length ==2){
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = parent[this.dataKey][i].label;
										parent[this.dataKey][i].children.forEach((children,key)=>{
											if(children.value == v[1]){
												this.selectManyKey[1]=key;
												this.manyselectValue += "-"+children.label;
											}
										});
									}
								}

								//this.manyselectValue = this.data[v[0]].label+"->"+this.data[v[0]].children[v[1]].label;
							}else{
								for (var i = 0; i < parent[this.dataKey].length; i++) {
									if (parent[this.dataKey][i].value == v[0]) {
										this.selectManyKey[0]=i;
										this.manyselectValue = parent[this.dataKey][i].label;
									}
								}
								

								//this.manyselectValue = this.data[v[0]].label;
							}
						}

					}
					
					this.data = parent[this.dataKey];
					
				}

				return this.value;
			},
			set: function(val) {
				this.$emit('input', val);
			}
		}
	}
}

</script>

<style scoped="">

/* @import url("../font/globalFont.css"); */
@import url("../css/dx-input.css"); 


</style>
