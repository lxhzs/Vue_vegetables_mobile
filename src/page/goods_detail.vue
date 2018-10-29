<template>
    <div class="detail-component">
        <swiper :aspect-ratio="150/300" auto loop dots-position="center" dots-class="dots-bottom" :interval=5000>
            <swiper-item class="swiper-item" v-for="(item, index) in product.images" :key="index"><img :src="item"></swiper-item>
        </swiper>

        <div class="goods-info">
            <div class="goods-intro">
                <h4> {{ product.name }} <span v-if="product.type=='BARGIN'">(此商品为特价商品)</span></h4>
                <span v-if="product.people" style="display:block;margin-top: .2rem;font-size: .24rem;color: #888;">{{ product.people }}人份</span>
                <p>￥{{ product.new_price }}/<span>{{ product.spec }}g</span> <s v-if="product.old_price">原价：￥{{ product.price }}</s></p>
            </div>
            <group gutter="0">
                <cell :title="'规格：约'+product.spec+'g'" :value="'销量'+product.sale" :border-intent="false"></cell>
                <cell :title="'配送范围： '+product.area" value=" 【其他地区暂不配送】" value-align="left" :border-intent="false"></cell>
            </group>
            <div class="goods-detail" v-if="product.type!='BARGIN'">
                <div class="line"></div>
                <divider>商品详情</divider>
                <div class="goods-detail-content">
                    <x-table v-if="product.type=='COMBO'" :cell-bordered="false" style="background-color:#fff;">
                        <thead>
                            <tr>
                                <th>材料明细</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>名称</td>
                                <td>克数</td>
                            </tr>
                            <tr v-for="(item,index) in product.materials">
                                <td>{{ item.name }}</td>
                                <td>{{ item.spec }}</td>
                            </tr>
                        </tbody>
                    </x-table>
                    <img v-if="product.detail" :src="product.detail" alt="">
                </div>
            </div>
        </div>
        <tabbar>
            <tabbar-item link="/" icon-class="icon-home">
                <img slot="icon" src="../image/icon_home.png">
                <span slot="label">返回首页</span>
            </tabbar-item>
            <tabbar-item @on-item-click="addCollect">
                <img slot="icon" v-if="!isCollect" src="../image/icon_star.png">
                <img slot="icon" v-else src="../image/icon_star_active.png">
                <span slot="label">收藏</span>
            </tabbar-item>
            <tabbar-item link="/cart">
                <img slot="icon" src="../image/icon_cart.png">
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item class="tabbar-btn" @on-item-click="addCart">
                <span slot="label">加入购物车</span>
            </tabbar-item>
        </tabbar>
        <div class="g-mask" v-show="isTip" @click="isTip=false">
            <div class="mask-content">
                <img src="../image/true.png" alt="">
                {{tips}}
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../common'
import { Group, Cell, Swiper, GroupTitle, SwiperItem, XButton, Divider, Tabbar, TabbarItem, XTable } from 'vux'

export default {
    name: 'goods_detail',
    components: {
        XTable,
        Group,
        Cell,
        Tabbar,
        TabbarItem,
        Swiper,
        GroupTitle,
        SwiperItem,
        XButton,
        Divider
    },
    data () {
        return {
            id: '',
            type: 'normal',
            isCollect: false,
            isTip: false,
            tips: '收藏成功',
            product: {
                id: 1,
                type: 'NORMAL',
                people: 4,
                // materials: [
                //     {
                //         'name': '胡萝卜',
                //         'spec': '2根'
                //     },
                //     {
                //         'name': '柠檬',
                //         'spec': '1个'
                //     },
                //     {
                //         'name': '苹果',
                //         'spec': '3个'
                //     }
                // ],
                images: [
                    '/ifood/static/banner.jpg',
                    '/ifood/static/banner.jpg',
                    '/ifood/static/banner.jpg'
                ],
                name: '本地自产野猪肉',
                price: 59.9,
                old_price: 200,
                spec: 500,
                sale: 320,
                area: '无锡市',
                detail: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3365788028,98379368&fm=27&gp=0.jpg'
            }
        }
    },
    metaInfo: {
        title: '商品详情'
    },
    mounted: function() {
        this.id = this.$route.params.id;
        this.getGoodsDetail();
    },
    methods:{
        getGoodsDetail () {
            var self = this;
            self.$vux.loading.show({
                text: '数据加载中...'
            })
            $.ajax({
                url: '/api/v1/product/products/' + self.id,
                method: 'get',
                success: function (res) {
                    console.log(res)
                    self.product = res.data.product;
                }
            })
        },
        addCollect () {
            var self = this;
            if(self.isTip) return;
            $.ajax({
                url: '/api/v1/favorites/',
                method: 'post',
                Authorization: true,
                data: {
                    product: self.id
                },
                success: function (res) {
                    if(res.data){
                        self.isTip = true;
                        self.isCollect = !self.isCollect;
                        if(self.isCollect){
                            self.tips = '收藏成功';
                        }else{
                            self.tips = '取消收藏成功';
                        }
                        setTimeout(function () {
                            self.isTip = false;
                        }, 2000)
                    }
                },
                error: function (err) {
                    self.$vux.toast.text('收藏失败，请重试', 'middle');
                }
            })
        },
        addCart () {
            var self = this;
            if(self.isTip) return;
            self.$vux.loading.show({
                text: '提交中...'
            })
            $.ajax({
                url: '/api/v1/carts/',
                method: 'post',
                Authorization: true,
                data: {
                    product: self.id,
                    count: 1
                },
                success: function (res) {
                    if(res.data){
                        self.isTip = true;
                        self.tips = '添加成功，在购物车等待亲~'
                        setTimeout(function () {
                            self.isTip = false;
                        }, 2000)
                    }
                },
                error: function (err) {
                    if(err.response.data.status_code == 400){
                        self.$vux.toast.text('该商品已加入购物车', 'middle');
                    }else{
                        self.$vux.toast.text('添加失败，请重试', 'middle');
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
    .weui-toast{
      padding: 0 .2rem;
      min-height: 7.6em;
      max-width: 6rem;
    }
    .swiper-item{
      width: 100%;
    }
    .detail-component{
        .g-mask{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            .mask-content{
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -1.56rem 0 0 -3.3rem;
                width: 6.6rem;
                height: 3.12rem;
                background: #fff;
                text-align: center;
                border-radius: 8px;
                font-size: .36rem;
                line-height: .56rem;
                img{
                    width: 1.12rem;
                    margin: .7rem auto .2rem auto;
                }
            }
        }
        // .vux-slider  > .vux-indicator.dots-bottom > a > .vux-icon-dot{
        //   background-color: #1c1a1a!important;
        // }
        // .vux-slider  > .vux-indicator.dots-bottom > a > .vux-icon-dot.active{
        //   background-color: #d0cdd1!important;
        // }
        table{
            margin: .2rem auto;
            width: 6.6rem;
            thead{
                font-size: .28rem;
                color: #fff;
                background: #90d79c;
                th{
                    padding: 0 .2rem;
                    text-align: left;
                }
            }
        }
        .vux-slider>.vux-swiper>.vux-swiper-item{
            img{
                height: 100%;
            }
        }
        .weui-tabbar{
            position: fixed;
        }
        .weui-tabbar__item{
            padding: 0;
            flex: 1.5;
            &:active{
                opacity: .6;
            }
            &.weui-bar__item_on{
                .weui-tabbar__label{
                    color: #999;
                }
            }
            &.tabbar-btn{
                height: inherit;
                line-height: 1rem;
                flex: 3;
                -webkit-box-flex:3;
                color: #fff;
                background: #5dc56e;
                span{
                    font-size: .36rem;
                    color: #fff;
                }
            }
            .weui-tabbar__icon{
                margin-top: .2rem;
                &.icon-home{
                    width: 33px;
                    height: 27.5px;
                }
            }
            .weui-tabbar__label{
                line-height: .4rem;
                font-size: .14rem;
            }
            &.vux-tabbar-simple{
                .weui-tabbar__label{
                    line-height: 1.2rem;
                }
            }
        }
        .goods-info{
            padding-bottom: 1.4rem;
            background: #fff;
            .goods-intro{
              padding: .4rem .6rem;
              h4{
                font-size: .36rem;
                span{
                  font-size: .24rem;
                  color: #fd2d2d;
                  font-weight: 400;
                }
              }
              p{
                margin-top: .2rem;
                font-size: .36rem;
                color: #5dc56e;
                span{
                  font-size: .2rem;
                }
                s{
                  font-size: .24rem;
                  color: #888;
                }
              }
            }
            .goods-detail{
              margin-top: .3rem;
              background-size: 6.6rem auto;
              p{
                background: #fff;
                width: 6.6rem;
                margin: .3rem auto;
                text-align: center;
                font-size: .24rem;
                line-height: .32rem;
              }
            }
            .weui-cell{
                padding: .2rem .3rem;
                p, .weui-cell__ft{
                    font-size: .28rem;
                }
            }
        }
    }
</style>
