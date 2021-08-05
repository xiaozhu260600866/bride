<template>
	<div>
		<input class="dx-input"  :value="currentValue"  hidden/>
		{{ currentValue }}
	</div>
</template>
<script type="text/javascript">
export default {
	props: ["value"],
	data() {
		return {
			getSiteName: this.getSiteName(),
		}
	},
	computed: {

		currentValue: {
			// 动态计算currentValue的值
			get: function() {
				console.log(this.value);
				console.log('eeewqw')
				if(this.value > 1000){
					this.value = this.value / 1000;
					return this.value = this.value.toFixed(1)+"km";
				}else{
					return this.value+'m';
				}
			},
			set: function(val) {
				this.$emit('input', val);
			}
		}
	}
}

</script>
