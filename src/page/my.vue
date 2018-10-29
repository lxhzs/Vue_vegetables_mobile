<template>
  <div class="main">
        <div class="top_bg">
            <router-link to="/modify_head">
              <img class="my_head" :src="profile.thumbnail || '../static/my_head.png'">
              <span>编辑</span>
            </router-link>
        </div>
        <ul class="list_bar">
            <router-link to="/my_order" tag="li">
                <img src="../image/my_car.png">
                <p>待配送</p>
            </router-link>
            <router-link to="/coupon_mine" tag="li">
                <img src="../image/Coupon.png">
                <p>优惠卷</p>
            </router-link>
            <router-link to="/my_collect" tag="li">
                <img src="../image/my_collect.png">
                <p>我的收藏</p>
            </router-link>
        </ul>

        <ul class="my_list">
          <router-link to="/my_order" tag="li">
            <div class="my_list_left">
                <img src="../image/my_order.png">
                <p>我的订单</p>
            </div>
            <div class="my_list_right" >
                <p>查看全部订单</p>
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
          <router-link to="/address" tag="li">
            <div class="my_list_left">
                <img src="../image/my_location.png">
                <p>地址管理</p>
            </div>
            <div class="my_list_right" >
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
          <router-link to="/message_center" tag="li">
            <div class="my_list_left">
                <img src="../image/my_message.png">
                <p>消息中心</p>
            </div>
            <div class="my_list_right" >
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
          <router-link to="/shop_application" tag="li">
            <div class="my_list_left">
                <img src="../image/my_shop.png">
                <p>店铺申请</p>
            </div>
            <div class="my_list_right" >
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
          <router-link to="/my_set" tag="li">
            <div class="my_list_left">
                <img src="../image/my_set.png">
                <p>设置</p>
            </div>
            <div class="my_list_right" >
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
          <router-link to="/all_use" tag="li">
            <div class="my_list_left">
                <img src="../image/my_alluse.png">
                <p>通用</p>
            </div>
            <div class="my_list_right" >
                <img src="../image/right_tip.png">
            </div> 
          </router-link>
        </ul>
        <foot active="4"></foot>

  </div>
</template>

<script>
import $ from '../common';
import { Group, Cell } from 'vux';
import Foot from '../components/footer.vue';

export default {
  name: 'main',
  components: {
    Foot,
    Group,
    Cell
  },
  data () {
    return {
      profile: {}
    }    
  },
  metaInfo: {
    title: '我的'
  },
  mounted () {
    this.getProfile();
  },
  methods:{
    getProfile (){
         var self = this;
         $.ajax({
            url: '/api/v1/profile/',
            Authorization:true,
            success: function (res) {
                self.profile = res.data.profile;
                $.setStorage('profile', res.data.profile)
            },
            error: function (err) {
             alert(JSON.stringify(err))
            }
         })
    }

  }
}
</script>

<style scoped>
    .main{
      padding-bottom: 50px;
      background:#fff;
    }
    .top_bg{
      padding-top:1px;
      width: 100%;
      height: 3.8rem;
      background: url(../image/my_topbg.png);
      background-size: 100% 100%;
      text-align: center;
    }
    .top_bg a{
        display: inline-block;
        color: #4a4a4a;
        font-size: .24rem;
        text-align: center;
    }
    .my_head{
      margin-top: .52rem;
      margin-bottom: .13rem;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 100%;
    }
    .list_bar{
      padding-top: .18rem;
      margin:0 auto;
      margin-top: -.65rem;
      width: 6.62rem;
      height: 1.36rem;
      background:#fff;
      display: flex;
      box-sizing: border-box;
      box-shadow: 0 1px 1px 0 #98909A;
    }
    .list_bar li{
      width: 33.33%;
      height: 100%;
      text-align: center;
      font-size: .2rem;
      color: #000;
    }
    .list_bar li img{
      width: auto;
      height: .64rem;
      display: inline-block;
    }
    .list_bar li:nth-child(1) img{
      margin-bottom: .07rem;
    }
    .list_bar li:nth-child(2) img{
      margin-bottom: .09rem;
      height: .62rem;
    }
    .list_bar li:nth-child(3) img{
      height: .71rem;
    }
    .my_list{
      margin-top: .43rem;
      width: 100%;
      background: #fff;
    }
    .my_list li{
      padding-left: .5rem;
      padding-right: .3rem;
      height: .88rem;
      line-height: .88rem;
      border-bottom: 1px solid #E5E5E5;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
    .my_list li:active{
      background: #eee;
    }
    .my_list li:nth-child(1){
      border-top: 1px solid #E5E5E5;
    }
    .my_list_left{
      width: 50%;
      
      color: #000;
      display: flex;
    }
    .my_list_left img{
      width: .56rem;
      height: auto;
    }
    .my_list li:nth-child(1) .my_list_left img{
      margin-top: .16rem;
      margin-right: .24rem;
      width: .46rem;
      height: .56rem;
    }
    .my_list li:nth-child(2) .my_list_left img{
      margin-top: .16rem;
      margin-right: .31rem;
      width: .39rem;
      height: .5rem;
    }
    .my_list li:nth-child(3) .my_list_left img{
      margin-top: .23rem;
      margin-right: .22rem;
      width: .48rem;
      height: .45rem;
    }
    .my_list li:nth-child(4) .my_list_left img{
      margin-top: .23rem;
      margin-right: .2rem;
      width: .5rem;
      height: .42rem;
    }
    .my_list li:nth-child(5) .my_list_left img{
      margin-top: .18rem;
      margin-right: .14rem;
      width: .56rem;
      height: .56rem;
    }
    .my_list li:nth-child(6) .my_list_left img{
      margin-top: .15rem;
      margin-right: .14rem;
      width: .56rem;
      height: .59rem;
    }
    .my_list_left p{
      /*margin-left: .24rem;*/
      font-size: .34rem;
    }
    .my_list_right{
      font-size: .24rem;
      color: #888;
      display: flex;
    }
    .my_list_right img{
      margin-top: .3rem;
      margin-left: .3rem;
      width:.16rem;
      height: .26rem;
    }
</style>
