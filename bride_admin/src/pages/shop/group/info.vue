<template>
	<div>
		<div class="Tsearch">
			<el-form :inline="true" :model="data.query">
				<div class="Tsec_group">
					<el-form-item label="订单搜索：">
						<el-input placeholder="请输入订单号" name="order_no" v-model="data.query.order_no" class="input-w300"></el-input>
					</el-form-item>
					<el-form-item label="姓名：">
						<el-input placeholder="请输入姓名" name="addr_name" v-model="data.query.addr_name" class="input-w300"></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input placeholder="请输入电话" name="addr_phone" v-model="data.query.addr_phone" class="input-w300"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group">
					<el-form-item label="产品名称">
						<el-input placeholder="请输入产品名称" name="product_str" v-model="data.query.product_str" class="input-w300"></el-input>
					</el-form-item>
				</div>
				<div class="Tsec_group Tlnav">
					<el-button type="primary" @click="data.nextPage = 1;ajax()">查询</el-button>
				</div>
			</el-form>
		</div>
		<el-table :data="data.lists" :span-method="objectSpanMethod" border class="w-b100">

			<el-table-column prop="order_group_id" label="ID" width="60"></el-table-column>
			<el-table-column prop="order_no" label="订单号" width="125"></el-table-column>
			<el-table-column prop="product_str" label="产品名称" min-width="200">
				<template scope="scope">{{ scope.row.getOrder.product_str }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="成团人数" width="80">
				<template scope="scope">{{ scope.row.getGroup.group_num }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="可加人数" width="80">
				<template scope="scope">{{ scope.row.getGroup.leftNum }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="角色" width="60">
				<template scope="scope">{{ scope.row.is_head == 0 ? '团员' :'团长' }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="姓名" width="80">
				<template scope="scope">{{ scope.row.getOrder.addr_name }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="电话" width="115">
				<template scope="scope">{{ scope.row.getOrder.addr_phone }}</template>
			</el-table-column>
			<el-table-column prop="course_str" label="地址" min-width="100">
				<template scope="scope">{{ scope.row.getOrder.addr_address }}</template>
			</el-table-column>
			<el-table-column prop="created_at" label="日期" width="170"></el-table-column>
			<el-table-column prop="status" label="状态" width="80">
				<template scope="scope">{{ scope.row.getOrder.status_message }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button type="primary" size="mini" @click.native="changeOrder(scope.row.getOrder,9)" v-if="scope.row.getOrder.status<9">核销</el-button>

				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar mtb20">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage"
				:page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total"
				style='float: right'>
			</el-pagination>
		</el-col>
	</div>
</template>
<script type="text/javascript">
	let rowStart = 0;
	export default {
		data() {
			return {
				group_ids: [],
				rowArr: [0],
				formAction: "/admin/shop/order/group-lists",
				data: this.formatData(this),
				sels: [], //列表选中列,
				siteName: this.getSiteName(),
			}
		},
		mounted() {
			this.ajax();
		},
		methods: {
			handleSizeChange(val) {
				this.data.nextPage = val;
				this.ajax();
			},
			handleCurrentChange(val) {
				this.data.nextPage = val;
				this.ajax();
			},
			changeOrder(res, status) {
				this.getConfirm("是否确认收货？", msg => {
					 this.postAjax("/admin/shop/order/change-order-status",{
						id: res.id,
						status: status
					}, msg => {
						if (msg.data.status == 2) {
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this, {}).then(msg => {

				});
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex == 0 || columnIndex == 3 || columnIndex == 4) {
					let infoNum = 0;
					if (this.in_array(rowIndex, this.data.rowArr)) {
						this.data.lists.forEach(msg => {
							if (row.order_group_id == msg.order_group_id) {
								infoNum++;
							}
						});
						rowStart += infoNum;
						return {
							rowspan: infoNum,
							colspan: 1
						};
					} else {
						console.log(1);
						return {
							rowspan: 0,
							colspan: 0
						}
					}
				}
			}
		}
	}
</script>
