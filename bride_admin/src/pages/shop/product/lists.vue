<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true":model="data.query">
				<div class="Tsec_group">
					<el-col>
						<el-form-item label="分类搜索：">
							<el-select v-model="data.query.fclassForIndex" placeholder="请输入分类">
								<el-option v-for="v in data.fclass" :label="v.label" :value="v.value">
							</el-option>
						</el-select>
						</el-form-item>
						<el-form-item label="产品搜索：">
							<el-input placeholder="请输入产品名称" name="name" v-model="data.query.name"></el-input>
						</el-form-item>
						<el-form-item label="城市搜索：">
							<el-input placeholder="请输入城市" name="city" v-model="data.query.city"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="ajax()">查询</el-button>
							<el-button type="primary" @click="$refs.category.ajax()" v-if="data.auth.canClass">类别管理</el-button>
						</el-form-item>
					</el-col>
					<el-form-item class="mr0">
						<el-button type="primary" @click="$router.push({path: '/vueadmin/shop/product/create'})" v-if="data.auth.canCreate">新增产品</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<el-col :span="24" v-if="data.show">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane :label="'审核中'" :name="''+0"></el-tab-pane>
				<el-tab-pane :label="'已审核'" :name="''+1"></el-tab-pane>
				<!-- <el-tab-pane :label="'电信产品'" :name="''+3"></el-tab-pane> -->
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading" class="proLists">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="id" label="产品编号" width="70"> </el-table-column>
			<el-table-column prop="name" label="产品名称" min-width="200"> </el-table-column>
			<el-table-column  label="产品品牌" width="160">
				<template scope="scope">
					<el-select v-model="scope.row.brand_name" placeholder="请选择品牌" @change="editField(scope.row,'brand_name')">
						<el-option label="请选择品牌" :value="0"> </el-option>
						<el-option v-for="v in data.brand" :label="v.label" :value="v.label"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="80"> </el-table-column>
			<el-table-column prop="price" label="价格" width="90"> </el-table-column>
			<el-table-column align="center" label="库存" width="90">
				<template scope="scope">
					<el-input v-model="scope.row.num"  @change="editField(scope.row,'num')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="城市" width="220">
				<template scope="scope">
					<div>{{scope.row.city}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="原始销量" width="78">
				<template scope="scope">
					<el-input v-model="scope.row.self" @change="editField(scope.row,'self')"></el-input>
				</template>
			</el-table-column>
			<el-table-column align="center" label="排序" width="78">
				<template scope="scope">
					<el-input v-model="scope.row.sort" @change="editField(scope.row,'sort')"></el-input>
				</template>
			</el-table-column>

			<!-- <el-table-column align="center" label="热销榜" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.self_num " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'self_num')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="精选拼团" width="65">
				<template scope="scope">
					 <el-switch v-model="scope.row.group_order_num " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'group_order_num')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="低价火拼" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.group_order_num " on-text="" off-text="" :active-value="1"
						:inactive-value="0" @change="editField(scope.row,'group_order_num')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="活动专区" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.activity " on-text="" off-text="" :active-value="1"
						:inactive-value="0" @change="editField(scope.row,'activity')"> </el-switch>
				</template>
			</el-table-column> -->
			<el-table-column align="center" label="推荐商品" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.is_new " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'is_new')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column align="center" label="上架" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'putaway')"> </el-switch>
				</template>
			</el-table-column>
			 <el-table-column align="center" label="爆款" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.is_hot " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'is_hot')"> </el-switch>
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

			<el-table-column align="center" label="爆款首页" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.hot_index " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'hot_index')"> </el-switch>
				</template>
			</el-table-column>
			<!--<el-table-column align="center" label="电信" width="65">
				<template scope="scope">
					<el-switch v-model="scope.row.dianxin " on-text="" off-text="" :active-value="1" :inactive-value="0"
						@change="editField(scope.row,'dianxin')"> </el-switch>
				</template>
			</el-table-column> -->
			<el-table-column label="日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="335">
				<template scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/vueadmin/shop/product/edit?id='+scope.row.id})"
						v-if="data.auth.canEdit">编辑</el-button>
						<el-button type="primary" size="small" @click="copy(scope.row)"
							>复制产品</el-button>
					<el-button size="small" @click.native="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
					 <el-button size="small" @click.native="changeStatus(scope.$index, scope.row,'2')" type="warning" v-if="scope.row.status!=2">审核拒绝</el-button>	
					<el-button size="small" @click="showUrl(scope.row)" >url连接</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
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
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/shop/product/'" :sizearr="300"></my-class>
		<my-info ref="myinfo"></my-info>
		<el-dialog title="查看url" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
		    <span>{{url}}</span>
		
		</el-dialog>
				<my-status ref="status" style="width:100%" formAction="/admin/merchant/product-change-status" />
	</section>
</template>
<style type="text/css">
.proLists .el-input__inner{padding: 0 8px;}
</style>
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
			changeStatus(index, item, status) {
				this.$refs.status.ajax({ id: item.id, status: status });
			},
			handleClose() {
			    this.dialogVisible = false;
			},
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
			editField2(e,row, field) {
			   console.log(row)
				this.postAjax("/admin/shop/product/editField", {
					product_id: row.id,
					field: "city",
					value: row.cityArr.join(",")
				}, msg => {
					if (msg.data.status == 3) {
						row[field] = 0;
					}
				});
			},
			text(){
			   console.log("text");
			},
			ajax() {
				console.log("xiaozhu");
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
			"my-info": resolve => require(['./layouts/info.vue'], resolve),
				'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
		}

	}
</script>
