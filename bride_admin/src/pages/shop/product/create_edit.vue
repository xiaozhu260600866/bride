<template>
    <section v-if="data.show">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm pb50">
            <!-- 基础设置开始 -->
            <el-tabs v-model="activeName2" type="card">
                <el-tab-pane label="基础设置" name="first" class="pt15">
                    <el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '商品名称不能为空'},]">
                        <el-input v-model="ruleForm.name" style="width:50%"></el-input>
                    </el-form-item>
                    <div class="flex">
                        <el-form-item label="请选择分类" prop="fclass" :rules="[{ required: true, message: '分类不能为空'},]">
                            <el-cascader placeholder="请输入分类" expand-trigger="hover" :options="data.fclass" v-model="ruleForm.fclass"></el-cascader>
                        </el-form-item>
                        <el-form-item label="名片" prop="take_merchant_user_id">
                            <el-select v-model="ruleForm.take_merchant_user_id" placeholder="请选择">
                                <el-option v-for="item in data.merchant" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="flex">
                        <el-form-item label="微信卡券" prop="wechat_card_id">
                            <el-select v-model="ruleForm.wechat_card_id" placeholder="请选择" clearable>
                                <el-option v-for="item in data.cardLists" :label="item.title" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="现金券包" prop="coupon_package_id">
                            <el-select v-model="ruleForm.coupon_package_id" placeholder="请选择" clearable>
                                <el-option v-for="item in data.couponPackage" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <el-form-item label="商品售价" prop="price" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
                            <el-input v-model="ruleForm.price" style="width: 100px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品标价" prop="new_price">
                            <el-input v-model="ruleForm.new_price" style="width: 100px"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <el-form-item label="运费" prop="yunfei" :rules="[{ required: true, message: '运费不能为空'},]">
                            <el-input v-model="ruleForm.yunfei" style="width: 100px"></el-input>
                        </el-form-item>

                        <el-form-item label="赠送积分" prop="integral" :rules="[{ required: true, message: '赠送积分不能为空'}, ]">
                            <el-input v-model="ruleForm.integral" style="width: 100px"></el-input>
                        </el-form-item>
                        <el-form-item label="赠送余额" prop="price" :rules="[{ required: true, message: '购买产品自动赠送余额'}, ]">
                            <el-input v-model="ruleForm.give_amount" style="width: 100px"></el-input>
                        </el-form-item>
                    <!--    <el-form-item label="利润" prop="profit_price" :rules="[{ required: true, message: '利润价'}, ]">
                            <el-input v-model="ruleForm.profit_price" style="width: 100px"></el-input>
                        </el-form-item> -->
                    <!--    <el-form-item label="结算价" prop="merchant_price" :rules="[{ required: true, message: '运费不能为空'},]">
                            <el-input v-model="ruleForm.merchant_price" style="width: 100px"></el-input>
                        </el-form-item> -->
                    </div>
                    <div class="flex">
                        <el-form-item label="产品库存" prop="num" :rules="[{ required: true, message: '产品库存不能为空'},{ type: 'number', message: '必须为数字值'}]">
                            <el-input v-model.number="ruleForm.num" style="width: 100px"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌" prop="brand_name" :rules="[{ required: true, message: '品牌不能为空'}]">
                            <el-select v-model="ruleForm.brand_name" placeholder="请选择品牌" clearable>
                                <el-option label="请选择品牌" :value="0"> </el-option>
                                <el-option v-for="v in data.brand" :label="v.label" :value="v.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品排序" prop="sort" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
                            <el-input v-model="ruleForm.sort" style="width: 100px"></el-input><span class="red pl5">数值越大，排名越高</span>
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <el-form-item label="是否上架" prop="putaway" :rules="[{ required: true, message: '是否上架不能为空'}, ]">
                            <el-switch v-model="ruleForm.putaway" on-text="" off-text="" :active-value="1"
                                :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item label="加入购物车" prop="cart">
                            <el-switch v-model="ruleForm.cart" on-text="" off-text="" :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                    </div>
                    <el-form-item label="赠送优惠券" prop="give_coupon">
                        <el-switch v-model="ruleForm.give_coupon" on-text="" off-text="" :active-value="1"
                            :inactive-value="0"> </el-switch>
                    </el-form-item>

                    <el-form-item label="请选择优惠券" prop="coupon_id" v-if="ruleForm.give_coupon">
                        <el-select v-model="ruleForm.coupon_id" placeholder="请选择优惠券" clearable>
                            <el-option label="请选择优惠券" :value="0"> </el-option>
                            <el-option v-for="v in data.coupon" :label="v.name" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="爆品结束时间">
						<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.hot_end_date"></el-date-picker><span class="red pl8">如果为空就是不设置活动时间</span>
					</el-form-item>
                    <el-form-item label="开启限购" prop="can_max_buy">
                        <el-switch v-model="ruleForm.can_max_buy" on-text="" off-text="" :active-value="1"
                            :inactive-value="0" style="width: 100px"> </el-switch>
                    </el-form-item>
                    <el-form-item label="限购数量" v-if="ruleForm.can_max_buy" prop="max_num" :rules="[{ required: true, message: '产品库存不能为空'},{ type: 'number', message: '必须为数字值'}]">
                        <el-input v-model.number="ruleForm.max_num" style="width: 130px">
                            <template slot="append">件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="tag">
                        <el-input v-model="ruleForm.tag" style="width: 300px"></el-input>
                        <span>多个要用英文符号,号分开</span>
                    </el-form-item>
                    <el-form-item label="使用需知" prop="remark">
                        <el-input v-model="ruleForm.remark" style="width:280px" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="发表日期" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.published_at"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <div class="el-form-item">
                        <label class="el-form-item__label" style="width:100px">缩略图</label>
                        <my-upload class="proImg" upurl="product" :uploadLength="1" :fileList="ruleForm.thumb_pic"
                            :sizearr="300"></my-upload>
                    </div>
                    <div class="el-form-item">
                        <label class="el-form-item__label" style="width:100px">广告图</label>
                        <my-upload class="proImg" upurl="product" :uploadLength="1" :fileList="ruleForm.poster_cover"
                            :sizearr="300"></my-upload>
                    </div>
                    <div class="el-form-item">
                        <label class="el-form-item__label" style="width:100px">滚动图片</label>
                        <my-upload class="proImg" upurl="product" :uploadLength="5" :fileList="ruleForm.cover" :sizearr="300"></my-upload>
                    </div>
                    <div class="el-form-item" style="padding-left: 100px">
                        <div class="el-form-item__content" style="">
                            <myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 分销配置结束 -->
                <el-tab-pane label="利润&分销配置" name="second">
                    <disConfig :ruleForm="ruleForm" :disConfig="data.disConfig" :disLev="data.disLev"></disConfig>
                </el-tab-pane>
                <el-tab-pane label="团购配置" name="third">
                    <group :ruleForm="ruleForm"></group>
                </el-tab-pane>
                <el-tab-pane label="城市设置" name="four">
                    <el-form-item label="所在街道" prop="city" v-if="data.citys.length">
                        <el-tree :data="data.citys" show-checkbox  node-key="id" ref="tree"
                            highlight-current :props="ruleForm.city" @check-change="res" :default-checked-keys="ruleForm.cityKey">
                        </el-tree>
                    </el-form-item>
                    <el-button @click="upgradeCity">一键点击更新城市</el-button>
                </el-tab-pane>
            </el-tabs>
            <el-form-item class="create-fixed">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<style type="text/css">
    .proImg .el-upload--picture-card {
        width: 120px;
        height: 120px;
        line-height: 120px;
    }
</style>
<script>
    import myeditor from "@/components/editor.vue";
    import disConfig from './layouts/dis_config.vue'
    import group from "./layouts/group.vue";
    export default {
        mounted: function() {
            if (this.getOptions("id")) {
                this.formAction = '/admin/shop/product/edit?id=' + this.getOptions("id");

            } else {
                this.formAction = '/admin/shop/product/create';
            }
            this.ajax();
        },
        data() {
            return {
                orderBrandArr: [
                	{label: '华山泉',value: '华山泉'},
                	{label: '红百立',value: '红百立'},
                	{label: '绿百立',value: '绿百立'},
                	{label: '全清纯',value: '全清纯'},
                	{label: '七翁井',value: '七翁井'},
                	{label: '七井清泉',value: '七井清泉'},
                	{label: '怡宝',value: '怡宝'},
                	{label: '加伦加',value: '加伦加'},
                	{label: '长寿村',value: '长寿村'},
                	{label: '一品怡',value: '一品怡'},
                	{label: '农夫山泉',value: '农夫山泉'},
                	{label: '鼎湖山泉',value: '鼎湖山泉'},
                	{label: '屈臣氏',value: '屈臣氏'},
                ],
                ruleForm: {
                    fclass: [],
                    published_at: new Date(),
                    is_share_distribution: 1,
                    member_update_distribution: 0,
                    can_distribution: 1,
                    is_update_member: 0,
                    is_distribution_ratio: 0,
                    give_amount: 0,
                    can_coupon: true,
                    is_hot: 0,
                    is_new: 1,
                    yunfei: 3,
                    group_num: 2,
                    is_group: 0,
                    is_favourable: 0,
                    putaway: 1,
                    give_coupon: 0,
                    sort: 0,
                    cover: [],
                    thumb_pic: [],
                    can_buy: 1,
                    integral: 0
                },
                formAction: '',
                getSiteName: this.getSiteName(),
                data: this.formatData(this),
                activeName2: 'first',
            };
        },
        methods: {
            upgradeCity() {
                if(sessionStorage.getItem("citys")){
                      this.data.citys = JSON.parse(sessionStorage.getItem("citys"));
                }else{
                    this.postAjax("/admin/user/updateCity").then(msg => {
                        this.data.citys = msg.data.citys;
                        sessionStorage.setItem("citys",JSON.stringify(this.data.citys));
                    })
                }

            },
            res(e, isCheck) {
                console.log(e);
                console.log(isCheck);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         if(this.$refs.tree){
                            this.ruleForm.city = this.$refs.tree.getCheckedNodes();
                            this.ruleForm.cityKey = this.$refs.tree.getCheckedKeys();
                        }
                        this.ruleForm.content = this.$refs.editor.getContent();
                        this.ruleForm.disConfig = this.data.disConfig;
                        this.ruleForm.disLev = this.data.disLev;
                        this.ruleForm.is_new = 1;
                        if (this.ruleForm.group_expire_date && typeof this.ruleForm.group_expire_date ==
                            "object") {
                            this.ruleForm.group_expire_date = this.dateToString(this.ruleForm.group_expire_date,
                                "dateTime");
                        }
                        if (this.ruleForm.hot_end_date && typeof this.ruleForm.hot_end_date ==
                            "object") {
                            this.ruleForm.hot_end_date = this.dateToString(this.ruleForm.hot_end_date,
                                "dateTime");
                        }
                        this.postAjax(this.formAction, this.ruleForm, msg => {
                            if (msg.data.status == 2) {
                                this.$router.push({
                                    path: '/vueadmin/shop/product/lists'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            ajax: function() {
                this.getAjax(this, {}, msg => {
                    if ("detail" in msg) {
                        this.ruleForm = msg.detail;
                        this.ruleForm.city = this.ruleForm.city ? this.ruleForm.city.split(',') : [],
                            this.ruleForm.cityKey = this.ruleForm.cityKey ? this.ruleForm.cityKey.split(',') :
                            []
                        this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover,
                            "product") : [];
                        this.ruleForm.thumb_pic = this.ruleForm.thumb_pic ? this.splitCover(this.ruleForm.thumb_pic,
                            "product") : [];
                        this.ruleForm.poster_cover = this.ruleForm.poster_cover ? this.splitCover(this.ruleForm
                            .poster_cover,
                            "product") : [];
                        this.ruleForm.fclass = this.ruleForm.fclassArr;
                        this.ruleForm.city = this.ruleForm.cityArr;
                        this.ruleForm.group_expire_date = this.ruleForm.group_expire_date ==
                            "2099-12-30 00:00:00" ? '' : this.ruleForm.group_expire_date;
                    }
                });
            },
        },
        components: {
            myeditor,
            disConfig,
            group
        }
    }
</script>
