<template>
  <div class="main" style="padding: .2rem 0">
    <div class="coupon-received" v-if="!coupons.length">
      <p>来晚了，您的优惠券已被领完~</p>
      <router-link to="/coupon_mine" exact>
        查看我的优惠券
      </router-link>
    </div>
    <div class="coupon clear" v-for="(item, index) in coupons" v-if="coupons.length">
      <div class="coupon-amout">
        <i v-if="item.type=='优惠券'">¥</i><span v-if='item.discount'>{{ item.discount.substring(0, item.discount.length-2) }}</span>
        <i v-if="item.type=='折扣券'">折</i>
        <i v-if="item.type=='现金券'">元</i>
        <p>截止日期{{ item.deadline }}</p>
      </div>
      <div class="coupon-type">
        <span>{{ item.type }}</span>
        <p v-if="item.type=='现金券'"><span v-if='item.limit==0'>无门槛优惠</span><span v-else>满{{ item.limit }}元可用</span></p>
        <p v-else>满{{ item.limit }}元可用</p>
      </div>
      <div class="coupon-btn" @click="receiveCoupon(item.id)">
        <img src="../image/coupon_receive.png" alt="">
      </div>
    </div>

    <!-- 领取成功弹窗 -->
    <div class="g-mask" v-show="isReceived" @click="isReceived=false">
      <div class="g-content">
        <icon type="success"></icon>
        <p>恭喜您领取成功</p>
        <router-link to="/coupon_mine" exact>
          去我的卡券看看
        </router-link>
        <router-link to="/" tag="div"><x-button class="coupon-btn" plain type="primary">返回购物</x-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from '../common';
import { XButton, Icon } from 'vux';

export default {
  name: 'couponUnreceived',
  metaInfo: {
    title: '优惠券领取'
  },
  components: {
    Icon,
    XButton
  },
  data () {
    return {
      isReceived: false,
      coupons: []
    }    
  },
  mounted() {
     this.getCoupon()
  },
  methods:{
    getCoupon () {
      var self = this;
      $.ajax({
        url: '/api/v1/coupons/',
        method: 'get',
        Authorization:true,
        success: function (res) {
          self.coupons = res.data.coupons;
        }
      })
    },
    receiveCoupon (id) {
      var self = this;
      self.isReceived = true;
      self.$vux.loading.show({
       text: '领取中...'
      })
      $.ajax({
        url: '/api/v1/coupons/' + id,
        method: 'post',
        Authorization:true,
        success: function (res) {
          self.isReceived = true;
        },
        error: function () {
          self.$vux.toast.show({
            width: '5rem',
            type: 'warn',
            text: '领取失败，请重试'
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  @import '../assets/coupon.less';

  .main{
    position: absolute;
    width: 100%;
    min-height: 100%;
    overflow-y: auto;
    background: #fffeff;
    box-sizing: border-box;
  }
</style>
