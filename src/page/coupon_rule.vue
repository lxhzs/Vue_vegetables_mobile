<template>
  <div class="main">
    
      <div class="coupon-container">
        <div class="coupon clear">
          <div class="coupon-amout">
            <i v-if="coupon.type=='优惠券'">¥</i><span>{{ coupon.discount }}</span>
            <i v-if="coupon.type=='折扣券'">折</i>
            <i v-if="coupon.type=='现金券'">元</i>
          </div>
          <div class="coupon-type">
            <span>{{ coupon.type }}</span>
            <p v-if="coupon.type=='优惠券'">满{{ coupon.limit }}元使用</p>
            <p v-if="coupon.type=='折扣券'">满{{ coupon.limit }}元使用</p>
            <p v-if="coupon.type=='现金券'"><span v-if='coupon.limit==0'>无门槛优惠</span><span v-else>{{ coupon.limit }}</span></p>
          </div>
          <p class="coupon-deadline">有效期：{{ coupon.deadline }}</p>
        </div>
      </div>
      <div class="coupon-rule">
        <h4>使用规则</h4>
        <p>抵用券名称：{{ coupon.name }}</p>
        <p>使用期限：{{ coupon.deadline }}</p>
        <p>可用业务：<span v-for='item in coupon.scope'>{{item.name}},</span></p>
      </div>
   
  </div>
</template>

<script>
import $ from '../common';
import { XButton, Icon } from 'vux';

export default {
  name: 'couponRule',
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
      coupon: {}
    }    
  },
  mounted() {
    var id = this.$route.params.id;
    this.getCoupon(id)
  },
  methods:{
    getCoupon (id) {
      var self = this;
      $.ajax({
        url: '/api/v1/coupons/' + id,
        method: 'get',
        success: function (res) {
          self.coupon = res.data.coupons;
          self.coupon.discount = res.data.coupons.discount.substring(0, res.data.coupons.discount.length-2)
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
    background: rgba(216,216,216,0.44)!important;
  }
</style>
