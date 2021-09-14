<template>
	<section>
		<table class="dx-table" v-loading="data.listLoading">
				<thead>
					<tr class="th-tr">
						<th class="tr-first" v-if="selectAll"><input type="checkbox" name=""></th>
						<th>新闻标题</th>
						<th>分类名称</th>
						<th>日期</th>
						<th>点击量</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr class="td-tr" v-for="(v,key) in data.lists">
						<td class="tr-first" v-if="selectAll"><input type="checkbox" name=""></td>
						<div>
						<td>{{ v.title }}</td>
						<td>{{ v.fclassname }}</td>
						<td>{{ v.created_at }}</td>
						<td>{{ v.views }}</td></div>
						<td>
							<el-button size="small" @click="$router.push({path:'/vueadmin/website/article-edit?id='+v.id})" v-if="data.auth.canEdit">编辑</el-button>
							<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
						</td>
					</tr>
				</tbody>
			</table>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["data","selectAll"]
}	
</script>