<template>
    <section>
        <el-dialog title="订单确认" :visible.sync="dialogVisible" top="10px" :before-close="handleClose" width="800px"
            class="pay_confirm">
            <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm validform_ajax pay-list">
                <div class="list-item">
                    <div class="pay-item" v-if="clientInfo && clientInfo.id">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="clientInfo.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="name">
                            <el-input v-model="clientInfo.phone" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="金额" prop="amount">
                            <el-input v-model="clientInfo.amount" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                    <div class="pay-item selectTong">
                        <el-form-item label="选择桶类型" prop="name">
                            <el-radio-group v-model="ruleForm.bucket_type">
                                <el-radio :label="v.value" v-for="v in bucketTypeArr">{{v.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="item flex-middle" v-if="ruleForm.bucket_type == '回桶'">
                            <el-radio-group v-model="ruleForm.bucket_value">
                                <el-radio :label="v.value" v-for="v in exchangeSonArr">{{v.label}}</el-radio>
                            </el-radio-group>
                            <div class="flex-middle pl15" v-if="ruleForm.bucket_value == '其他品牌' && ruleForm.bucket_type == '回桶'">
                                <el-select class="Bbrand" v-model="ruleForm.bucket_brand" placeholder="请选择品牌">
                                    <el-option v-for="item in brand" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <div class="pl10 pr5">数量</div>
                                <el-select class="Bnum" v-model="ruleForm.bucket_num" placeholder="数量">
                                    <el-option v-for="item in bucket_num" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </div>

                        </div>
                        <div class="item tong" v-if="ruleForm.bucket_type == '押桶'">
                            <div class="list">押桶：{{exchangeSonArr[0].label}}</div>
                            <div class="list">
                                <div class="fc-0">温馨提示：</div>
                                <div class="con fc-6 lh-20">押桶：50元一个。<br>每个空桶每年使用费10元。（不足一年按一年收取使用费）</div>
                            </div>
                        </div>
                        <div class="item tong" v-if="ruleForm.bucket_type == '买桶'">
                            <div class="list">买桶：{{exchangeSonArr[0].label}}</div>
                            <div class="list">
                                <div class="fc-0">温馨提示：</div>
                                <div class="con fc-6 lh-20">买桶：30元一个。</div>
                            </div>
                        </div>
                    </div>
                    <div class="pay-item">
                        <!-- <div class="re-title">结算方式</div> -->
                        <el-form-item label="收款" prop="name">
                            <el-input v-model="amount" placeholder="0" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="回桶金额" prop="name">
                            <el-input v-model="exchangeBucket" placeholder="0" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="付款方式" :rules="[{ required: true, message: '付款方式不能为空'},]" prop="pay_method">
                            <el-select placeholder="请选择" v-model="ruleForm.pay_method">
                                <el-option label="微信支付" :value="1"></el-option>
                                <el-option label="余额支付" :value="2"></el-option>
                                <el-option label="翼支付" :value="3"></el-option>
                                <el-option label="其他" :value="4"></el-option>
                                <el-option label="水票" :value="5"></el-option>
                                <el-option label="现金" :value="6"></el-option>
                                <el-option label="月票" :value="7"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="结算日期" prop="date" :rules="[{ required: true, message: '付款日期不能为空'},]">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="pay-item">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.remark" type="textarea"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item style="width:100%;text-align: center;padding-top: 10px;">
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
    export default {
        props: ['top', 'amount', 'clientInfo', 'category', 'brand', 'cartData0', 'cartData3'],
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    date: new Date(),
                    bucket_num: 1,
                    bucket_type: '回桶',
                    bucket_brand:'',
                    bucket_value:''
                },
                bucket_type: 1,
                bucket_value: 1,
                bucketTypeArr: [{
                        label: '回桶',
                        value: '回桶'
                    },
                    {
                        label: '押桶',
                        value: '押桶'
                    },
                    {
                        label: '买桶',
                        value: '买桶'
                    },
                ],
                exchangeSonArr: [{
                        label: '华山泉*4',
                        value: '华山泉*4',
                        amount: 0
                    },
                    {
                        label: '其他品牌',
                        value: '其他品牌',
                        amount: 10
                    },
                ],
                bucket_brand: [{
                        label: '华山泉',
                        value: 1
                    },
                    {
                        label: '红百立',
                        value: 2
                    },
                    {
                        label: '绿百立',
                        value: 3
                    },
                    {
                        label: '全清纯',
                        value: 4
                    },
                    {
                        label: '七翁井',
                        value: 5
                    },
                    {
                        label: '七井清泉',
                        value: 6
                    },
                    {
                        label: '怡宝',
                        value: 7
                    },
                    {
                        label: '加伦加',
                        value: 8
                    },
                    {
                        label: '长寿村',
                        value: 9
                    },
                    {
                        label: '一品怡',
                        value: 10
                    },
                    {
                        label: '农夫山泉',
                        value: 11
                    },
                    {
                        label: '鼎湖山泉',
                        value: 12
                    },
                    {
                        label: '屈臣氏',
                        value: 13
                    },
                ],
                bucket_num: [{
                        label: '1',
                        value: 1
                    },
                    {
                        label: '2',
                        value: 2
                    },
                    {
                        label: '3',
                        value: 3
                    },
                    {
                        label: '4',
                        value: 4
                    },
                    {
                        label: '5',
                        value: 5
                    },
                    {
                        label: '6',
                        value: 6
                    },
                    {
                        label: '7',
                        value: 7
                    },
                    {
                        label: '8',
                        value: 8
                    },
                    {
                        label: '9',
                        value: 9
                    },
                ],
            }
        },
        computed: {
            exchangeBucket() {
                let res = 0;
                if (this.ruleForm.bucket_type == '回桶' && this.ruleForm.bucket_value == '其他品牌') {
                    res += 10 * parseInt(this.ruleForm.bucket_num);
                } else if (this.ruleForm.bucket_type == '押桶') {
                    res += 50 * parseInt(this.ruleForm.bucket_num);;
                } else if (this.ruleForm.bucket_type == '买桶') {
                    res += 30 * parseInt(this.ruleForm.bucket_num);;
                }
                return res;
            },
        },
        methods: {
            handleClose() {
                this.dialogVisible = false;
            },
            ajax() {
                if (this.cartData0.length) {
                    this.cartData0.forEach(v => {
                        this.ruleForm.bucket_num = v.num;
                        if (v.brand) {
                            this.exchangeSonArr[0] = {
                                label: v.brand + '×' + this.ruleForm.bucket_num,
                                value: v.brand,
                                amount: 0
                            }
                            if (!this.ruleForm.bucket_value) this.ruleForm.bucket_value = this.exchangeSonArr[0]
                                .value;
                            this.ruleForm.bucket_brand = ""
                        }
                    })
                }
                console.log(this.exchangeSonArr)
                this.dialogVisible = true;
            },
            submitForm(formName) {
                if(!this.ruleForm.bucket_type){
                	return this.getError('请选择回桶类型');
                }
                if( this.ruleForm.bucket_type=='回桶' &&  this.ruleForm.bucket_value=='其他品牌' && !this.ruleForm.bucket_brand){
                	return this.getError('请选择品牌');
                }
                this.ruleForm.bucket_amount = this.exchangeBucket;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("callBack", this.ruleForm);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>
<style type="text/css" scoped="">
    .act-title {
        text-align: center;
        margin-bottom: 10px;
        font-size: 16pc;
        color: #333;
    }

    .list-item /deep/.el-input__inner,
    .list-item /deep/.el-date-editor.el-input,
    .list-item /deep/.el-date-editor.el-input__inner {
        width: 220px;
    }

    .list-item /deep/.el-textarea__inner {
        width: 555px;
    }


    .selectTong .item {
        padding-left: 100px;
        margin-bottom: 22px;
    }

    .selectTong .el-radio {
        margin-bottom: 0;
        line-height: 40px;
    }

    .selectTong .Bbrand>>>.el-input__inner {
        width: 150px;
    }

    .selectTong .Bnum>>>.el-input__inner {
        width: 70px;
        text-align: center;
    }

    .selectTong .tong {
        margin-top: -10px;
    }

    .selectTong .tong .list {
        line-height: 34px;
    }
</style>
