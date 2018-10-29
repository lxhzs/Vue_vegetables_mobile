<template>
  <div class="main" style="padding: .2rem 0">
    <div class="coupon-received" v-if="!coupons.length">
      <p>您暂未领取优惠券</p>
    </div>
    <div class="coupon clear" v-for="(item, index) in coupons">
      <router-link :to="{ path:'/coupon_rule/' + item.id}" tag="div">
        <div class="coupon-amout">
          <i v-if="item.coupon.type=='优惠券'">¥</i><span>{{ item.coupon.discount.substring(0, item.coupon.discount.length-2) }}</span>
          <i v-if="item.coupon.type=='折扣券'">折</i>
          <i v-if="item.coupon.type=='现金券'">元</i>
        </div>
        <div class="coupon-type">
          <span>{{ item.coupon.type }}</span>
          <p><span v-if='item.coupon.limit==0'>无门槛优惠</span><span v-else>满{{ item.coupon.limit }}元使用</span></p>
        </div>
      </router-link>
      <p class="coupon-deadline">有效期：{{item.coupon.deadline}} <router-link :to="{ path:'/coupon_rule/' + item.id}" tag="span" class="pull-right">使用规则 ></router-link></p>
    </div>

  </div>
</template>

<script>
import $ from '../common';
import { XButton, Icon } from 'vux';

export default {
  name: 'couponMine',
  metaInfo: {
    title: '我的优惠券'
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
    this.getMyCoupons()
  },
  methods:{
    getMyCoupons () {
      var self = this;
      $.ajax({
        url: '/api/v1/coupons/mycoupons',
        Authorization:true,
        method: 'get',
        success: function (res) {
          self.coupons = res.data.mycoupons;
        },
        error: function () {
          // body...
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
