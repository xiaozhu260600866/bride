<template>
	<section>
		<el-dialog title="选择员工" :visible.sync="dialogFormVisible" top="141px" :before-close="handleClose">
			<div class="page-content flex">
				<div class="commission_user" style="width:40%;height:300px;overflow-y:scroll">
					<table class="table">
						<thead>
							<tr>
								<td>员工</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<p class="left_user u7794" data-type="2" id-value="7794" comm-value="2" v-for="v in staff" @click="addSelect(v)">{{ v.label }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:300px;overflow-y:scroll;width:60%">
					<table class="table">
						<thead>
							<tr>
								<td width="30%">姓名</td>
								<td width="20%">类型</td>
								<td width="40%">配送费</td>
								<td width="10%"></td>
							</tr>
						</thead>
						<tbody class="commission_value">
							<tr class="u_7794" id-value="7794" v-for="(v,index) in select">
								<td class="serviceStaff">{{ v.label }}</td>
								<td><select  data-type="2" v-model="v.type">
										<option value="1">固定金额</option>
									</select></td>
								<td><input type="text" size="5" class="text-center" v-model="v.com_val" :disabled="true"><span>元</span></td>
								<td @click="select.splice(index,1)"> <button class="btn btn-xs btn-danger remove"><i class="el-icon-close" ></i></button></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="clear"></div>
				<hr>
			</div>
			<p align="right" style="margin:5px;" @click="comfirm"><button class="btn btn-sm btn-success"><i class="icon-ok"></i>确定</button></p>
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ["staff"],
	data() {
		return {
			value: [],
			dialogFormVisible: false,
			cartType: 0,
			ps_price:0,
			select:[],
			key: 0,
		}
	},
	methods: {
		addSelect(v){
			v.type = 1;
			v.com_val = this.ps_price ? this.ps_price :0;
			for (var i = 0; i < this.select.length; i++) {
				let  select= this.select[i];
				if(v.id == select.id){
					this.getError("请不要重复选择员工");
					return false;
				}
			}
			this.select.push(v);
		},
		ajax(cartType, key, staff,ps_price) {
			this.cartType = cartType;
			this.ps_price = ps_price;
			this.key = key;
			this.dialogFormVisible = true;
			if (staff) {
				this.select = staff;
			} else {
				this.select = [];
			}
		},
		comfirm() {
			if (this.select.length != 1) {
				this.getError("必须选择一个员工");
				return false;
			}
		
			let data = {
				cartType: this.cartType,
				key: this.key,
				data: this.select
			}
			this.dialogFormVisible = false;
			this.$emit("callBack", data);
		},
		handleClose() {
			this.dialogFormVisible = false;
		}
	}
}

</script>
<style type="text/css" scoped="">
.commission_user p {
	cursor: pointer;
	padding: 3px 5px;
	margin: 5px 0;
	border-bottom: #ddd 1px solid;
}

</style>
