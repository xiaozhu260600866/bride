<template>
    <section>
        <div class="Tsearch">
            <el-form :inline="true" :model="searchFields">
                <div class="Tsec_group">
                    <el-form-item label="姓名：">
                        <el-input v-model="searchFields.name" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="呢称：">
                        <el-input v-model="searchFields.nickname" placeholder="请输入联系人呢称"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input v-model="searchFields.phone" placeholder="请输入联系人电话"></el-input>
                    </el-form-item>
                </div>
                <div class="Tsec_group">
                    <el-form-item label="投资方：">
                        <el-input v-model="searchFields.company_name" placeholder="请输入投资方名称"></el-input>
                    </el-form-item>
                </div>
                <div class="Tsec_group Tlnav">
                    <el-button type="primary" @click="toSearch">查询</el-button>
                    <el-button type="success" @click="exportExcel">导出数据</el-button>
                </div>
                <div class="Tlnav-po">
                    <el-button type="primary" @click="$refs.createEdit.ajax('',data.citys)">新增</el-button>
                </div>
            </el-form>
        </div>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
            @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column label="序号" width="60">
                <template scope="scope">{{ scope.$index+1 }}</template>
            </el-table-column>

            <el-table-column label="区域代理名称" min-width="150">
                <template scope="scope">{{ scope.row.company_name }}</template>
            </el-table-column>
            <el-table-column label="姓名" min-width="150">
                <template scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="120">
                <template scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column label="呢称" width="100">
                <template scope="scope">{{ scope.row.getUser.nickname }}</template>
            </el-table-column>

            <el-table-column prop="amount" label="收益" width="120"> </el-table-column>
            <el-table-column label="所在街道" min-width="150">
                <template scope="scope">{{ scope.row.city}}</template>
            </el-table-column>

            <el-table-column label="日期" width="170">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <!-- <el-table-column label="是否推荐到首页" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.show_index2" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'show_index2')"> </el-switch>
				</template>
			</el-table-column> -->


            <el-table-column label="操作" width="110">
                <template scope="scope">
                    <el-dropdown>
                        <el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="$refs.createEdit.ajax(scope.row,data.citys)">编辑</el-dropdown-item>
                            <el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar mtb20">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
                :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
                style='float: right'>
            </el-pagination>
        </el-col>
        <my-create-edit ref="createEdit"></my-create-edit>
    </section>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                formAction: '/admin/investor/lists',
                data: this.formatData(this),
                dialogFormVisible: false,
                userId: '',
                siteName: this.getSiteName(),
                tableName: 'investors',
                sels: [], //列表选中列,
                searchFields: {
                    user_id: '',
                    shareSource: '',
                    nickname: '',
                }
            }
        },
        mounted() {
            this.ajax();
        },
        methods: {
            handleClose() {
                this.dialogFormVisible = false;
            },
            editField(row, field) {
                this.postAjax("/admin/investor/editField", {
                    id: row.id,
                    field: field,
                    value: row[field]
                }, msg => {
                    if (msg.data.status == 3) {
                        row[field] = 0;
                    }
                });
            },

            ajax() {
                this.getAjax(this, {}, msg => {});
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            toSearch() {
                this.searchField(this);
            },
            exportExcel() {
                window.location.href = this.siteName + "admin/investor/export?api_token=" + this.getUser().api_token;
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
            },
            clickStatus(tab, event) {
                this.data.query.status = tab.name;
                this.ajax();
            },
            changeStatus(index, item, status) {
                this.$refs.status.ajax({
                    id: item.id,
                    status: status
                });
            },
        },
        components: {
            'my-create-edit': resolve => require(['./create_edit'], resolve),
        }

    }
</script>
