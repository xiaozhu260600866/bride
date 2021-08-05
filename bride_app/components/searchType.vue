<template>
	<div>
		<div class="TypeNav bg-f mb8">
			<div class="navItem">
				<p :class="['aLink',searchType == 'today' ? 'cur' :'']" @click="search('today')">今天</p>
				<p :class="['aLink',searchType == 'yesterday' ? 'cur' :'']" @click="search('yesterday')">昨天</p>
				<p :class="['aLink',searchType == 'thismonth' ? 'cur' :'']" @click="search('thismonth')">本月</p>
				<p :class="['aLink',searchType == 'thisyear' ? 'cur' :'']" @click="search('thisyear')">本年</p>
			</div>
		</div>
		
	</div>
</template>

<script>
 export default{
	 props:['searchType'],
	 methods:{
		 search(searchType){
			 this.getParent(this).searchType = searchType;
			 this.getParent(this).ajax();
		 }
	 }
 }
</script>

<style>
</style>
