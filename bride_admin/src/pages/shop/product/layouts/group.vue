<template>
    <section>
        <el-form-item label="团购开关" prop="is_group">
            <el-switch v-model="ruleForm.is_group" on-text="" off-text=""  :active-value="1"  :inactive-value="0"> </el-switch>
        </el-form-item>
        <div v-show="ruleForm.is_group">
            <el-form-item label="满" :rules="[{ required: true, message: '一级拥金（比例%）不能为空'},]">
                <el-input-number v-model="ruleForm.group_num" :min="2" :max="20"  ></el-input-number>
                </el-input><span class="font_grey pl3">人开团 </span>
            </el-form-item>
             <el-form-item label="价格" :rules="[{ required: true, message: '价格不能为空'},]">
                <el-input v-model="ruleForm.group_price" class="width80"></el-input>
                <span class="font_grey pl3">元 </span>
            </el-form-item>
             <el-form-item label="活动结束时间">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.group_expire_date"></el-date-picker><span class="red pl8">如果为空就是不设置活动时间</span>
            </el-form-item>

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
    props: ['ruleForm'],
    methods: {
        
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