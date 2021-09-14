<template>
	<section>
		<el-form-item label="分销开关" prop="is_share_distribution">
			<el-switch v-model="ruleForm.is_share_distribution" on-text="" off-text="" @change='showDisInfo' :active-value="1"  :inactive-value="0"> </el-switch>
		</el-form-item>
		<div v-show="ruleForm.is_share_distribution">
			<!-- <el-form-item label="购买该产品成为经销商" label-width="150">
				<el-switch v-model="ruleForm.can_distribution" on-text="" off-text="" :active-value="1"  :inactive-value="0"> </el-switch>
			</el-form-item> -->
			<el-form-item label="区域代理费用" prop="manager_percent" :rules="[{ required: true, message: '供货商费用不能为空'},]">
			    <el-input v-model="ruleForm.manager_percent" style="width: 100px"></el-input>%
			</el-form-item>
			<el-form-item label="商家结算价" prop="merchant_price" :rules="[{ required: true, message: '运费不能为空'},]">
			        <el-input v-model="ruleForm.merchant_price" style="width: 100px"></el-input>
			    </el-form-item>
			<el-form-item label="重设佣金" label-width="100px">
				<el-switch v-model="ruleForm.is_distribution_ratio" on-text="" off-text="" :active-value="1"  :inactive-value="0"> </el-switch>
			</el-form-item>
			<el-form-item label="佣金类型" label-width="100px" v-show="ruleForm.is_distribution_ratio">
				<el-select v-model="disConfig.type" placeholder="类型" @change="disConfigTypeCallBack">
					<el-option label="比例" :value="0"> </el-option>
					<el-option label="金额" :value="1"> </el-option>
				</el-select>
			</el-form-item>
			<div v-show="ruleForm.is_distribution_ratio">
				<el-form-item label-width="200px" label="普通等级佣金（比例%）" :rules="[{ required: true, message: '一级佣金（比例%）不能为空'},]">
					<p class="mr20" style="display: inline-block">一级 <el-input v-model="disConfig.first_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
					<p class="mr20" style="display: inline-block">二级 <el-input v-model="disConfig.second_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
					<p class="mr20" style="display: inline-block">三级	<el-input v-model="disConfig.third_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
				</el-form-item>
			</div>

			<div v-show="ruleForm.is_distribution_ratio && disLev.length">

				<el-form-item label-width="200px" :label="v.label+'佣金（比例%）'" :rules="[{ required: true, message: '一级佣金（比例%）不能为空'},]" v-for="v in  disLev">
					<p class="mr20" style="display: inline-block">一级
					<el-input v-model="v.first_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
					<p class="mr20" style="display: inline-block">二级
					<el-input v-model="v.second_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
					<p class="mr20" style="display: inline-block">三级
					<el-input v-model="v.third_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span></p>
				</el-form-item>

			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			siteName:this.getSiteName()
		}
	},
	props: ['ruleForm', 'disConfig','disLev'],
	methods: {
		disConfigTypeCallBack(){
		   this.disConfig.first_distor = 0;
		   this.disConfig.second_distor = 0;
		   this.disConfig.third_distor = 0;
           if(this.disLev.length){
               this.disLev.forEach(v=>{
                   v.first_distor = 0;
                   v.second_distor = 0;
                   v.third_distor = 0;
               });

           }

		},
		showDisInfo: function() {
			console.log(this.ruleForm.is_share_distribution);
			console.log(this.ruleForm);
		},
	}
}
</script>
<style type="text/css" scoped="">
.width150 {
	width: 150px
}

.width80 {
	width: 80px
}
</style>
