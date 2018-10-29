<template>
    <div class="footer">
        <tabbar>
          <tabbar-item :selected="active == 1" link="/">
            <img v-if="active == 1" slot="icon" src="../image/icon1.png">
            <img v-else slot="icon" src="../image/icon1_select.png">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item :selected="active == 2" link="/classify">
            <img v-if="active == 2" slot="icon" src="../image/icon2.png">
            <img v-else slot="icon" src="../image/icon2_select.png">
            <span slot="label">分类</span>
          </tabbar-item>
          <tabbar-item :selected="active == 3" link="/cart">
            <img v-if="active == 3" slot="icon" src="../image/icon3.png">
            <img v-else slot="icon" src="../image/icon3_select.png">
            <span slot="label">购物车</span>
          </tabbar-item>
          <tabbar-item :selected="active == 4" link="/my">
            <img v-if="active == 4" slot="icon" src="../image/icon4.png">
            <img v-else slot="icon" src="../image/icon4_select.png">
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import {Tabbar, TabbarItem } from 'vux';
    export default {
        components: {
            Tabbar,
            TabbarItem
        },
        props: {
            active: [Number, String]
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less">
    .footer{
      .weui-tabbar{
        position: fixed;
      }
      .weui-tabbar__icon{
        width: 33px;
        height: 27.5px;
      }
    }
    
</style>