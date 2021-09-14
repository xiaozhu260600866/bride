<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pb50">
		<el-tabs v-model="activeName2" type="card">
			<!-- 网站配置开始 -->
			<el-tab-pane label="网站配置" name="first">
				<div class="pt20">
					<el-form-item label="企业名称" prop="web_name" :rules="[{ required: true, message: '名称不能为空'},]">
						<el-input v-model="ruleForm.web_name" class="CinputWidth"></el-input>
					</el-form-item>
					<el-form-item label="公司地址" prop="address">
						<el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
						<el-button @click.prevent="chooseLocation()">重新定位</el-button>
					</el-form-item>
					<el-form-item label="行业开关" prop="index_show1">
						<el-switch v-model="ruleForm.is_index" on-text="" off-text="" active-value="1" inactive-value="0"> </el-switch>
					</el-form-item>
					<el-form-item label="最新入驻" prop="index_show2">
						<el-switch v-model="ruleForm.is_index2" on-text="" off-text="" active-value="1" inactive-value="0"> </el-switch>
					</el-form-item>
                    <el-form-item label="发布中" prop="publish">
                    	<el-switch v-model="ruleForm.publish" on-text="" off-text="" active-value="1" inactive-value="0"> </el-switch>
                    </el-form-item>
					<el-form-item label="商家发布" prop="merchant_publish">
						<el-switch v-model="ruleForm.merchant_publish" on-text="" off-text="" active-value="1" inactive-value="0"> </el-switch>
					</el-form-item>
					<div class="el-form-item">
						<label class="el-form-item__label" style="width:150px">企业LOGO</label>
						<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.web_logo" :sizearr="300"></my-upload>
					</div>
				</div>
				<el-form-item label="认证费用" prop="verify_amount" :rules="[{ required: true, message: '认证费用不能为空'},]">
					<el-input v-model="ruleForm.verify_amount"></el-input>
				</el-form-item>
				<el-form-item label="发布服务扣除的积分" prop="product_integral" :rules="[{ required: true, message: '发布服务扣除的积分不能为空'},]">
					<el-input v-model="ruleForm.product_integral"></el-input>
				</el-form-item>
				<!-- <el-form-item label="网吧关键字" prop="web_keywords" :rules="[{ required: true, message: '网吧关键字不能为空'},]">
					<el-input v-model="ruleForm.web_keywords"></el-input>
				</el-form-item>
				<el-form-item label="QQ客服(多个按，号分隔)" prop="qq">
					<el-input v-model="ruleForm.qq"></el-input>
				</el-form-item>
				<el-form-item label="地址x" prop="address">
					<el-input v-model="ruleForm.addressx"></el-input>
				</el-form-item>
				<el-form-item label="地址y" prop="address">
					<el-input v-model="ruleForm.addressy"></el-input>
				</el-form-item>
				<el-form-item label="充值赠送积分(1元等于多少积分)" prop="recharge_integral">
					<el-input v-model="ruleForm.recharge_integral"></el-input>
				</el-form-item>
				<div class="el-form-item">
					<label class="el-form-item__label" style="width:100px">上传微信二维码</label>
					<my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.wechat_logo" :sizearr="300"></my-upload>
				</div>-->
			<!-- 	<div class="el-form-item" style="padding-left: 100px">
					<label class="el-form-item__label" style="width:100px;margin-left: -100px;">商家加盟</label>
					<div class="el-form-item__content" style="">
						<myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
					</div>
				</div> -->
			</el-tab-pane>
			<!-- 网站配置结束 -->
			<!-- 订单相关开始 -->
			<el-tab-pane label="订单相关" name="second">
				<div class="pt20">
					<el-form-item label="未付款订单有效期" prop="web_name" :rules="[{ required: true, message: '未付款订单有效期不能为空'},]">
						<el-input v-model="ruleForm.order_deadline" size="small" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
					<el-form-item label="自动交易成功时限" prop="order_autook" :rules="[{ required: true, message: '自动交易成功时限不能为空'},]">
						<el-input v-model="ruleForm.order_autook" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
					<el-form-item label="自提地址有效期" prop="order_address" :rules="[{ required: true, message: '自提地址有效期不能为空'},]">
						<el-input v-model="ruleForm.order_address" class="OinputWidth"></el-input><span class="fs13 font_666 pl10">天</span>
					</el-form-item>
				</div>
			</el-tab-pane>
			<el-tab-pane label="售后类型" name="sixth">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="0" :canupload="false" :hasSon="false"></my-category>
			</el-tab-pane>
			<el-tab-pane label="年龄" name="seventh">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="1" :canupload="true" :hasSon="false"></my-category>
			</el-tab-pane>
			<el-tab-pane label="学历" name="ninth">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="2" :canupload="true" :hasSon="false"></my-category>
			</el-tab-pane>
			<el-tab-pane label="身高" name="ten">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="3" :canupload="true" :hasSon="true"></my-category>
			</el-tab-pane>
			<el-tab-pane label="月收入" name="money">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="8" :canupload="true" :hasSon="false"></my-category>
			</el-tab-pane>
			<el-tab-pane label="年龄段" name="seventh1">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="11" :canupload="true" :hasSon="false"></my-category>
			</el-tab-pane>
			<el-tab-pane label="身高段" name="seventh2">
				<my-category :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="12" :canupload="true" :hasSon="false"></my-category>
			</el-tab-pane>
		
			<!-- <el-tab-pane label="口罩权益" name="night">
				<div class="el-form-item">
					<div class="el-form-item__content" style="">
						<myeditor :content="ruleForm.mask_content ? ruleForm.mask_content : ''" ref="editor"></myeditor>
					</div>
				</div>
			</el-tab-pane> -->
         
			<el-tab-pane label="首页导航图标" name="eleven">
				<my-category2 :lists="data.category" actionPrefix="/admin/system" actionUrl="/admin/system" type="4" :canupload="true" :hasSon="true"></my-category2>
			</el-tab-pane>
			<el-tab-pane label="签到相关" name="five" class="mt20">
				<el-form-item  label="每天签到" prop="sigin_today" :rules="[{ required: true, message: '每天获得多少积分不能为空'}]">
					<el-input v-model="ruleForm.sigin_today" v-class="'width120'"><template slot="append">积分</template></el-input>
				</el-form-item>
				<el-form-item label="连续签到">
					<el-input v-model="ruleForm.sigin_day" v-class="'width120'"><template slot="append">天</template></el-input>
					赠送
					<el-input v-model="ruleForm.sigin" v-class="'width120'"><template slot="append">分</template></el-input>
				</el-form-item>
			</el-tab-pane>
		</el-tabs>

		<el-form-item class="create-fixed">
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</el-form>
</template>
<style type="text/css">

.CinputWidth{width: 500px;}
.CinputWidth .el-input__inner{border-color: #dcdfe6!important;}

.OinputWidth{width: 100px;}
.OinputWidth .el-input__inner{border-color: #dcdfe6!important;}
</style>
<script>
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
import myeditor from "@/components/editor.vue";
import myCategory2 from "@/components/category.vue"
export default {
	mounted: function() {
		this.ajax();
	},
	data() {
		return {
			ruleForm: { order_deadline: 0, order_autook: 0, is_make_menu: false, is_siginin: false },
			formAction: '/admin/system/config',
			activeName2: 'first',
			dialogVisible: false,
			getSiteName: this.getSiteName(),
			data: this.formatData(this)
		};
	},
	methods: {
		chooseLocation() {
			this.$refs.chooseLocation.ajax();
		},
		locationCallBack(res) {
			if (res.latlng) {
				this.$refs.chooseLocation.handleClose();
				this.ruleForm.address = res.poiaddress;
				this.ruleForm.location_x = res.latlng.lng;
				this.ruleForm.location_y = res.latlng.lat;
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//this.ruleForm.content = this.$refs.editor.getContent();
					//this.ruleForm.mask_content = this.$refs.editor.getContent();
					this.postAjax(this.formAction, this.ruleForm, function(msg) {})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		toBing() {
			this.dialogVisible = true;
			this.$refs.qrcode.getQrcode();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function() {
			this.getAjax(this, {}, msg => {
				if ("detail" in msg) {
					this.ruleForm = msg.detail;
					this.ruleForm.web_logo = this.ruleForm.web_logo ? this.splitCover(this.ruleForm.web_logo, "product") : [];
					this.ruleForm.wechat_logo = this.ruleForm.wechat_logo ? this.splitCover(this.ruleForm.wechat_logo, "product") : [];
				}
			});

		},
	},
	components: {
		myeditor,
		chooseLocation,
		myCategory2
	}
}

</script>
