<template>
    <section>
        <el-col :span="24" class="toolbar t-search float-r">
            <el-form :inline="true" id="search" :model="searchFields">
                <el-col :span="6">
                    <el-input placeholder="请输入会员等级" name="name" v-model="searchFields.name"></el-input>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="toSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$refs.createEdit.ajax()" v-if="data.auth.canCreate">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" min-width="30"> </el-table-column>
            <el-table-column prop="name" label="会员等级" min-width="50"> </el-table-column>
            <el-table-column prop="discount" label="折扣" min-width="50"> </el-table-column>
            <el-table-column prop="update_goto" label="升级条件" min-width="50"> </el-table-column>
            <el-table-column label="日期" min-width="100">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template scope="scope">
                    <el-button size="small" @click="$refs.createEdit.ajax(scope.row)" v-if="data.auth.canEdit">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar mtb20">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
            </el-pagination>
        </el-col>
        <my-create-edit ref="createEdit"></my-create-edit>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/memberlev/lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'member_levs',
            sels: [], //列表选中列,
            searchFields: {
                name: '',
            }
        }
    },
    mounted() {
        this.ajax();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "ajax"
    },
    methods: {
        ajax() {
            this.getAjax(this, { type: this.getOptions('type') }, msg => {});
        },
        selsChange: function(sels) {
            this.sels = sels;
        },
        toSearch() {
            this.searchField(this);
        },
        handleSizeChange(val) {
            this.data.nextPage = val;
            this.ajax();
        },
        handleCurrentChange(val) {
            this.data.nextPage = val;
            this.ajax();
        },
        handleDel(index, item) {
            this.del_vuex(item, index, this)
        },
        delAll() { /*批量删除*/
            this.deleteAll(this);
        },
        searchCallBack(res) {
            this.searchFields.user_id = res.id;
        }
    },
    components: {
        'my-create-edit': resolve => require(['./create_edit'], resolve),
    }

}

</script>
