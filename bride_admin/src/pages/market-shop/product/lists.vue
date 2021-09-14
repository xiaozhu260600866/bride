<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true":model="data.query">
				<div class="Tsec_group">
					<el-col>
						<el-form-item label="分类搜索：">
							<el-cascader placeholder="请选择分类" expand-trigger="hover" :options="data.fclass" v-model="data.query.fclass"></el-cascader>
						</el-form-item>
						<el-form-item label="产品名称：">
							<el-input placeholder="请输入产品名称" name="name" v-model="data.query.name"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="data.nextPage = 1;search()">查询</el-button>
							<el-button type="primary" @click="$refs.category.ajax()" >类别管理</el-button>
						</el-form-item>
					</el-col>
					<el-form-item class="mr0">
						<el-button type="primary" @click="$router.push({path: '/vueadmin/market-shop/product/create'})">新增产品</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%"
			@selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="80"> </el-table-column>
            <el-table-column prop="id" label="编号" min-width="200"> </el-table-column>
			<el-table-column prop="name" label="产品名称" min-width="200"> </el-table-column>
			<el-table-column align="center" label="城市" width="220">
				<template scope="scope">
					<div>{{scope.row.city}}</div>
				</template>
			</el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="110"> </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="100"> </el-table-column>
			<el-table-column align="center" label="原始销量" width="78">
				<template scope="scope">
					 <el-input v-model="scope.row.self"  @change="editField(scope.row,'self')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="库存" width="78">
				<template scope="scope">
					 <el-input v-model="scope.row.num"  @change="editField(scope.row,'num')"></el-input>
				</template>
			</el-table-column>

			<el-table-column align="center" label="热销榜" width="78">
				<template scope="scope">
					<el-switch v-model="scope.row.self_num " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'self_num')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="排序" width="78">
				<template scope="scope">
					 <el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="爆款" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.is_hot " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'is_hot')"> </el-switch>
				</template>
			</el-table-column>
			
			<el-table-column align="center" label="爆款首页" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.hot_index " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'hot_index')"> </el-switch>
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



			<el-table-column align="center" label="上架" width="78">
				<template scope="scope">
					<el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'putaway')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="商家商城" width="78">
				<template scope="scope">
					<el-switch v-model="scope.row.is_new " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'is_new')"> </el-switch>
				</template>
			</el-table-column>
			


			<el-table-column label="操作" width="220">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/market-shop/product/edit?id='+scope.row.id})"
						>编辑</el-button>
                        <el-button type="primary" size="small" @click="copy(scope.row)"
                        	>复制产品</el-button>
					 <el-button size="small" @click="showUrl(scope.row)" >url连接</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					<el-button size="small" @click="$refs.myinfo.ajax(scope.row.info,scope.row.id)">规格</el-button>
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
		<my-class top="2%" ref="category" :type="1" :formAction="'/admin/shop/product/'" :sizearr="300" ></my-class>
		<my-info ref="myinfo"></my-info>
		<el-dialog title="查看url" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
		    <span>{{url}}</span>
		
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				formAction: '/admin/shop/product/lists',
				data: this.formatData(this),
				siteName: this.getSiteName(),
				tableName: 'shop_products',
				sels: [], //列表选中列,
				dialogVisible:false,
				url:'',
				searchFields: {
					name: '',
				}
			}
		},
		mounted() {
			console.log('cdf');
			this.text();
		},
		methods: {
			showUrl(row) {
			   this.url  = row.is_hot ? '/pages/hot/show/index?id='+row.id : '/product/show/main?id='+row.id,
			   this.dialogVisible = true;
			},
            copy(row){
              this.getConfirm('是否复制产品',()=>{
                this.postAjax("/admin/shop/product/copy", {
                	product_id: row.id,

                }, msg => {
                    if(msg.data.status ==2){
                        this.ajax();
                    }
                	
                });
              })
            },
			editField(row, field) {
				if(field == 'member_lev'){
					row[field] = row[field].join(",");
				}
				this.postAjax("/admin/shop/product/editField", {
					product_id: row.id,
					field: field,
					value: row[field]
				}, msg => {
					if (msg.data.status == 3) {
						row[field] = 0;
					}
					if(field == "member_lev" && msg.data.status ==2){
						window.location.reload();
					}
				});
			},
			text(){
			   console.log("text");
			},
			ajax() {
				console.log("xiaozhu");
				this.getAjax(this, {
					
				}, msg => {
					this.data.lists.forEach(v=>{
						v.member_lev = v.member_lev ? v.member_lev.split(",") :[];
					})
				});
			},
			selsChange: function(sels) {
				this.sels = sels;
			},
			search(){
			  if(this.data.query.fclass && this.data.query.fclass.length){
				  this.data.query.fclassForIndex = this.data.query.fclass[this.data.query.fclass.length-1];
			  }
			 this.ajax();
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
			"my-info": resolve => require(['./layouts/info.vue'], resolve)
		}

	}
</script>
