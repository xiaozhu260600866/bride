<template>
    <section>
        <el-dialog :title="'查看'+title+'详细' " :visible.sync="dialogVisible" :top="top" :before-close="handleClose" width="100%">
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" id="search">
                    <el-form-item>
                        <input autocomplete="off" :placeholder="'请输入产品名称'" v-model="name" type="text" name="name" rows="2" validateevent="true" class="el-input__inner" @keyup="toSearch">
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="19" style="margin-right: 10px">
                <el-table ref="multipleTable" @row-click="rowClick" :data="listData" border tooltip-effect="dark" v-loading="listLoading" style="width:100%">
                    <el-table-column prop="name" label="产品名称" min-width="60"> </el-table-column>
                    <el-table-column prop="fclassname" label="分类名称" min-width="60"> </el-table-column>
                    <el-table-column prop="merchantUser" label="上传者" min-width="60"> </el-table-column>
                    <el-table-column prop="price" label="价格" min-width="80"> </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="4">
                <div class="search-product-title" @click="ajax(type)">全部分类</div>
                <el-tree :data="data.fclass" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="24" class="toolbar" style='margin:50px 0' v-if="data.lists">
                <el-pagination @current-change="handleCurrentChange" :current-page="data.lists.current_page" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.lists.total" style='float: right'>
                </el-pagination>
            </el-col>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
export default {
    props: ['title', 'top'],
    data() {
        return {
            dialogVisible: false,
            formAction: '/admin/product',
            page: 1,
            name: '',
            fclass: 0,
            class: 0,
            listLoading: false,
            data: {},
            listData: []


        }
    },
    methods: {
        ajax() {
            this.dialogVisible = true;
            this.getAjax();
        },
        getAjax() {
            this.listLoading = true;
            this.formAction = "/admin/product?page=" + this.page + "&name=" + this.name;
            $.get(this.formAction, { fclass: this.fclass, class: this.class }, msg => {
                this.data = msg;
                this.listData = msg.lists.data;
                this.listLoading = false;
            });

        },
        handleClose() {
            this.dialogVisible = false;
        },
        rowClick(row, event, column) {
            this.$emit('callBack', row, this.data.warehouse);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getAjax();
        },
        toSearch() {
            this.getAjax();
        },
        handleNodeClick(data, e, b) {
            if (e.childNodes.length == 0) {
                if (e.level == 1) {
                    this.fclass = data.value;
                } else {
                    this.class = data.value;
                }
                this.getAjax();
            }

        },
    }
}
</script>