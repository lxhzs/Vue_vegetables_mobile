<template>
    <scroller lock-x use-pullup :pullup-config="config" @on-pullup-loading="lodeMore" ref="scroller">
        <div v-if="!products.length" class="no-content">暂无商品</div>
        <div v-else-if="products.length && type == 'combo'" class="mix_list">
            <router-link v-for="(item, index) in products" tag="div" class="mix_list_child" :to="{ name: 'goods_detail', params: { id: item.id }}">
                <img :src="item.image" alt="">
                <div class="mix_list_text">
                    <p>{{ item.name }}</p>
                    <p>{{ item.people }}人份</p>
                    <p>￥{{ item.price }}元</p>
                    <img id="addcart" src="../image/icon_cart.png" alt="" @click.stop="addCart(item.id)">
                </div>
            </router-link>
        </div>

        <div class="mix_list" v-else>
            <router-link v-for="(item, index) in products" tag="div" class="mix_list_child" :to="{ name: 'goods_detail', params: { id: item.id }}">
                <img :src="item.image" alt="">
                <div class="mix_list_text">
                    <p>{{ item.name }}</p>
                    <p>&nbsp;</p>
                    <p>￥{{ item.new_price }}元</p>
                    <img id="addcart" src="../image/icon_cart.png" alt="" @click.stop="addCart(item.id)">
                </div>
            </router-link>
        </div>
    </scroller>
  
</template>

<script>
import $ from '../common';
import { Scroller } from 'vux';

export default {
    name: 'goods_list',
    components: {
      Scroller
    },

    data () {
        return {
            page: 1,
            type: '',
            title: '今日上线',
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            products: []
        }    
    },
    metaInfo () {
        return {
            title: this.title
        }
    },
    mounted: function() {
        this.type = this.$route.query.type;
        if(this.type == 'bargin'){
            this.getGoodsList('/api/v1/product/bargin');
            this.title = '查看更多';
        }else if(this.type == 'combo'){
            this.getGoodsList('/api/v1/combo/products');
            this.title = '查看更多';
        }else if(this.type == 'categories'){
            var id = this.$route.query.id;
            this.getGoodsList('/api/v1/product/categories/'+id);
            this.title = '分类列表';
        }else if(this.type == 'favorites'){
            this.title = '我的收藏';
            this.getFavorites();
        }
    },
    methods:{
        addCart (id) {
            var self = this;
            this.$vux.loading.show({
                text: '添加中...'
            })
            $.ajax({
                url: '/api/v1/carts/',
                method: 'post',
                Authorization: true,
                data: {
                    product: id,
                    count: 1
                },
                success: function (res) {
                    self.$vux.toast.text('添加成功，在购物车等待亲~', 'middle');
                },
                error: function (err) {
                    if(err.response.data.status_code == 400){
                        self.$vux.toast.text('该商品已加入购物车', 'middle');
                    }else{
                        self.$vux.toast.text('添加失败，请重试', 'middle');
                    }
                }
            })
        },
        lodeMore () {
            if(this.type == 'bargin'){
                this.getGoodsList('/api/v1/product/bargin');
            }else if(this.type == 'combo'){
                this.getGoodsList('/api/v1/combo/products');
            }else if(this.type == 'categories'){
                var id = this.$route.query.id;
                this.getGoodsList('/api/v1/product/categories/'+id);
            }else if(this.type == 'favorites'){
                this.getFavorites();
            }
        },
        getFavorites () {
            var self = this;
            $.ajax({
                url: '/api/v1/favorites/',
                data: {
                    page: self.page,
                    page_size: 10
                },
                Authorization: true,
                success: function (res) {
                    for(var i=0; i<res.data.favorites.length; i++){
                        self.products.push(res.data.favorites[i])
                    }
                    self.page ++;
                    self.$refs.scroller.donePullup();
                    if(res.data.favorites.length < 10){
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function (err) {
                    self.$vux.toast.text('数据加载失败', 'bottom');
                    self.$refs.scroller.donePullup();
                }
            })
        },
        getGoodsList (url) {
            var self = this;
            $.ajax({
                url: url,
                data: {
                    page: self.page,
                    page_size: 10
                },
                success: function (res) {
                    for(var i=0; i<res.data.products.length; i++){
                        self.products.push(res.data.products[i])
                    }
                    self.page ++;
                    self.$refs.scroller.donePullup();
                    // self.$refs.scroller.reset()
                    if(res.data.products.length < 10){
                        self.$refs.scroller.disablePullup()
                    }
                },
                error: function (err) {
                    self.$vux.toast.text('数据加载失败', 'bottom');
                    self.$refs.scroller.donePullup();
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '../assets/goods_list.less';
</style>
