<template>
    <section>
        <el-form-item label="分销开关" prop="is_share_distribution">
            <el-switch v-model="ruleForm.is_share_distribution" on-text="" off-text="" @change='showDisInfo' :active-value="1"  :inactive-value="0"> </el-switch>
        </el-form-item>
        <div v-show="ruleForm.is_share_distribution">
            <el-form-item label="购买该产品成为经销商" label-width="150">
                <el-switch v-model="ruleForm.can_distribution" on-text="" off-text="" :active-value="1"  :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item label="重设经销佣金和积分" label-width="150">
                <el-switch v-model="ruleForm.is_distribution_ratio" on-text="" off-text="" :active-value="1"  :inactive-value="0"> </el-switch>
            </el-form-item>
            <div v-show="ruleForm.is_distribution_ratio">
                <el-form-item label="一级拥金（比例%）" :rules="[{ required: true, message: '一级拥金（比例%）不能为空'},]">
                    <el-input v-model="disConfig.first_distor" :class="['width80']"></el-input><span class="red">% </span>
                    <el-input v-model="disConfig.first_integral" :class="['width80']"></el-input><span class="red">分</span>
                </el-form-item>
                <el-form-item label="二级拥金（比例%）" :rules="[{ required: true, message: '二级拥金（比例%）不能为空'},]">
                    <el-input v-model="disConfig.second_distor" :class="['width80']"></el-input><span class="red">% </span>
                    <el-input v-model="disConfig.second_integral" :class="['width80']"></el-input><span class="red">分</span>
                </el-form-item>
                <el-form-item label="三级拥金（比例%）" :rules="[{ required: true, message: '三级拥金（比例%）名称不能为空'},]">
                    <el-input v-model="disConfig.third_distor" :class="['width80']"></el-input><span class="red">% </span>
                    <el-input v-model="disConfig.third_integral" :class="['width80']"></el-input><span class="red">分</span>
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
    props: ['ruleForm', 'disConfig'],
    methods: {
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