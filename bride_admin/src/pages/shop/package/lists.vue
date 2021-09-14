<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="searchFields">
				<div class="Tsec_group">
					<el-col>
						<el-form-item label="套餐搜索：">
							<el-input placeholder="请输入套餐名称" name="name" v-model="searchFields.name"></el-input>
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
						<el-button type="primary" @click="$router.push({path: '/vueadmin/package/create?status=0'})" >新增</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="名称" min-width="250"> </el-table-column>
			<el-table-column prop="amount" label="金额" width="120"> </el-table-column>
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
			<el-table-column label="会员等级" min-width="180">
				<template scope="scope">
					<el-switch v-model="scope.row.member_lev_show " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'member_lev_show')"> </el-switch>
					<el-select v-if="scope.row.member_lev_show" multiple v-model="scope.row.member_lev" placeholder="请选择会员" @change="editField(scope.row,'member_lev')" filterable>
						<el-option label="普通会员" value="0"></el-option>
						<el-option :label="v.name" :value="''+v.id" v-for="v in data.lev"  ></el-option>
					</el-select>
				</template>
			</el-table-column>
            <el-table-column align="center" label="排序" width="78">
            	<template scope="scope">
            		<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
            	</template>
            </el-table-column>
			<el-table-column align="center" label="库存" width="78">
				<template scope="scope">
					<el-input v-model="scope.row.num"  @change="editField(scope.row,'num')"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="有效期" width="120">
				<template scope="scope">{{ scope.row.expire_date }}</template>
			</el-table-column>
            <el-table-column align="center" label="推荐商品" width="65">
            	<template scope="scope">
            		<el-switch v-model="scope.row.is_new " on-text="" off-text="" :active-value="1" :inactive-value="0"
            			@change="editField(scope.row,'is_new')"> </el-switch>
            	</template>
            </el-table-column>
			<el-table-column prop="product_name" label="产品" min-width="200"> </el-table-column>
			<el-table-column label="操作"width="300">
				<template scope="scope">
                    <el-button type="primary" size="small" @click="copy(scope.row)"
                    	>复制产品</el-button>
					<el-button type="primary" size="small" @click="$router.push({path: '/vueadmin/package/create?id='+scope.row.id+'&status=0'})" >编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除1</el-button>
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
			if(field == 'member_lev'){
				row[field] = row[field].join(",");
			}
            this.postAjax("/admin/shop/package/editField", { id:row.id,field:field,value:row[field] }, msg => {
                if (msg.data.status == 3) {
                    row[field] =0;
                }
				if(field == "member_lev" && msg.data.status ==2){
					window.location.reload();
				}
            });
        },
		ajax() {
			this.getAjax(this, {}, msg => {
				this.data.lists.forEach(v=>{
					v.member_lev = v.member_lev ? v.member_lev.split(",") :[];
				})
			});
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
