<template>
    <div class="main">
        <scroller lock-x scrollbar-y use-pullup :pullup-config="config" @on-pullup-loading="getCartList" ref="scroller">
            <div class="cart-good-list">
                <div class="cart-good-item" v-for="(item,idx) in cartList" :key="idx">
                    <slide-left-delete :index="idx" :txtStyle="isSlide != idx" :isPrevent="isEdit == idx" @deleteItem="deleteItemFn">
                        <div class="cart-item-inside clear" @touchstart="isSlide=idx">
                            <div class="checks">
                                <input type="checkbox" :id="'cartCb'+idx" :value="item.id" v-model="checkItems" hidden="hidden">
                                <label :for="'cartCb'+idx"></label>
                            </div>
                            <div class="goods-img" :style="{backgroundImage:'url('+ item.product.image +')'}"></div>
                            <div class="cart-text-midd">
                                <p class="text-ellipsis">{{item.product.name}}</p>
                                <span>￥ {{item.price}}</span>
                            </div>
                            <div class="editandnum" @click.stop.prevent="isEdit = idx">
                                <img src="../image/cart_edit_ico.png" alt="">
                                
                                <span>×{{item.count}}</span>
                            </div>

                            <transition name="fade">
                                <div class="edit-one-show" v-show="isEdit == idx">
                                    <div class="number-change"><span class="reduce" @click="reduceFn(item.id,idx)">-</span><span class="changenum">{{item.count}}</span><span class="add" @click="addFn(item.id,idx)">+</span></div>
                                    <div class="finish-btn" @click="finishClick(item.id,idx)">完<br>成</div>
                                </div>
                            </transition>
                        </div>
                    </slide-left-delete>
                </div>
            </div>
        </scroller>
        <div class="bottom-cart">
            <div class="checks">
                <input type="checkbox" id="total" :value="true" v-model="total" hidden="hidden">
                <label for="total"><span>全选</span></label>
            </div>
            <div class="finl-pay" @click="finlPay()">结算<span v-if="checkItems.length > 0">({{checkItems.length}})</span></div>
            <div class="total-price">合计：{{totalPrice==0?"0.00":totalPrice}}</div>
        </div>
        <foot active="3"></foot>
    </div>
</template>

<script>
import $ from '../common';
import store from '../store';
import Foot from '../components/footer.vue';
import SlideLeftDelete from '../components/slide_left_delete.vue';
import { Scroller } from 'vux';

export default {
    name: 'main',
    components: {
        Scroller,
        Foot,
        SlideLeftDelete
    },
    data () {
        return {
            page: 1,
            isSlide: -1,
            isEdit: -1,
            cartList:[],
            checkItems:[],
            totalPrice:0,
            total:false,
            cancelSingle:false,
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
        }        
    },
    metaInfo: {
        title: '购物车'
    },
    mounted() {
        this.getCartList()
    },
    watch:{
        total(val){
            if (val) {
                this.checkItems=[];
                for (var i = 0; i < this.cartList.length; i++) {
                    this.checkItems.push(this.cartList[i].id);
                }
                this.cancelSingle = false;
            }else{
                if (!this.cancelSingle) {
                    this.checkItems = [];
                }else{
                    this.cancelSingle = false;
                }
            }
        },
        checkItems(val){
            this.totalPrice = 0;
            this.calcSelectedPrice();
            if(val.length == this.cartList.length){
                this.total = true;
            } else{
                this.cancelSingle = true;
                this.total = false;
            }
            // this.getCartTotal ()
        }
    },
    methods:{
        getCartTotal () {
            var self = this;
            var ids = [];
            for (var i = 0; i < self.checkItems.length; i++) {
                ids.push({ id: self.checkItems[i] })
            }
            $.ajax({
                url: '/api/v1/carts/total',
                method: 'post',
                Authorization: true,
                data: {
                    carts: ids
                },
                success: function (res) {
                    self.totalPrice = res.data.total;
                    console.log(res.data.total)
                },
                error: function (err) {
                    self.$vux.toast.text('数据加载失败', 'bottom');
                    // self.$refs.scroller.donePullup();
                }
            })
        },
        getCartList () {
            var self = this;
            $.ajax({
                url: '/api/v1/carts/',
                Authorization: true,
                data: {
                    page: self.page,
                    page_size: 10
                },
                success: function (res) {
                    console.log(res)
                    for(var i=0; i<res.data.carts.length; i++){
                        self.cartList.push(res.data.carts[i])
                    }
                    self.page ++;
                    self.$refs.scroller.donePullup();
                    if(res.data.carts.length < 10){
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function (err) {
                    self.$vux.toast.text('数据加载失败', 'bottom');
                    self.$refs.scroller.donePullup();
                }
            })
        },
        deleteItemFn(index){
            var self = this;
            self.$vux.confirm.show({
                title: '删除？',
                content: '确认删除？',
                onConfirm () {
                    self.$vux.loading.show({
                        text: '删除中...'
                    })
                    $.ajax({
                        url: '/api/v1/carts/' + self.cartList[index].id,
                        method: 'delete',
                        Authorization: true,
                        success: function (res) {
                            for (var i = 0; i < self.checkItems.length; i++) {
                                if (self.checkItems[i] == self.cartList[index].id) {
                                    self.checkItems.splice(i,1);
                                }
                            };
                            self.cartList.splice(index,1);
                            self.$vux.toast.text('删除成功！', 'middle');
                        },
                        error: function (err) {
                            self.$vux.toast.text('删除失败,请重试！', 'middle');
                        }
                    })
                }
            })
        },
        finishClick(id,idx){
            var self = this;
            $.ajax({
                url: '/api/v1/carts/' + id,
                method: 'post',
                Authorization: true,
                data: {
                    count: self.cartList[idx].count
                },
                success: function (res) {
                    self.isEdit = -1;
                },
                error: function (err) {
                    self.$vux.toast.text('编辑失败,请重试！', 'middle');
                }
            })
        },
        calcSelectedPrice(){
            var pri = this.totalPrice;
            for (var i = 0; i < this.checkItems.length; i++) {
                for (var v = 0; v < this.cartList.length; v++) {
                    if (this.checkItems[i] == this.cartList[v].id) {
                        pri = parseFloat(pri) + (parseFloat(this.cartList[v].price)*parseFloat(this.cartList[v].count))
                    }
                }
            }
            this.totalPrice = pri.toFixed(2);
        },
        reduceFn(id,idx){
            if (parseFloat(this.cartList[idx].count) > 1) {
                this.cartList[idx].count = parseFloat(this.cartList[idx].count) - 1;
                this.totalPrice = 0;
                this.calcSelectedPrice();
            }
        },
        addFn(id,idx){
            this.cartList[idx].count = parseFloat(this.cartList[idx].count) + 1;
            this.totalPrice = 0;
            this.calcSelectedPrice();
        },
        finlPay(){
            if(!this.checkItems.length){
                this.$vux.toast.text('请先选择商品', 'middle');
                return;
            }
            store.ids = this.checkItems.join();
            this.$router.push({ name: 'confirm_order' })
        }
    }
}
</script>
<style scoped>
    /*tabbar*/
    .cart-good-list{
        padding: .1rem .2rem;
        padding-bottom: 2.06rem;
    }
    .weui-tabbar{
        position: fixed;
    }
    .cart-good-item{
        position: relative;
        width: 100%;
        height: 2.5rem;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 .04rem .02rem rgba(0,0,0,.02); 
        margin-bottom: .1rem;
    }
    .cart-item-inside{
        position: relative;
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 6px;
    }
    .checks{
        float: left;
        height: 100%;
        padding-left: .06rem;
        line-height: 2.5rem;
    }
    .checks label{
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        width: .46rem;
        height: .46rem;
        border: 1px solid #c9c9c9; 
        border-radius: 50%;
        vertical-align: middle;
    }
    .checks input[type='checkbox']:checked + label{
        border-color: #42bb56;
    }
    .checks input[type='checkbox']:checked + label:after{
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background: #5dc56e;
        background-image: url(../image/cartChecked.png);
        background-position: center center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }
    .goods-img{
        width: 2.16rem;
        height: 1.41rem;
        float: left;
        margin: .49rem .16rem 0 .03rem;
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
        background-position: center center;
    }
    .cart-text-midd{
        float: left;
        width: 2.6rem;
        padding-top: .66rem;
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
        padding-top: .72rem;
        padding-right: .4rem;
        text-align: center;
    }
    .editandnum img{
        width: .48rem;
        height: .42rem;
        margin-bottom: .34rem;
    }
    .editandnum span{
        font-size: .32rem;
        color: #312e2e;
    }
    .edit-one-show{
        position: absolute;
        top: 0;
        right: 0;
        width: 4.39rem;
        height: 100%;
        z-index: 1;
        background: #fff;
        border-radius: 0 8px 8px 0;
    }
    .finish-btn{
        float: right;
        width: 1.8rem;
        height:100%;
        position: absolute;
        right:0;
        top:0;
        background-color: #ffee15;
        font-size: .48rem;
        color: #fff;
        padding-top: .6rem;
        box-sizing: border-box;
        text-align: center;
        border-radius: 0 8px 8px 0;
        line-height: .67rem;
    }
    .number-change{
        float: left;
        height: 100%;
        width: 2.55rem;
        line-height: 2.5rem;
        text-align: center;
    }
    .number-change span{
        display: inline-block;
        height: .46rem;
        margin: 0 .1rem;
    }
    .number-change .reduce,.number-change .add{
        width: .46rem;
        height: .46rem;
        background: #000;
        border-radius: 50%;
        text-align: center;
        line-height: .46rem;
        color: #fff;
        font-size: .36rem;
    }
    .number-change .changenum{
        font-size: .36rem;
        color: #d6d5d5;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .bottom-cart{
        position: fixed;
        bottom: 1rem;
        left: 0;
        width: 100%;
        height: .96rem;
        border-top: 1px solid #e7e7e7;
        z-index: 100;
        background: #fff;
    }
    .bottom-cart .checks{
        height: 100%;
        padding-left: .2rem;
        line-height: .96rem;
    }
    .bottom-cart .checks label span{
        position: absolute;
        left: .5rem;
        top: 0;
        bottom: 0;
        margin: 0 auto;
        font-size: .26rem;
        color: #636161;
        white-space: nowrap;
        line-height: .46rem;
    }
    .bottom-cart .total-price{
        height: 100%;
        float: right;
        color:#a80101;
        font-size: .32rem;
        line-height: .96rem;
        padding-right: .1rem;
    }
    .bottom-cart .finl-pay{
        width: 1.91rem;
        height: 100%;
        font-size: .32rem;
        color:#fff;
        line-height: .96rem;
        background: #5dc56e;
        float: right;
        text-align: center;
    }
    .bottom-cart .finl-pay:active{
        background: #3ba34c;
    }
</style>
