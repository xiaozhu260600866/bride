const message = function() {};
message.install = (Vue, options) => {
	Vue.prototype.msgError = (content) => {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: false,
			success: function(res) {
				if (res.confirm) {} else if (res.cancel) {}
			}
		})
	};
	Vue.prototype.msgToast = (text, duration, success) => {
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	Vue.prototype.msgSuccess = (text, duration) => {
		uni.showToast({
			title: text,
			icon: 'success',
			duration: duration || 2000
		})
	},
	Vue.prototype.msgConfirm = (title) => {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '提示',
				content: title,
				success: function(res) {
					if (res.confirm) {
						resolve();
					} else if (res.cancel) {
						reject();
					}
				}
			})
		});
	},
	Vue.prototype.tytToast = (text, that) => {
		that.$nextTick(()=>{
			that.$refs.page.toastText = text;
			that.$refs.page.toastVisible = true;
			setTimeout(()=>{
				that.$refs.page.toastVisible = false;
			},2000)
		});
	}

}
export default message;
