<template>
    <section>
        <div >
            <el-form-item label="区域代理费用" prop="manager_percent" :rules="[{ required: true, message: '供货商费用不能为空'},]">
                <el-input v-model="ruleForm.manager_percent" style="width: 100px"></el-input>%
            </el-form-item>
            <el-form-item label="投资方费用" prop="investor_percent" :rules="[{ required: true, message: '投资方费用不能为空'},]">
                <el-input v-model="ruleForm.investor_percent" style="width: 100px"></el-input>%
            </el-form-item>
            <el-form-item label="平台费用" prop="platform_percent" :rules="[{ required: true, message: '投资方费用不能为空'},]">
                <el-input v-model="ruleForm.platform_percent" style="width: 100px"></el-input>%
            </el-form-item>
            <el-form-item label="重设经销佣金和积分" label-width="150">
                <el-switch v-model="ruleForm.is_distribution_ratio" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item label="佣金类型" label-width="150" v-show="ruleForm.is_distribution_ratio">
                <el-select v-model="disConfig.type" placeholder="类型">
                    <el-option label="比例" :value="0"> </el-option>
                    <el-option label="金额" :value="1"> </el-option>
                </el-select>
            </el-form-item>
            <div v-show="ruleForm.is_distribution_ratio">
                <el-form-item label="一级拥金（比例%）" :rules="[{ required: true, message: '一级拥金（比例%）不能为空'},]">
                    <el-input v-model="disConfig.first_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span>
                </el-form-item>
                <el-form-item label="二级拥金（比例%）" :rules="[{ required: true, message: '二级拥金（比例%）不能为空'},]">
                    <el-input v-model="disConfig.second_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span>
                </el-form-item>
                <el-form-item label="三级拥金（比例%）" :rules="[{ required: true, message: '三级拥金（比例%）名称不能为空'},]">
                    <el-input v-model="disConfig.third_distor" :class="['width80']"></el-input><span class="red">{{ disConfig.type == 0 ? '%' :'元' }} </span>
                </el-form-item>
            </div>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            siteName: this.getSiteName()
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
