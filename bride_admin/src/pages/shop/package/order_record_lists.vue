<template>
	<section>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单号：">
						<el-input placeholder="请输入订单号" name="order_no" v-model="data.query.order_no"></el-input>
					</el-form-item>
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
				</div>
				<div class="Tsec_group">
					<el-form-item label="回桶品牌：">
						<el-input placeholder="请输入回桶品牌" name="bucket_brand" v-model="data.query.bucket_brand"></el-input>
					</el-form-item>
					<el-form-item label="地址：">
						<el-input placeholder="请输入客户地址" name="addr_address" v-model="data.query.addr_address"></el-input>
					</el-form-item>
					<el-form-item label="配送员：">
						<el-input placeholder="请输入配送员姓名" name="staffname" v-model="data.query.staffname"></el-input>
					</el-form-item>
					<el-form-item label="日期搜索：">
						<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
                    <el-form-item label="完成日期搜索：">
                    	<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.finish_at"> </el-date-picker>
                    </el-form-item>
					<el-form-item label="回桶供应商：">
						<el-select v-model="data.query.supplier_bucket_id" placeholder="请选择回桶供应商">
							<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
							
						</el-select>
					</el-form-item>

				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="toSearch">查询</el-button>
					<el-button type="primary" @click="exportExcel">导出</el-button>
				</div>
			</el-form>
		</div>
		<el-col :span="24" class="flex">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax()">
				<el-tab-pane label="已付款" :name="''+0"></el-tab-pane>
				<el-tab-pane label="发货中" :name="''+5"></el-tab-pane>
				<el-tab-pane label="已完成" :name="''+9"></el-tab-pane>
			</el-tabs>
			<h3 class="pl15 lh-40">共{{data.sum}}件</h3>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="订单号" width="130">
				<template scope="scope"> {{ scope.row.order_no }}</template>
			</el-table-column>
			
			
			<el-table-column label="商品" min-width="150">
				<template scope="scope"> {{ scope.row.getProduct?scope.row.getProduct.name:'' }} {{scope.row.deleted_at}} </template>
			</el-table-column>
            <el-table-column label="回桶品牌" width="130">
                    <template scope="scope">
                        <div v-if="scope.row.bucket_type != '换桶'">
                            <p v-if="scope.row.bucket_type == '回桶'">{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
                            <p v-if="scope.row.bucket_type != '回桶'">{{scope.row.bucket_type}}：{{scope.row.bucket_brand + '*' + scope.row.bucket_num }}</p>
                        </div>
                        <div>
                            回桶金额：{{scope.row.bucket_amount}}
                        </div>
                     
                    </template>
            </el-table-column>
			<el-table-column prop="num" label="次数" width="50"> </el-table-column>
			<el-table-column label="姓名" width="80">
				<template scope="scope"> {{ scope.row.getOrder ? scope.row.getOrder.addr_name : '该订单已被删除' }}</template>
			</el-table-column>
			<el-table-column label="电话" width="120">
				<template scope="scope"> {{ scope.row.getOrder? scope.row.getOrder.addr_phone : '该订单已被删除' }}</template>
			</el-table-column>
			<el-table-column label="地址" min-width="150">
				<template scope="scope">
					<span v-if="scope.row.addr_address">{{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</span>
					<span v-else>
						<span v-if="scope.row.getOrder">
							 {{ scope.row.getOrder.addr_city }}-{{ scope.row.getOrder.addr_area }}-{{ scope.row.getOrder.addr_address }}
						</span>

					</span>

				</template>
			</el-table-column>
			
			<el-table-column label="配送员" width="150" >
				<template scope="scope">
					<el-select v-model="scope.row.getStaff.userInfo.name" placeholder="请选择配送员" @change="editStaff($event,scope.row)" filterable>
						<el-option :label="v.userInfo.name" :value="v.id" v-for="v in data.staff_new"></el-option>
					</el-select>
				</template>
			</el-table-column>
	<!-- 		<el-table-column label="供货商" width="150">
				<template scope="scope">
					<el-select v-model="scope.row.getSupplier.userInfo.company_name" placeholder="请选择供货商" @change="editSupplier($event,scope.row)">
						<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
					</el-select>
				</template>
			</el-table-column> -->
		
		<!-- 	<el-table-column label="回桶供货商" width="150">
				<template scope="scope">
					<el-select v-model="scope.row.getSupplierBucket.userInfo.company_name" placeholder="请选择供货商" @change="editSupplierBucket($event,scope.row)">
						<el-option :label="v.label" :value="v.value" v-for="v in data.supplier"></el-option>
					</el-select>
				</template>
			</el-table-column> -->
			<el-table-column label="备注" width="160">
				<template scope="scope">
					<el-input v-model="scope.row.remark"  @change="editField(scope.row,'remark')"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="付款日期" width="100">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
            <el-table-column label="区域" width="100">
				<template scope="scope">
				        	<el-input v-model="scope.row.area"  @change="editField(scope.row,'area')"></el-input>
				</template>
            	<!-- <template scope="scope">
					
					<el-input v-model="scope.row.area"  @change="editField(scope.row,'area')"></el-input>
                </template> -->
            </el-table-column>
		<!-- 	<el-table-column label="有效期" width="100" >
				<template scope="scope">{{ scope.row.start_at }} - {{scope.row.end_at}}</template>
			</el-table-column> -->
			<el-table-column label="接单日期" width="100">
				<template scope="scope">{{ scope.row.staff_at }}</template>
			</el-table-column>
			<el-table-column label="结束日期" width="100" >
				<template scope="scope">{{ scope.row.finish_at }}</template>
			</el-table-column>
		<!-- 	<el-table-column prop="bucket_date" label="回桶日期" width="60" > </el-table-column> -->
			<el-table-column label="操作" width="260">
				<template scope="scope">
					<el-button type="primary" size="small" @click="finish(scope.row)" v-if="scope.row.status == 5">完成</el-button>
					<el-button type="primary" size="small" @click="print(scope.row)">打印</el-button>
					<el-button type="primary" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[5,10,15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
			</el-pagination>
		</el-col>

		<my-staff ref="staff"></my-staff>

		<!-- 小票打印 -->
		<div class="print" style="display:none">
			<div style="font-size: 18px;text-align: center;margin-bottom: 15px;font-weight: bold;">电子票据</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">订单编号：<span style="font-size: 11px;font-family: Arial">{{order.order_no}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">日期：<span style="font-size: 11px;font-family: Arial">{{order.payed_at}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">姓名：{{order.addr_name}}</div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">电话：<span style="font-size: 11px;font-family: Arial">{{order.addr_phone}}</span></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;">地址：{{order.addr_address}}</div>

			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<table cellpadding="0" cellspacing="0" width="100%" >
				<tr>
					<td height="18" width="80%" style="font-size: 10px;">商品名称</td>
					<td width="20%" style="font-size: 10px;font-family: Arial;text-align: center;">数量</td>
				</tr>
			</table>
			<table cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td height="18" width="80%" style="font-size: 10px;">{{order.product_str}}</td>
					<td width="20%" style="font-size: 10px;font-family: Arial;text-align: center;">{{order.num}}</td>
				</tr>
				</table>
			<div style="border-bottom: 1px #333 double;margin: 10px 0;"></div>
			<div style="font-size: 11px;line-height: 16px;margin: 2px 0;min-height: 40px;">备注：{{order.remark}}</div>
		</div>
	</section>
</template>
<script type="text/javascript">
import {getLodop}  from '@/public/js/LodopFuncs' //导入模块
export default {
	data() {
		return {
			formAction: '/admin/shop/package/order-record-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',
			order:{},
			pageSize:15,
			sels: [], //列表选中列,
			searchFields: {

			}
		}
	},
	mounted() {
		this.postAjax("/admin/shop/package/order-record-lists2",{},msg=>{
			this.$set(this.data,"staff_new",msg.data.staff_new);
		},"notloading").then(msg=>{
		})
		this.postAjax("/admin/shop/package/order-record-lists3",{},msg=>{
			this.$set(this.data,"supplier",msg.data.supplier);
		},"notloading").then(msg=>{
		})
		this.ajax();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		"$route": "ajax"
	},
	methods: {
		editSupplier(event,row){
			console.log(event)
			console.log(row)
			this.postAjax("/admin/shop/package/edit-order-supplier",{id:row.id,take_supplier_user_id:event}).then(msg=>{
				if(msg.data.status == 2){
					this.ajax();
				}
			});
		},
		editSupplierBucket(event,row){
			this.postAjax("/admin/shop/package/edit-order-supplier",{id:row.id,supplier_bucket_id:event}).then(msg=>{
				if(msg.data.status == 2){
					this.ajax();
				}
			});
		},
		editStaff(event,row){
			console.log(event)
			console.log(row)
			this.postAjax("/admin/shop/package/edit-order-staff",{id:row.id,staff_userid:event}).then(msg=>{
				if(msg.data.status == 2){
					this.ajax();
				}
			});
		},
		print(item){
			this.order = item;
			setTimeout(()=>{
				let LODOP=getLodop();
				LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_样式风格");
				LODOP.ADD_PRINT_HTM(0,0,'48mm','100%',$(".print").html());
				LODOP.PREVIEW();
			},500);
		},
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
			this.getAjax(this, {  }, msg => {});
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
			this.data.query.pageSize = val;
			//this.data.nextPage = val;
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
