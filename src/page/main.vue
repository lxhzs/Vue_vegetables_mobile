<template>
    <div class="main">
        <!-- 搜索 -->
        <div class="search">
            <div class="search_left">
                <img src="../image/location_index.png" alt="">
                <span>{{ city }}</span>
            </div>
            <div class="search_main">
                <img src="../image/search.png" alt="">
                <input type="text" placeholder="蔬菜" v-model="text" @keyup.enter="search">
            </div >
            <router-link to="/message_center"><img class="search_right" src="../image/message.png" alt=""></router-link>
        </div>
        <!-- 轮播 -->
        <div>
            <swiper height="180px" loop auto dots-class="dots-bottom" dots-position="center">
                <swiper-item v-for="(item, index) in activities" :key="index">
                    <router-link :to="{name: 'new_activity', params: { id: item.id }}"><img :src="item.image"></router-link>
                </swiper-item>
            </swiper>
        </div>
        <!-- 分类导航 -->
        <ul class="classify_nav">
            <router-link :to="{ name: 'today_online' }">
                <li>
                    <img src="../image/main_icon2.png" alt="">
                    <p>今日上线</p>
                </li>
            </router-link>
            <router-link to="/coupon_unreceived">
                <li>
                    <img src="../image/main_icon1.png" alt="">
                    <p>优惠券领取</p>
                </li>
            </router-link>
            <router-link to="/my_order">
                <li>
                    <img src="../image/main_icon3.png" alt="">
                    <p>待配送</p>
                </li>
            </router-link>
        </ul>
        <!-- 今日特价list -->
        <div class="today_list">
            <div class="today_listTop">
              <div class="listTop_L">
                    <span class="line-green"></span>
                    <p>今日特价</p>
              </div>
              <a href="javascript:;" id="point"></a>
            </div>
            <div class="list_good">
                <ul class="list_goods clear" :style="{width: bargin.length*2+'rem'}">
                    <router-link tag="li" v-for="(item,index) in bargin" :to="{ name: 'goods_detail', params: { id: item.id }}">
                        <img class="goodImg" :src="item.image" alt="">
                        <p>{{item.name}}</p>
                        <p>￥{{item.new_price}}/500g</p>
                        <p>(<i>{{item.price}}/500g</i>)</p>
                        <img class="icon_tejia" src="../image/tejia.png" alt="">
                    </router-link>
                </ul>
            </div>
            <div class="today_listTop">
              <div class="listTop_L">
                    <span class="line-green"></span>
                    <p>组合推荐</p>
              </div>
              <router-link :to="{ name: 'goods_list', query: { type: 'combo' }}" >查看更多</router-link>
            </div>

            <div class="mix_list">
                <router-link :to="{ name: 'goods_detail', params: { id: item.id }}" tag="div" v-for="(item,index) in combo">
                    <div class="mix_list_child">
                        <img :src="item.image" alt="">
                        <div class="mix_list_text">
                            <p>{{item.name}}</p>
                            <p>{{item.people}}人份</p>
                            <p>￥{{item.price}}元</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="tabbar_box"></div>
        <foot active="1"></foot>
    </div>
</template>

<script>
import { Group, Cell, Swiper, GroupTitle, SwiperItem, XButton, Divider} from 'vux';
import Foot from '../components/footer.vue';
import $ from '../common';

export default {
    name: 'main',
    components: {
        Group,
        Cell,
        Swiper,
        SwiperItem,
        GroupTitle,
        XButton,
        Foot,
        Divider
    },

    data () {
        return {
            text: '',
            city: '无锡',
            activities: [],
            bargin: [],
            combo: []
        }
    },
    metaInfo: {
        title: '首页'
    },
    mounted () {
        this.getCity();
        this.getActivities();
        this.getBargin();
        this.getCombo();
    },
    methods:{
        // 获取当前城市
        getCity () {
            var self = this;
            $.ajax({
                url: 'http://api.map.baidu.com/geocoder/v2/?location=30,120&output=json&pois=1&ak=wSNNoO1W6p9bnFQI2ahHGymz0teyCIWr',
                success: function (res) {
                    self.city = res.addressComponent.city;
                },
                error: function (err) {
                    console.log(JSON.stringify(err))
                    self.$vux.toast.text('定位失败', 'middle')
                }
            })
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $.ajax({
                        url: 'http://api.map.baidu.com/geocoder/v2/?location='+position.coords.latitude+','+position.coords.longitude+'&output=json&pois=1&ak=wSNNoO1W6p9bnFQI2ahHGymz0teyCIWr',
                        success: function (res) {
                            self.city = res.addressComponent.city;
                        },
                        error: function (err) {
                            alert(JSON.stringify(err))
                            self.$vux.toast.text('定位失败', 'middle')
                        }
                    })
                }, function (argument) {
                    self.$vux.toast.text('定位失败', 'middle')
                });
            } else { 
                self.$vux.toast.text('定位失败', 'middle')
            }
        },
        search () {
            this.$router.push({ name: 'search_classify', query: { text: this.text }})
        },
        getActivities () {
            var self = this;
            $.ajax({
                url: '/api/v1/activities/',
                success: function (res) {
                    self.activities = res.data.activities;
                }
            })
        },
        getBargin () {
            var self = this;
            $.ajax({
                url: '/api/v1/product/bargin',
                success: function (res) {
                    self.bargin = res.data.products;
                }
            })
        },
        getCombo () {
            var self = this;
            $.ajax({
                url: '/api/v1/combo/home/products',
                success: function (res) {
                    self.combo = res.data.products;
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:rgba(255,255,255,.69);
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:rgba(255,255,255,.69);
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:rgba(255,255,255,.69);
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:rgba(255,255,255,.69);
    }
    /*搜索*/
    .search{
      padding: 0 .24rem;
      height: .8rem;
      background: #5dc56e;
      display: flex;
      justify-content: space-between;
    }
    .search_left{
      display: flex;
      font-size: .28rem;
      color:#fff;
    }
    .search_left img{
      margin-top: 5px;
      width: .38rem;
      height: .49rem;
    }
    .search_left span{
      margin-left: .06rem;
      line-height: .8rem;
    }
    .search_main{
      margin-top: .1rem;
      width: 5.11rem;
      height: .6rem;
      line-height: .6rem;
      background: rgba(3,3,3,0.09);
      display: flex;
      border-radius: .2rem;
    }
    .search_main input{
      height: .6rem;
      background: rgba(3,3,3,0);
      color: #fff;
      font-size: .26rem;
    }
    .search_main img{
      margin: .13rem .18rem 0 .3rem;
      width: .34rem;
      height: .34rem;
      display: inline-block;
      vertical-align:middle;
    }
    .search_right{
      margin-top: .15rem;
      width: .53rem;
      height: .49rem;
    }
    .copyright {
      font-size: 12px;
      color: #ccc;
      text-align: center;
    }
    .text-scroll {
      border: 1px solid #ddd;
      border-left: none;
      border-right: none;
    }
    .text-scroll p{
      font-size: 12px;
      text-align: center;
      line-height: 30px;
    }
    .black {
      background-color: #000;
    }
    .title{
      line-height: 100px;
      text-align: center;
      color: #fff;
    }
    .animated {
      animation-duration: 1s;
      animation-fill-mode: both;
    }
    .vux-indicator.custom-bottom {
      bottom: 30px;
    }
    @-webkit-keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }
    .fadeInUp {
      animation-name: fadeInUp;
    }
    .swiper-demo-img img {
      width: 100%;
    }
    /*分类*/
    .classify_nav{
      padding: .16rem 0;
      height: 1.5rem;
      display: flex;
      background: #fff;
      box-sizing: border-box;
    }
    .classify_nav a{
      width: 33.33%;
    }
    .classify_nav li{
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .classify_nav li img{
      display: inline-block;
      width: .86rem;
      height: .86rem;
    }
    .classify_nav li p{
      font-size: .18rem;
      color: #9B9B9B;
    }
    /*今日特价*/
    .today_list{
      width: 100%;
      overflow:hidden;
    }

    .today_listTop{
      margin: .15rem 2px;
      display: flex;
      justify-content: space-between;
    }
    .today_listTop a{
/*      margin-top: .1rem;*/
      margin-right: .2rem;
      display: inline-block;
      font-size:.24rem;
      color: #9B9B9B;

    }
    #point{
      margin-top:0;
      width:.4rem;
      height:.4rem;
      background:url('../image/point.png');
      background-size:100% 100%;
    }
    .line-green{
       width: .07rem;
       height: .3rem;
       background: #5DC56E;
    }
    .listTop_L{
      display: flex;
    }
    .listTop_L p{
      margin-left: 3.5px;
      font-weight: bold;
    }
    .list_good{
      overflow: auto;
    }
    .list_goods{
      padding: 0 .14rem;
      overflow-y:auto;
      height: 2.88rem;
        li{
            position: relative;
            float: left;
            padding: .1rem;
            margin-right: .1rem;
            width: 1.7rem;
            height: 2.6rem;
            background: #fff;
            box-shadow: 0 2px 4px 0 rgba(165,165,165,0.50);
            &:active{
                background: #eee;
            }
            .goodImg{
                width: 1.69rem;
                height: 1.69rem;
            }
            .icon_tejia{
                position: absolute;
                top:0;
                left: 0;
                width: .81rem;
                height: .81rem;
            }
            p:nth-child(2){
                margin-top: .1rem;
                text-align: left;
                font-size: .18rem;
                color: #000;
            }
            p:nth-child(3){
                text-align: left;
                font-size: .18rem;
                color: #000;
            }
            p:nth-child(4) {
                text-align: left;
                font-size: .18rem;
                color:#9f9f9f;
            }
            p:nth-child(4) i{
                text-decoration: line-through;
            }
        }
    }

    /**/
    .mix_list{
      padding: 0 .15rem;

    }
    .mix_list_child{
      margin-bottom: .12rem;
      width: 100%;
      height: 2.62rem;
      display: flex;
      background: #fff;
      &:active{
        background: #eee;
      }
    }
    .mix_list_child img{
      margin-top: .2rem;
      margin-right: .1rem;
      width: 2.44rem;
      height: 2.35rem;
    }
    .mix_list_text p{
      text-align: left;
    }
    .mix_list_text p:nth-child(1){
      margin-top: .4rem;
      font-size: .36rem;
      color: #4A4A4A;
    }
    .mix_list_text p:nth-child(2){
      margin-top: .28rem;
      font-size: .24rem;
      color: #9B9B9B;
      letter-spacing: -0.14px;
    }
    .mix_list_text p:nth-child(3){
      margin-top: .24rem;
      font-size: .37rem;
      color: #D0021B;
      letter-spacing: 0;
    }

    /**/
    .tabbar_box{
      width: 100%;
      height: .9rem;
      background: #f9f9f9
    }
</style>
