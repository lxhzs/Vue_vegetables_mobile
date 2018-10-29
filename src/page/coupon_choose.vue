<template>
    <div class="main" style="padding: .2rem 0">
        <div class="coupon-received" style="margin-top: 1rem;" v-if="!coupons.length">
            <p>抱歉，您的账户没有可用的券</p>
        </div>
        <div class="coupon clear" v-for="(item, index) in coupons" @click="select(item.id)">
            <div class="coupon-amout">
                <i v-if="item.coupon.type=='优惠券'">¥</i><span style="font-size: 1.6rem;">{{ item.coupon.discount.substring(0, item.coupon.discount.length-2) }}</span>
                <i v-if="item.coupon.type=='折扣券'">折</i>
                <i v-if="item.coupon.type=='现金券'">元</i>
                <p>截止日期{{ item.coupon.deadline }}</p>
            </div>
            <div class="coupon-type">
                <span>{{ item.coupon.type }}</span>
                <p><span v-if='item.coupon.limit==0' style="font-size: .52rem;">无门槛优惠</span><span v-else style="font-size: .52rem;">满{{ item.coupon.limit }}元使用</span></p>
            </div>
            <div class="coupon-btn">
                <img src="../image/coupon_unused.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../common';
import store from '../store';
import { XButton, Icon } from 'vux';

export default {
    name: 'couponChoose',
    metaInfo: {
        title: '使用优惠券'
    },
    components: {
        Icon,
        XButton
    },
    data () {
        return {
            coupons: []
        }    
    },
    mounted() {
        this.coupons = store.coupons
    },
    methods:{
        select (id) {
            store.coupon = id;
            this.$router.back();
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
