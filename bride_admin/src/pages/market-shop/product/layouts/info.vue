<template>
    <!-- 上传规格 -->
    <el-dialog title="设置规格" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
        <div v-show="listDialog">
            <!-- 列表 -->
            <table class="table table-hover">
                <tr>
                    <th width="100">名称</th>
                    <th width="30">价格</th>
                    <th width="25">库存</th>
                    <th width="25">配送费</th>
                    <th width="30">自提点佣金</th>
                    <th width="30">供货商结算价</th>
                    <th width="50" class="text-center">操作</th>
                </tr>
                <tr v-for="(item,key) in infolists" v-if="infolists.length>0" style="height:40px">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.ps_price }}</td>
                    <td>{{item.merchant_price}}</td>
                    <td>{{item.supplier_price}}</td>
                    <td>
                        <el-button size="small" @click="editInfo(item)">编辑</el-button>
                        <el-button type="danger" size="small" @click="delInfo(key,item.id)">删除</el-button>
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addInfo">添 加</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </span>
        </div>
        <div v-show="addEditDialog">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:300px;">
                <el-form-item label="规格名称" prop="name" :rules="[{ required: true, message: '规格名称不能为空'},]">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="num" :rules="[{ required: true, message: '库存不能为空'},]">
                    <el-input v-model="ruleForm.num"></el-input>
                </el-form-item>
                <el-form-item label="售价" prop="price" :rules="[{ required: true, message: '售价不能为空'},]">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>
                   <el-form-item label="配送费" prop="ps_price" :rules="[{ required: true, message: '配送费不能为空'},]">
                    <el-input v-model="ruleForm.ps_price"></el-input>
                </el-form-item>
                <el-form-item label="自提点佣金" prop="merchant_price" :rules="[{ required: true, message: '结算价不能为空'},]">
                    <el-input v-model="ruleForm.merchant_price"></el-input>
                </el-form-item>
                <el-form-item label="供货商结算价" prop="supplier_price" :rules="[{ required: true, message: '结算价不能为空'},]">
                    <el-input v-model="ruleForm.supplier_price"></el-input>
                </el-form-item>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width:100px">上传图片</label>
                    <my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.cover" sizearr="120"></my-upload>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer pull-right">
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button @click="addEditDialog=false;listDialog=true">取 消</el-button>
            </span>
        </div>
    </el-dialog>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listDialog: true,
            addEditDialog: false,
            ruleForm: { num: 0, cover: [] },
            tableName: 'product_infos',
            formAction: "",
            dialogVisible: false,
            productId: '',
            infolists: []
        }
    },
    methods: {
        ajax(infolists,productId){
          this.infolists = infolists;
          this.productId = productId;
          this.dialogVisible = true;
          this.listDialog = true;
          this.addEditDialog = false;
        },
        handleClose: function(done) {
            this.$parent.ajax();
            this.dialogVisible = false;
        },
        addInfo: function() {
            this.ruleForm = { num: 0,cover:[] },
            this.listDialog = false;
            this.addEditDialog = true;
            this.formAction = "/admin/shop/product/add-info";
        },
        editInfo: function(item) {
            this.listDialog = false;
            this.addEditDialog = true;
            this.ruleForm = item;
            this.ruleForm.cover = this.splitCover(item.pic, "product");
            this.listDialog = false;
            this.addEditDialog = true;
            this.formAction = "/admin/shop/product/edit-info?infoid=" + item.id;
        },
        delInfo: function(index, id) {
            this.getConfirm("此操作将永久删除该文件, 是否继续?",msg=>{
               this.postAjax("/ajax/mydel",{id:id,tablename:this.tableName},msg=>{
                  this.infolists.splice(index,1);
               });
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.productId = this.productId;
                    this.postAjax(this.formAction, this.ruleForm, msg=> {
                        if (msg.data.status == 2) {
                            this.infolists = msg.data.lists;
                            this.listDialog = true;
                            this.addEditDialog = false;
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /*商品规格结束*/
    },
    components: {

    }

}

</script>
