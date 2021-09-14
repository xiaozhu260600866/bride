<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="商品搜索：">
						<el-input placeholder="请输入商品名称" name="product_str" v-model="data.query.product_str"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input placeholder="请输入客户姓名" name="addr_name" v-model="data.query.addr_name"></el-input>
					</el-form-item>
					 <el-form-item label="电话：">
						<el-input placeholder="请输入客户电话" name="addr_phone" v-model="data.query.addr_phone"></el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-input placeholder="请输入区域" name="area" v-model="data.query.area"></el-input>
					</el-form-item>
					<el-form-item label="配送员：">
						<el-input placeholder="请输入配送员" name="staffname" v-model="data.query.staffname"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
                    <el-form-item label="完成日期搜索：">
                    	<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.finish_at"> </el-date-picker>
                    </el-form-item>

				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="primary" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>
		<el-col :span="24" class="flex">
			<!-- <el-tabs v-model="data.query.status" type="card" @tab-click="ajax()">
				<el-tab-pane label="已付款" :name="''+0"></el-tab-pane>
			
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
			</el-tabs> -->
			<h3 class="pl15 lh-40">共{{data.sum}}件</h3>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="订单号" width="130">
				<template scope="scope"> {{ scope.row.order_no }}</template>
			</el-table-column>
			<el-table-column label="空桶商品" min-width="150">
				<template scope="scope"> <div v-if="scope.row.getProduct">{{ scope.row.getProduct.name }} {{scope.row.deleted_at}}</div> </template>
			</el-table-column>
           
			<el-table-column prop="num" label="次数" width="50"> </el-table-column>
			<el-table-column label="姓名" width="80">
				<template scope="scope"> {{ scope.row.getOrder ? scope.row.getOrder.addr_name : '该订单已被删除' }}</template>
			</el-table-column>
			<el-table-column label="电话" width="120">
				<template scope="scope"> {{ scope.row.getOrder? scope.row.getOrder.addr_phone : '该订单已被删除' }}</template>
			</el-table-column>
			<el-table-column label="配送员" width="100">
				<template scope="scope"> {{ scope.row.staff_name }}</template>
			</el-table-column>
			
			<el-table-column label="备注" width="160">
				<template scope="scope">{{ scope.row.remark }}</template>
			</el-table-column>
			<el-table-column label="付款日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
            <el-table-column label="区域" width="100">
            	<template scope="scope">
                <el-input v-model="scope.row.area"  @change="editField(scope.row,'area')"></el-input>
                </template>
            </el-table-column>
			
			
			<el-table-column label="操作" width="190">
				<template scope="scope">
				
					 <el-button type="primary" size="small" @click="finish(scope.row)" v-if="scope.row.status == 0">完成</el-button>
					<el-button type="primary" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>

		<my-staff ref="staff"></my-staff>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/package/order-record-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',

			sels: [], //列表选中列,
			searchFields: {

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
        editField(row, field) {
        	this.postAjax("/admin/shop/package/orderEditField", {
        		id: row.id,
        		field: field,
        		value: row[field]
        	}, msg => {
        		if (msg.data.status == 3) {

        		}
        	});
        },
		finish(v){
			this.getConfirm("是否确认完成",msg=>{
				this.postAjax("/admin/shop/package/change-record-order-status",{id:v.id},msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				});
			});
		},
		ajax() {
			this.getAjax(this, {status:9  }, msg => {});
		},
		exportExcel() {
		   let url = this.urlApendOpenid("/admin/shop/package/order-record-export", this);
		   window.open(this.siteName+url);
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
			this.del_vuex(item, index, this,'/admin/shop/package/record-del')
		},
		delAll() { /*批量删除*/
			this.deleteAll(this,'/admin/shop/package/record-del-all');
		},
		searchCallBack(res) {
			this.searchFields.card_user_id = res.id;
		},
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {
		'my-staff': resolve => require(['./layouts/staff'], resolve),
	}

}

</script>
