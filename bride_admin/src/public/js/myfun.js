const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.changeOrder = (order,status,message,fun) => {

        Vue.prototype.getConfirm(message,()=>{
            Vue.prototype.postAjax("/admin/shop/order/change-order-status", { id: order.id, status: status }, msg => {
               if (msg.data.status == 2) {
                   fun(msg);
               }
            });
        });
	}
}

export default myfun;
