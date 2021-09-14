<!--
使用：
1.components: {
        'my-class':()=>import('xiaozhu/vue/components/admin/class.vue')
    }
2.      <my-class top="2%" ref="category" :type="type" formAction="/admin/article/"></my-class>   //注意formAction 是方法 的前缀
 -->
<template id="class">
    <el-dialog title="新建\编辑类别" :visible.sync="dialogVisible" width="1000px" :top="top" :before-close="handleClose">
        <div>
            <table class="table table-hover mt10" v-loading="listLoading">
                <thead>
                    <tr class="ta_th_tr">
                        <th width="50">排序</th>
                        <th width="220">名称</th>
                        <th width="120">显示/隐藏</th>
                        <th width="200">url链接</th>
                        <th width="200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(v,key) in lists">
                        <tr class="active" :id="'tr_'+v.id">
                            <td>
                                <input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(v.id,v.sort,'sort')" :id="'sort_'+v.id" v-model="v.sort" />
                            </td>
                            <td>
                                <div class="flex">
                                    <i class="ico_sh" :data-id="v.id" @click="toggleChild(v.id)" ><img src="https://niu-shop-app.doxinsoft.com/images/arrow_down.png" /></i>
                                    <input type="text" name="sort" v-model="v.name" class="form-control input_w200 v_name noborder" @blur="blurField(v.id,v.name,'name')" />
                                </div>
                            </td>
                            <td><el-switch v-model="v.can_show" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="blurField(v.id,v.can_show,'can_show')"> </el-switch></td>
                            <td>
                                <div v-if="getSiteName == 'https://boss.doxinsoft.com'">/pages/shop/product/lists/main?fclass={{ v.id }}</div>
                                <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">https://renda.doxinsoft.com/template/#/wap/citizen/article/lists?fclass={{ v.id }}</div>
                            </td>
                            <td class="flex">
                                <a  href="javascript:;" class="btn btn-sm btn-default mr5" @click="uploadPic2(v.id,v.cover2)">{{ v.cover2 ? '已上传轮播图' :'上传轮播图' }}</a>
                                <a  href="javascript:;" class="btn btn-sm btn-default mr5" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</a>
                                <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">
                                    <a href="javascript:;" class="fs12 btn btn-default del_fc" :data-id="v.id" :data-url="formAction" @click="delfc(formAction,v.id,key)" >删除父类别</a>
                                </div>
                                <div v-else>
                                    <a href="javascript:;" class="fs12 btn btn-default del_fc" :data-id="v.id" :data-url="formAction" @click="delfc(formAction,v.id,key)" >删除父类别{{v.id }}</a>
                                </div>
                            </td>
                        </tr>
                        <template >
                            <template v-for="(son,key2) in v.zclass">
                                <tr :class="'zclass_'+v.id" :id="'tr_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                    <td >

                                        <input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(son.id,son.sort,'sort')" v-model="son.sort" />
                                    </td>
                                    <td class="ope01 seclist pl50 flex">
                                           <i class="ico_sh" :data-id="son.id" @click="toggleChild(son.id)" ><img src="https://niu-shop-app.doxinsoft.com/images/arrow_down.png" /></i>
                                        <input type="text" name="sort" class="form-control input_w200 v_name noborder" @blur="blurField(son.id,son.name,'name')" v-model="son.name" />
                                    </td>
                                     <td><el-switch v-model="son.can_show" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="blurField(son.id,son.can_show,'can_show')"> </el-switch></td>
                                    <td >
                                        <div v-if="getSiteName == 'https://boss.doxinsoft.com'">/pages/shop/product/lists/main?fclass={{ son.id }}</div>
                                        <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">https://renda.doxinsoft.com/template/#/wap/citizen/article/lists?fclass={{ son.id }}</div>
                                    </td>
                                    <td>
                                        <a href="javascript:;" class="btn btn-sm btn-default" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</a>
                                        <a href="javascript:;" class="btn btn-sm btn-default del_zc" :data-id="son.id" :data-url="formAction" @click="delzc(formAction,son.id,key,key2)">删除子类别{{son.id}}</a>
                                    </td>
                                </tr>
                                <!-- 孙类别 -->
                                <template >
                                        <template v-for="(grand,key3) in son.zclass">
                                            <tr :class="'zclass_'+son.id" :id="'tr_'+grand.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                                <td>
                                                    <input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(grand.id,son.sort,'sort')" v-model="grand.sort" />
                                                </td>
                                                <td class="ope01 seclist pl100">
                                                    <input type="text" name="sort" class="form-control input_w200 v_name noborder" @blur="blurField(grand.id,grand.name,'name')" v-model="grand.name" />
                                                </td>
                                                 <td><el-switch v-model="grand.can_show" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="blurField(grand.id,grand.can_show,'can_show')"> </el-switch></td>
                                                <td >
                                                    <div v-if="getSiteName == 'https://boss.doxinsoft.com'">/pages/shop/product/lists/main?fclass={{ grand.id }}</div>
                                                    <div v-if="getSiteName == 'https://renda.doxinsoft.com/'">https://renda.doxinsoft.com/template/#/wap/citizen/article/lists?fclass={{ grand.id }}</div>
                                                </td>
                                                <td>
                                                    <a href="javascript:;" class="btn btn-sm btn-default" @click="uploadPic(grand.id,grand.cover)">{{ grand.cover ? '已上传图片' :'上传图片' }}</a>
                                                    <a href="javascript:;" class="btn btn-sm btn-default del_zc" :data-id="grand.id" :data-url="formAction" @click="delzc(formAction,grand.id,key,key2)">删除子类别{{grand.id }}</a>
                                                </td>
                                            </tr>
                                        </template>

                                        <!-- 添加孙类别 -->
                                        <tr :class="' zclass_'+son.id" :id="'add_btn_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                            <td></td>
                                            <td colspan="4" class="ope01 seclist pl50"><a @click="addZc(son.id)" href="javascript:;" class="btn btn-sm" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span> 新增孙类别</a>
                                            </td>
                                        </tr>
                                        <tr :id="'add_form_'+son.id" style="display:none">
                                            <td>
                                                <input type="text" v-model="sort" name="sort" class="form-control input_w50 text_center" />
                                            </td>
                                            <td colspan="3" class="ope01 seclist pl50">
                                                <input type="text" v-model="name" name="name" class="form-control input_w300" datatype="*" />
                                            </td>
                                            <td>
                                                <input class="btn btn-sm btn-default plr20" value="提交" type="submit" @click="addClass(son.id)">
                                                <input class="btn btn-sm btn-default plr20" type="button" :data-id="v.id" value="取消" @click="cancelAdd(son.id)">
                                            </td>
                                        </tr>


                                </template>



                            </template>
                            <!-- 添加子类别 -->
                            <tr :class="' zclass_'+v.id" :id="'add_btn_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
                                <td></td>
                                <td colspan="4" class="ope01 seclist pl50"><a @click="addZc(v.id)" href="javascript:;" class="btn btn-sm" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span> 新增子类别</a>
                                </td>
                            </tr>
                            <tr :id="'add_form_'+v.id" style="display:none">
                                <td>
                                    <input type="text" v-model="sort" name="sort" class="form-control input_w50 text_center" />
                                </td>
                                <td colspan="3" class="ope01 seclist pl50">
                                    <input type="text" v-model="name" name="name" class="form-control input_w300" datatype="*" />
                                </td>
                                <td>
                                    <input class="btn btn-sm btn-default plr20" value="提交" type="submit" @click="addClass(v.id)">
                                    <input class="btn btn-sm btn-default plr20" type="button" :data-id="v.id" value="取消" @click="cancelAdd(v.id)">
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr id="add_btn_">
                        <td></td>
                        <td colspan="4" class="ope01 seclist"><a href="javascript:;" @click="addZc('')" class="btn btn-sm" data-id=""><span class="glyphicon glyphicon-plus-sign"></span> 新增父类别</a>
                        </td>
                    </tr>
                    <tr id="add_form_" style="display:none">
                        <td>
                            <input type="hidden" name="fid" value="0" />
                            <input type="text" name="sort" class="form-control input_w50 text_center" v-model="sort" />
                        </td>
                        <td class="ope01 seclist" colspan="3">
                            <input type="text" name="name" class="form-control input_w300" datatype="*" v-model="name" />
                        </td>
                        <td>
                            <input class="btn btn-sm btn-default plr20" type="submit" value="提交" @click="addClass(0)">
                            <input class="btn btn-sm btn-default plr20" type="button" data-id="" value="取消" @click="cancelAdd('')">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 上传图片 -->
        <el-dialog title="提示" :visible.sync="uploadVisible" size="tiny" :before-close="uploadClose" append-to-body>
            <div class="el-form-item">
                <label class="el-form-item__label" style="width:100px">上传图片</label>
                <my-upload upurl="product" :uploadLength="1" :fileList="fileList" :sizearr="[120]" opentype="ablank"></my-upload>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="uploadVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadsubmit">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 上传图片结束 -->
		
		<!-- 上传图片 -->
		<el-dialog title="提示" :visible.sync="uploadVisible2" size="tiny" :before-close="uploadClose2" append-to-body>
		    <div class="el-form-item">
		        <label class="el-form-item__label" style="width:100px">上传轮播图</label>
		        <my-upload upurl="product" :uploadLength="5" :fileList="fileList" :sizearr="[120]" opentype="ablank"></my-upload>
		    </div>
		    <span slot="footer" class="dialog-footer">
		    <el-button @click="uploadVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="uploadsubmit2">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 上传图片结束 -->
    </el-dialog>
</template>
<style type="text/css">

textarea,.table input[type="text"],.table input[type="password"],.table input[type="datetime"],.table input[type="datetime-local"],.table input[type="date"],.table input[type="month"],.table input[type="time"],.table input[type="week"],.table input[type="number"],.table input[type="email"],.table input[type="url"],.table input[type="search"],.table input[type="tel"],.table input[type="color"] {border-radius: 0;color: #858585;padding: 5px 4px;font-size: 14px;font-family: inherit;-webkit-box-shadow: none;box-shadow: none;-webkit-transition-duration: .1s;transition-duration: .1s;box-sizing: border-box;line-height: 20px;height: 32px;}
.table{box-sizing: border-box;}
.table thead tr.ta_th_tr {background: #EEF1F9;border: 0;height: 50px;}
.btn,.btn-default,.btn:focus,.btn-default:focus {background-color: #abbac3 !important;border-color: #abbac3;color: white}
.el-dialog__body {padding: 0 20px 20px;}
.table td:nth-child(2){margin-top: -1px;}
.table thead th{border-bottom-width: 1px;text-align: center;}
.table tbody tr:first-child td{border-top: 0;}
.table td, .table th{padding: 10px 5px;vertical-align: middle;}

</style>
<script type="text/javascript">
export default {
    data: function() {
        return {
            ruleForm: {},
            getSiteName: this.getSiteName(),
            data: {},
            name: "",
            sort: 0,
            fid: '',
            openIds:[],
            lists: [],
            uploadVisible: false,
            fileList: [],
            dialogVisible: false,
            listLoading: false,
			uploadVisible2:false,
        }
    },
    mounted: function() {
        this.$parent.ajax();
        setTimeout(this.nameFocus, 1000);
    },
    props: ['formAction', 'canupload', 'type', 'top'], //父类的数据
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function() {
            this.dialogVisible = true;
            this.listLoading = true;
            let oldFromAction = this.formAction;
            this.formAction = this.formAction + "class?type=" + this.type + '&token=' + Math.random() * 10;
            this.getAjax(this, {}, msg => {
                this.lists = msg.lists;
                this.listLoading = false;
                this.formAction = oldFromAction;
            });
        },
        handleClose() {
            this.$parent.ajax();
            this.dialogVisible = false;
        },

        addClass: function(pid) {
            var url = this.formAction + "class";
            this.postAjax(url, { name: this.name, sort: this.sort, fid: pid, type: this.type }, msg => {
                if (msg.data.status == 2) {

                     $("#add_form_" + pid).hide();
                    // $("#add_btn_" + pid).show();
                     $('#add_form_').hide();
                    // $("#add_btn_").show();
                    /*$(".add_zc").show();*/
                    this.name = "";
                    this.sort = 0;
                    this.fid = pid;
                    this.show = true;
                    //this.lists = msg.data.lists;
                    this.ajax();
                }
            }, this);
        },
        nameFocus: function() {
            $(".v_name").focus(function() {
                $(this).removeClass('noborder');
            });
        },
        addZc: function(id) {
            $("#add_btn_" + id).hide();
            $("#add_form_" + id).show();
        },
        cancelAdd: function(id) {
            $("#add_btn_" + id).show();
            $("#add_form_" + id).hide();
        },
        delzc: function(url, id, parentKey, childrenKey) { /*删除子类*/
            var that = this;
            if (!confirm("确认要删除吗？")) {
                return false;
            } else {
                var url = this.formAction + "ajaxclass";
                var dataid = id;
                this.postAjax(url, { v: id, type: 'del_zc' }, msg => {
                    if (msg.data.status == 2) {
                        that.lists[parentKey].zclass.splice(childrenKey, 1);
                        that.ajax();
                    }
                });
            }
        },
        /*删除子类结束*/
        delfc: function(url, id, key) { /*删除父类开始*/
            var that = this;
            if (!confirm("删除父分类将会把其子分类一同删除，确认要删除吗？")) {
                return false;
            } else {
                var url = this.formAction + "ajaxclass";
                var dataid = id;
                this.postAjax(url, { v: id, type: 'del_fc' }, msg => {
                    if (msg.data.status == 2) {
                        that.lists.splice(key, 1);
                        that.ajax();
                    }
                });
            }
        },
        /*删除父类结束*/
        toggleChild: function(fid) {
           if($(".zclass_" + fid).is(":hidden")){
              this.openIds.push(fid);
           }else{
               for (var i = 0; i < this.openIds.length; i++) {
                  if(this.openIds[i] == fid){
                      this.openIds.splice(i,1);
                  }
               }
           }

            $(".zclass_" + fid).toggle();
        },
        blurField: function(id, name, type) {
            var dataid = id;
            var datat = name;
            var datatype = type;
            var value = name;
            var url = this.formAction + "ajaxclass";
            this.postAjax(url, { type: 'update_class', t: datatype, id: id, v: value }, msg => {

            });

            $("#tr_" + id).find("input").addClass('noborder');
        },
        uploadClose() {
            this.uploadVisible = false;
        },
		uploadClose2() {
		    this.uploadVisible2 = false;
		},
        uploadsubmit() {
            var cover = this.implodeCover(this.fileList);
            var data = { cover: cover, id: this.uploadId }
            this.postAjax(this.formAction + "uploadpic", data, msg => {
                if (msg.data.status == 2) {
                    this.uploadVisible = false;
                    this.ajax();
                }
            }, this)
        },
		uploadsubmit2() {
		    var cover = this.implodeCover(this.fileList);
		    var data = { cover2: cover, id: this.uploadId }
		    this.postAjax(this.formAction + "uploadpic", data, msg => {
		        if (msg.data.status == 2) {
		            this.uploadVisible2 = false;
		            this.ajax();
		        }
		    }, this)
		},
        uploadPic(id, cover) {
            this.uploadVisible = true;
            this.uploadId = id;
            if (cover) this.fileList = this.splitCover(cover, "product");
            else this.fileList = [];
            console.log(this.fileList);
        },
		uploadPic2(id, cover) {
		    this.uploadVisible2 = true;
		    this.uploadId = id;
		    if (cover) this.fileList = this.splitCover(cover, "product");
		    else this.fileList = [];
		    console.log(this.fileList);
		}

    },
    components: {


    }
}

</script>
