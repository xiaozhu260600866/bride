<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" width="740px" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-input v-model="ruleForm.name" style="width: 260px;"></el-input>
            </el-form-item>
            <h2 class="pb20 pt10" style="color: #324057;">权限列表</h2>
            <el-col :span="24" v-for="(parent,key) in menu">
                <el-checkbox v-model="parent.isCheck" @change="checkData(parent,[])" style="margin-left: 60px">{{ parent.label }}</el-checkbox>
                <el-col :span="24" v-if="parent.children" v-for="(son,key1) in parent.children" class="mb20" style="margin-left: 60px;">
                    <el-checkbox v-if="!son.hasPremission" v-model="son.isCheck" @change="checkData(son,[key])">{{ son.label }}</el-checkbox>
                    <!-- 四级 -->
                    <el-col :span="24" v-if="son.children" style="margin-left: 30px" v-for="(grand,key2) in son.children">
                        <el-col :span="24" v-if="grand.children" style="margin-left: 20px">
                            <el-checkbox style="margin-right: 80px;width:10%" v-model="grand.isCheck" @change="checkData(grand,[key,key1])">{{ grand.label }}</el-checkbox>
                            <el-checkbox v-for="(grand2,key3) in grand.children" v-model="grand2.isCheck" @change="checkData(grand2,[key,key1,key2])">{{ grand2.label }}</el-checkbox>
                        </el-col>
                    </el-col>
                    <div v-if="son.hasPremission">
                        <!-- 三级 -->
                        <el-col :span="24" v-if="son.children" style="margin-left: 80px">
                            <el-checkbox style="margin-right: 80px;width:15%" v-model="son.isCheck" @change="checkData(son,[key])">{{ son.label }}</el-checkbox>
                            <el-checkbox style="" v-for="(grand,key2) in son.children" v-model="grand.isCheck" @change="checkData(grand,[key,key1])">{{ grand.label }}</el-checkbox>
                        </el-col>
                    </div>
                </el-col>
            </el-col>
            <div class="clearfix"></div>
            <el-form-item class="mt20 mb0">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {},
            formAction: '',
            dialogFormVisible: false,
            integral: 0,
            menu: []
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.ruleForm.menu = this.menu;
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.dialogFormVisible = false;
                            this.$parent.ajax();
                        }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        checkData(data, menuKeyArr) {
            if (data.isCheck == true) {
                if (menuKeyArr.length == 1) {
                    this.menu[menuKeyArr[0]].isCheck = true;
                } else if (menuKeyArr.length == 2) {
                    this.menu[menuKeyArr[0]].isCheck = true;
                    this.menu[menuKeyArr[0]].children[menuKeyArr[1]].isCheck = true
                } else if (menuKeyArr.length == 3) {
                    this.menu[menuKeyArr[0]].isCheck = true;
                    this.menu[menuKeyArr[0]].children[menuKeyArr[1]].isCheck = true
                    this.menu[menuKeyArr[0]].children[menuKeyArr[1]].children[menuKeyArr[2]].isCheck = true
                }
                this.checkAll(data, true);
            } else {
                this.checkAll(data, false);
            }
        },
        checkAll(data, trueOrFalse) {
            if ("children" in data) {
                for (var i = 0; i < data.children.length; i++) {
                    var son = data.children[i];
                    son.isCheck = trueOrFalse
                    if ("children" in son) {
                        for (var j = 0; j < son.children.length; j++) {
                            var grand = son.children[j];
                            grand.isCheck = trueOrFalse
                            if ('children' in grand) {
                                for (var k = 0; k < grand.children.length; k++) {
                                    grand.children[k].isCheck = trueOrFalse
                                }
                            }
                        }
                    }
                }
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        editMenu(checkArr, leftMenu) {
            this.makeMenu(checkArr, leftMenu,'false');
        },
        ajax: function(params) {
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/role/edit?id=' + params.id;
                this.ruleForm = params;
                this.menu = this.getMenu(this.$router.options.routes, 0);
                this.editMenu(params.role_menus_arr, this.menu);

            } else {
                this.menu = this.getMenu(this.$router.options.routes, 0);
                this.formAction = '/admin/role/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        },

        getMenu: function(data, type) {
            var menu = [];
            var leftMenu = data;
            for (var i = 0; i < leftMenu.length; i++) {
                if (!leftMenu[i].hidden) {
                    if (type == 1) {
                        if (leftMenu[i].isCheck) menu.push({ url: leftMenu[i].url, label: leftMenu[i].label, id: i, children: [] })
                    } else {
                        menu.push({ label: leftMenu[i].name, id: i, children: [], isCheck: false, url: leftMenu[i].url })
                    }

                    for (var j = 0; j < leftMenu[i].children.length; j++) {

                        var son = leftMenu[i].children[j];

                        if (!son.hidden) {
                            if ("children" in son) {
                                if (type == 1) {
                                    if (son.isCheck) menu[menu.length - 1].children.push({ url: son.url, label: son.label, id: j + i, children: [] })
                                } else {
                                    menu[menu.length - 1].children.push({ label: son.name, id: j + i, children: [], isCheck: false, url: son.url })
                                }

                                for (var k = 0; k < son.children.length; k++) {
                                    var grand = son.children[k];
                                    if (!grand.hidden) {
                                        var grand_permission = type == 0 ? 'permission' : 'children';
                                        if (grand_permission in grand) {
                                            if (type == 1) {
                                                if (grand.isCheck) menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.push({ url: grand.url, label: grand.label, id: i + j + k, children: [] });
                                            } else {
                                                menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.push({ label: grand.name, id: i + j + k, children: [], isCheck: false, url: grand.url });
                                            }
                                            var grandChildren = type == 0 ? grand.permission : grand.children;
                                            for (var q = 0; q < grandChildren.length; q++) {

                                                if (type == 1) {
                                                    var grand2 = grand.children[q];
                                                    if (menu.length) {
                                                        var newMenu = menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children[menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.length - 1];
                                                        if (grand2.isCheck) {
                                                            newMenu.children.push({ url: grand2.url, label: grand2.label, id: i + j + k + q });
                                                        }
                                                    }

                                                } else {
                                                    var grand2 = grand.permission[q];
                                                    var newMenu = menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children[menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.length - 1];
                                                    newMenu.children.push({ label: grand2.name, id: i + j + k + q, isCheck: false, url: grand2.url });
                                                }

                                            }
                                        } else {
                                            if (type == 1) {
                                                if (grand.isCheck) menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.push({ url: grand.url, label: grand.label, id: i + j + k });

                                            } else {
                                                menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.push({ label: grand.name, id: i + j + k, isCheck: false, url: grand.url });
                                            }
                                        }

                                    }

                                }
                            } else if ("permission" in son) {
                                menu[menu.length - 1].children.push({ label: son.name, id: j + i, children: [], hasPremission: true, isCheck: false, url: son.url })
                                for (var k = 0; k < son.permission.length; k++) {
                                    var grand = son.permission[k];
                                    if (!grand.hidden) {
                                        menu[menu.length - 1].children[menu[menu.length - 1].children.length - 1].children.push({ label: grand.name, id: i + j + k, isCheck: false, url: grand.url });
                                    }
                                }

                            } else {
                                menu[menu.length - 1].children.push({ label: son.name, id: j + i, isCheck: false, url: son.url });
                            }
                        }
                    }
                }
            }
            return menu;
        }
    },
}

</script>
