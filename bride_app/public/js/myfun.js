const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.updateHistory=()=>{
		Vue.prototype.updateUrl(["/pages/user/card/edit/index","/pages/user/index/main","/pages/index/main","/pages/user/coupon/list/main",'/pages/user/cart/main','/pages/user/index/main']);
	}
	Vue.prototype.thumb=(item)=>{
		console.log("a")
		Vue.prototype.postAjax("/articleOrder/thumb",{articleOrder_id:item.id},"notloading").then(msg=>{
			 if(msg.data.status == 2){
				 item.thumb = !item.thumb;
				 if(item.thumb){
					 item.thumbCount ++;
				 }else{
					  item.thumbCount --;
				 }
			 }
		});
	}
	Vue.prototype.shareData = (path, user_id, to_userid, title) => {
		return {
			title: title,
			path: path,
			success: res => {
				console.log('a');
				Vue.prototype.getError("1" + user_id);
				Vue.prototype.getError("1" + to_userid);
				Vue.prototype.postAjax("/user/card/create", {
					user_id: user_id,
					to_userid: to_userid,
					type: 3
				}, msg => {

				});
			},
			fail: res => {
				console.log(res);
			}
		}
	},
	Vue.prototype.toIndex = () => {
		let role_type = uni.getStorageSync('role_type');
		if (role_type == 0) {
			return Vue.prototype.goto("/pages/cardLists/index");
		}
		if (role_type == 1) {
			return Vue.prototype.goto("/pages/user/website/products/lists/index", 2);
		}
		if (role_type == 2) {
			return Vue.prototype.goto("/pages/shop/index/index", 2);
		}
		if (role_type == 3) {
			return Vue.prototype.goto("/pages/cardLists/index");
		}
		if (role_type == 4) {
			return Vue.prototype.goto("/pages/index/index", 2);
		}
	}
	Vue.prototype.gotoProduct = (item) => {
		console.log("aaaa")
		Vue.prototype.goto(item.is_group ? '/pages/group/show/main?id='+item.id :'/pages/product/show/main?id='+item.id,1)
		return false
	}
	Vue.prototype.checkMerchant = (url, user) => {
		console.log(url);
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				if (res.data && res.data.is_bing && user.role == 5) {
					if (user.status == 1) Vue.prototype.goto(url, 1);
					else Vue.prototype.goto("/pages/business/register/success/main");
					return false;
				} else {
					Vue.prototype.goto("/pages/user/login/main", 1);
					return false;
				}
			},
			fail(res) {
				Vue.prototype.goto("/pages/user/login/main", 1);
				return false;
			}
		})
	}
	Vue.prototype.checkSupplier = (url, user) => {
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				if (res.data && res.data.is_bing && user.role == 8) {
					Vue.prototype.goto(url, 1);
					return false;
				} else {
					Vue.prototype.goto("/pages/supplier/login/main", 1);
					return false;
				}
			},
			fail(res) {
				Vue.prototype.goto("/pages/supplier/login/main", 1);
				return false;
			}
		})
	}
	Vue.prototype.checkZtd = (url, user) => {
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				if (res.data && res.data.is_bing && user.role == 9) {
					Vue.prototype.goto(url, 1);
					return false;
				} else {
					Vue.prototype.goto("/pages/ztd/login/main", 1);
					return false;
				}
			},
			fail(res) {
				Vue.prototype.goto("/pages/ztd/login/main", 1);
				return false;
			}
		})
	}
	Vue.prototype.checkUser = (user,url, type) => {
	   if(!user.userInfo.phone){
		   return Vue.prototype.goto("/pages/user/card/register/poster", 1);
	   }else if(!user.is_authentication){
			  return Vue.prototype.goto("/pages/user/card/verified/index", 1);
	   }
	   return 	Vue.prototype.goto(url, type);
		
	}
	Vue.prototype.checkUserNoAuth = (user,url, type) => {
	   if(!user.userInfo.phone){
		   return Vue.prototype.goto("/pages/user/card/register/poster", 1);
	   }
	   return 	Vue.prototype.goto(url, type);
		
	}

}

export default myfun;