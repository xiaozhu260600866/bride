<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-col>
						<el-form-item label="借桶品牌名称搜索：">
							<el-input placeholder="借桶品牌名称" name="name" v-model="searchFields.name"></el-input>
						</el-form-item>
                        <el-form-item label="城市搜索：">
                        	<el-input placeholder="请输入城市" name="city" v-model="searchFields.city"></el-input>
                        </el-form-item>
						<el-form-item>
							<el-button type="primary" @click="toSearch">查询</el-button>
                            <el-button type="primary" @click="$refs.category.ajax()" v-if="data.auth.canClass">类别管理</el-button>
						</el-form-item>
					</el-col>
					<el-form-item>
						<el-button type="primary" @click="$router.push({path: '/vueadmin/borrowBucket/create?status=0'})" >新增</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="借桶品牌名称" min-width="250"> </el-table-column>
			<el-table-column prop="product_name" label="借桶品牌商品" min-width="250"> </el-table-column>
			
			<el-table-column prop="fclassname" label="类别" width="120"> </el-table-column>
			  <el-table-column align="center" label="下架" width="80">
                <template scope="scope">
                     <el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'putaway')"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="城市" width="250">
            	<template scope="scope">
                    {{scope.row.city}}
            	</template>
            </el-table-column>
            <el-table-column align="center" label="排序" width="78">
            	<template scope="scope">
            		<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
            	</template>
            </el-table-column>
			<el-table-column label="操作"width="300">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path: '/vueadmin/borrowBucket/create?id='+scope.row.id+'&status=0'})" >编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">

			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>
        <my-class top="2%" ref="category" :type="0" :formAction="'/admin/shop/package/'" :sizearr="300"></my-class>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/package/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'product_packages',
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				name: '',
			}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
        copy(row){
          this.getConfirm('是否复制产品',()=>{
        	this.postAjax("/admin/shop/package/copy", {
        		id: row.id,
        	}, msg => {
        		if(msg.data.status ==2){
        			this.ajax();
        		}

        	});
          })
        },
        editField2(e,row, field) {
           console.log(row)
        	this.postAjax("/admin/shop/package/editField", {
        		id: row.id,
        		field: "city",
        		value: row.cityArr.join(",")
        	}, msg => {
        		if (msg.data.status == 3) {
        			row[field] = 0;
        		}
        	});
        },
		editField(row,field){
            this.postAjax("/admin/shop/package/editField", { id:row.id,field:field,value:row[field] }, msg => {
                if (msg.data.status == 3) {
                    row[field] =0;
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
        "my-class": resolve => require(['@/components/class.vue'], resolve),
	}

}

</script>
