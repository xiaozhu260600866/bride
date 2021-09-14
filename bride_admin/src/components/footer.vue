<template>
  <!-- src="../assets/icon/home-page.png" -->
  <div class="menu_footer">
    <div class="div">
      <a @click="$router.push({path:'/wap/index'})" style="width:25%;float:left">
        <img class="img" src="../assets/icon/home-page.png" style="width:22px;height: 22px" />
        <div  :class="['present','p',url=='/wapindex' ? 'cur' :'']">首页</div>
      </a>
      <a @click="$router.push({path:'/wap-product/class'})" style="width:25%;float:left">
        <img class="img" src="../assets/icon/pro-class.png" style="width:22px;height: 22px" />
        <div  :class="['present','p',url=='/product/class' ? 'cur' :'']">分类</div>
      </a>
      <a href="/pages/user/cart/main" open-type="redirect" style="width:25%;float:left">
        <img class="img" src="../assets/icon/s-cart.png" style="width:22px;height: 22px" />
         <div  :class="['present','p',url=='/cart/lists' ? 'cur' :'']">购物车</div>
      </a>
      <a href="/pages/user/index/main" open-type="redirect" style="width:25%;float:left">
        <img class="img" src="../assets/icon/m-center.png" style="width:22px;height: 22px" />
         <div  :class="['present','p',url=='/user' ? 'cur' :'']">我的</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['url'],
  methods:{
    checkLogin(url){
      this.checkLogin(res=>{
          this.goto(url);
      });
    }
  }
}

</script>
<style type="text/css">
.menu_footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);
  -webkit-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);
  -moz-box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);
  z-index: 10;
}

.menu_footer .div {
  float: left;
  width: 100%;
  text-align: center;
}

.menu_footer .div .img {
  height: 28px;
  margin: 4px auto 0;
  line-height: 28px;
  display: flex;
}

.menu_footer .p {
  font-size: 12px;
  color: #666;
  line-height: 22px;
}

.menu_footer .p.cur {
  color: #ff721f;
}

</style>
