<template>
    <div class="myorder">
        <tab :line-width="2">
            <tab-item selected active-class="myorder-active" @on-item-click="itemClick(0)">未付款</tab-item>
            <tab-item active-class="myorder-active" @on-item-click="itemClick(1)">待配送</tab-item>
            <tab-item active-class="myorder-active" @on-item-click="itemClick(2)">所有订单</tab-item>
        </tab>
        <scroller lock-x use-pullup :height="scrollHeight" :pullup-config="config" @on-pullup-loading="loadMore" ref="scroller">
            <div class="sroller-content">
                <div class="tab-content" v-show="tabVisible==0">
                    <group class="confirm-top" v-for="(orderItem,index) in orders_unpaid" :key="index">
                        <cell-box class="shop-info" style="padding: 0.1rem 0.19rem">
                            <div class="inside-choose-address clear">
                                <img src="../image/order_shop_head.png" alt="">
                                <div class="address-midd">
                                    <p class="address-name text-ellipsis">{{orderItem.shop_name}}</p>
                                </div>
                                <div class="order-num-right">
                                    <p class="status">{{orderItem.order_status}}</p>
                                    <p class="order-num">{{orderItem.order_no}}</p>
                                </div>
                            </div>
                        </cell-box>
                        <cell-box>
                            <div class="confirm-goods-box">
                                <div class="cart-item-inside clear" v-for="(item,idx) in orderItem.carts" :key="idx">
                                    <div class="goods-img" v-if='item.product.product_images[0]' :style="{backgroundImage:'url('+ item.product.product_images[0].image +')'}"></div>
                                    <div class="cart-text-midd">
                                        <p class="text-ellipsis">{{item.product.name}}</p>
                                        <span>￥ {{item.price}}</span>
                                    </div>
                                    <div class="editandnum">
                                        <span>×{{item.count}}</span>
                                    </div>
                                </div>
                            </div>
                        </cell-box>
                        <cell-box class="clear" style="padding: 0.08rem 0.19rem;display: block">
                            <div class="goto-pay" @click="goToPay(orderItem.id)">去付款</div>
                        </cell-box>
                    </group>
                </div>
                <div class="tab-content" v-show="tabVisible==1">
                    <group class="confirm-top" v-for="(orderItem,index) in orders_dispatch" :key="index">
                        <cell-box class="shop-info" style="padding: 0.1rem 0.19rem">
                                <div class="inside-choose-address clear">
                                    <img src="../image/order_shop_head.png" alt="">
                                    <div class="address-midd">
                                        <p class="address-name text-ellipsis">{{orderItem.shop_name}}</p>
                                    </div>
                                    <div class="order-num-right">
                                        <p class="status">{{orderItem.order_status}}</p>
                                        <p class="order-num">{{orderItem.order_no}}</p>
                                    </div>
                                </div>
                        </cell-box>
                        <cell-box>
                            <div class="confirm-goods-box">
                                <div class="cart-item-inside clear" v-for="(item,idx) in orderItem.carts" :key="idx">
                                    <div class="goods-img" v-if='item.product.product_images[0]' :style="{backgroundImage:'url('+ item.product.product_images[0].image +')'}"></div>
                                    <div class="cart-text-midd">
                                        <p class="text-ellipsis">{{item.product.name}}</p>
                                        <span>￥ {{item.price}}</span>
                                    </div>
                                    <div class="editandnum">
                                        <span>×{{item.count}}</span>
                                    </div>
                                </div>
                            </div>
                        </cell-box>
                        <cell-box is-link :link="'/order_detail?id='+orderItem.id">
                            查看详情
                        </cell-box>
                    </group>
                </div>
                <div class="tab-content" v-show="tabVisible==2">
                    <group class="confirm-top" v-for="(orderItem,index) in orders" :key="index">
                        <cell-box class="shop-info" style="padding: 0.1rem 0.19rem">
                                <div class="inside-choose-address clear">
                                    <img src="../image/order_shop_head.png" alt="">
                                    <div class="address-midd">
                                        <p class="address-name text-ellipsis">{{orderItem.shop_name}}</p>
                                    </div>
                                    <div class="is-finish" v-if="orderItem.order_status=='FINISH'">交易成功</div>
                                    <div class="order-num-right" v-else>
                                        <p class="status">{{orderItem.order_status}}</p>
                                        <p class="order-num">{{orderItem.order_no}}</p>
                                    </div>
                                </div>
                        </cell-box>
                        <cell-box>
                            <div class="confirm-goods-box">
                                <div class="cart-item-inside clear" v-for="(item,idx) in orderItem.carts" :key="idx">
                                    <div class="goods-img" v-if='item.product.product_images[0]' :style="{backgroundImage:'url('+ item.product.product_images[0].image +')'}"></div>
                                    <div class="cart-text-midd">
                                        <p class="text-ellipsis">{{item.product.name}}</p>
                                        <span>￥ {{item.price}}</span>
                                    </div>
                                    <div class="editandnum">
                                        <span>×{{item.count}}</span>
                                    </div>
                                </div>
                            </div>
                        </cell-box>
                        <cell-box>
                            <div class="total-count">共{{orderItem.carts.length}}件 合计：<span>￥15.00元</span></div>
                        </cell-box>
                        <cell-box class="clear" style="padding: 0.08rem 0.19rem;display: block">
                            <div class="view-order" @click="viewOrder(orderItem.id)">查看订单</div>
                            <div class="delete-order" @click="deleteOrder(orderItem.id)" v-if="orderItem.order_status=='FINISH'">删除订单</div>
                        </cell-box>
                    </group>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import { Scroller, Tab, TabItem, Group, CellBox, Cell } from 'vux'
import $ from '../common';

export default {
    name: 'myorder',
    components: {
        Scroller,
        Tab,
        TabItem,
        Group,
        CellBox,
        Cell
    },
    data () {
        return {
            tabVisible: 0,
            page: [1, 1, 1],
            scrollHeight: '620px',
            endScroll: [false, false, false],
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            orders_unpaid: [],
            orders_dispatch: [],
            orders: []
        }        
    },
    metaInfo: {
        title: '我的订单'
    },
    mounted: function() {
        this.scrollHeight = (document.documentElement.clientHeight - 44) + 'px';
        this.getAllOrder()
        this.getUnPayed()
        this.getDispatch()
    },
    methods:{
        itemClick (index) {
            this.tabVisible = index;
            if(this.endScroll[index]){
                this.$refs.scroller.disablePullup()
            }else{
                this.$refs.scroller.enablePullup()
                this.$refs.scroller.reset();
                this.$refs.scroller.donePullup();
            }
            this.$refs.scroller.reset({
                top: 0
            })
        },
        loadMore () {
            var self = this;
            if(self.tabVisible == 0){
                self.getUnPayed();
            }else if(self.tabVisible == 1){
                self.getDispatch();
            }else{
                self.getAllOrder();
            }
            
        },
        goToPay(id){
            console.log(id)
        },
        viewOrder(id){
            this.$router.push({path: '/order_detail', query: {id: id}});
        },
        deleteOrder(id){
            console.log(id)
            var self=this;
            $.ajax({
                url: '/api/v1/orders/'+id,
                method: 'delete',
                Authorization:true,
                success: function (res) {
                    self.getAllOrder();
                    self.getUnPayed();
                    self.getDispatch();
                }
           })
        },
        //获得待付款订单
        getUnPayed() {
            var self=this;
            $.ajax({
                url: '/api/v1/orders/unpaid',
                params:{
                    page: self.page[0],
                    page_size: 10
                },
                Authorization:true,
                success: function (res) {
                    self.page[0] ++;
                    for (var i = 0; i < res.data.orders.length; i++) {
                        self.orders_unpaid.push(res.data.orders[i])
                    }
                    self.$refs.scroller.donePullup();
                    if(res.data.orders.length < 10){
                        self.endScroll[0] = true;
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function () {
                    self.$refs.scroller.donePullup();
                    self.$vux.toast.text('数据加载失败', 'middle');
                }
            })
        },
        //获得待配送订单
        getDispatch (){
            var self=this;
            $.ajax({
                url: '/api/v1/orders/todispatch',
                Authorization:true,
                params: {
                    page: self.page[1],
                    page_size: 10
                },
                success: function (res) {
                    self.page[1] ++;
                    for (var i = 0; i < res.data.orders.length; i++) {
                        self.orders_dispatch.push(res.data.orders[i])
                    }
                    self.$refs.scroller.donePullup();
                    if(res.data.orders.length < 10){
                        self.endScroll[1] = true;
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function () {
                    self.$refs.scroller.donePullup();
                    self.$vux.toast.text('数据加载失败', 'middle');
                }
            })
        },
        //获得所有订单列表
        getAllOrder () {
            var self=this;
            $.ajax({
                url: '/api/v1/orders/',
                params:{
                    page: self.page[2],
                    page_size: 10
                },
                Authorization:true,
                success: function (res) {
                    self.page[2] ++;
                    for (var i = 0; i < res.data.orders.length; i++) {
                        self.orders.push(res.data.orders[i])
                    }
                    self.$refs.scroller.donePullup();
                    if(res.data.orders.length < 10){
                        self.endScroll[2] = true;
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function () {
                    self.$refs.scroller.donePullup();
                    self.$vux.toast.text('数据加载失败', 'middle');
                }
           })
        }
    }
}
</script>

<style lang="less">
.myorder{
    .sroller-content{
        padding-bottom: 10px;
    }
    .myorder-active{
        font-size: .36rem!important;
        color: #5dc56e!important;
    }
    .vux-tab{
        box-shadow: 0 1px 1px rgba(0,0,0,.06)
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
        border-color: #5dc56e;
    }
    .vux-tab-item{
        font-size: .36rem!important;
    }
    .tab-content{
        width: 100%;
        margin-top: .05rem;
    }
    .weui-cells.vux-no-group-title{
        margin-top: 0;    
        margin-bottom: .05rem;
        &:after{
            content: '';
            height: 0;
            background: none;
            border: 0;
        }
    }
    .weui-cell{
        padding: .19rem;
        font-size: .34rem;
        color:#000;
        line-height: .48rem; 
        &:before{
            content: '';
            height: 0;
            background: none;
            border: 0;
        }
    }
    .shop-info{
        .weui-cell{
            padding: .08rem .19rem; 
        }
    }
    .vux-label{
        font-size: .34rem;
    }
    .weui-cell__ft{
        font-size: .34rem;
    }
    .confirm-top{
        margin-bottom: .05rem;
        .weui-cell{
            border-bottom: 1px solid #e8e8e8;
        }
    }
    .inside-choose-address{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        img{
            margin-top: .22rem;
            margin-right: .3rem;
            float: left;
            width: .36rem;
            vertical-align: middle;
        }
        .address-midd{
            float: left;
            width: 3.3rem;
        }
        .order-num-right{
            width: 3rem;
            text-align: right;
            float: right;
            height: 100%;
            p{
                line-height: .4rem;
            }
            .status{
                font-size: .3rem;
                color: #d0021b;
            }
            .order-num{
                font-size: .24rem;
                color: #9b9b9b;
            }
        }
        .is-finish{
            width: 3rem;
            text-align: right;
            float: right;
            height: 100%;
            font-size: .36rem;
            color: #000;
        }
        .address-name{
            color: #9b9b9b;
            font-size: .28rem;
        }
        .address-txt{
            font-size: .28rem;
            color: #888;
        }
    }
    .confirm-goods-box{
        width: 100%;
    }
    .cart-item-inside{
            position: relative;
            width: 100%;
            height: 100%;
            background: #fff;
            // border-radius: 6px;
            padding-bottom: .2rem;
            border-bottom: 1px solid #eee;
            &:last-child{
                border: 0;
            }
        }
        .goods-img{
            width: 2.16rem;
            height: 1.41rem;
            float: left;
            margin: .29rem .16rem 0 .03rem;
            -webkit-background-size: 100% auto;
            background-size: 100% auto;
            background-position: center center;
        }
        .cart-text-midd{
            float: left;
            width: 2.6rem;
            padding-top: .46rem;
        }
        .cart-text-midd p{
            font-size: .28rem;
            color: #4a4a4a;
            line-height: .4rem;
        }
        .cart-text-midd span{
            display: inline-block;
            margin-top: .42rem;
            font-size: .32rem;
            color: #d52405;
            line-height: .45rem;
        }
        .editandnum{
            float: right;
            padding-top: .85rem;
            padding-right: .6rem;
            text-align: center;
        }
        .editandnum span{
            font-size: .32rem;
            color: #312e2e;
        }
        .goto-pay{
            width: 1.75rem;
            height: .72rem;
            border-radius: 6px;
            background: #e12121; 
            float: right;
            display: inline-block;
            text-align: center;
            line-height: .74rem;
            font-size: .36rem;
            color: #fff;
            &:active{
                background: #b71b1b;
            }
        }
        .view-order,
        .delete-order{
            width: 1.75rem;
            height: .72rem;
            border-radius: 6px;
            border-width: 1px;
            border-style: solid;
            background: #fff; 
            float: right;
            display: inline-block;
            text-align: center;
            line-height: .74rem;
            font-size: .36rem;
            margin-left: .12rem;
            box-sizing: border-box;
            &:active{
                background: rgba(0,0,0,.1);
            }
        }
        .view-order{
            color: #5dc56e;
            border-color: #5dc56e;
        }
        .delete-order{
            color: #000;
            border-color: #000;
        }
        .total-count{
            width: 100%;
            font-size: .36rem;
            color: #4a4a4a;
            text-align: right;
            span{
                color: #000;
            }
        }
}
</style>
