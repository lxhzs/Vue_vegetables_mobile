<template>
    <scroller lock-x use-pullup :pullup-config="config" @on-pullup-loading="lodeMore" ref="scroller">
        <div v-if="!favorites.length" class="no-content">暂无收藏</div>

        <div class="mix_list" v-else v-for="(item, index) in favorites">
            <slide-left-delete :index="index" @deleteItem="deleteFavorite" :txtStyle="isSlide != index">
                <div @click="goPage(item.id)" @touchstart="isSlide=index" class="mix_list_child">
                    <img :src="item.image" alt="">
                    <div class="mix_list_text">
                        <p>{{ item.product.name }}</p>
                        <p><s>{{ item.product.price }}元</s></p>
                        <p>￥{{ item.product.new_price }}元</p>
                        <img id="addcart" src="../image/icon_cart.png" alt="" @click.stop="addCart(item.id)">
                    </div>
                </div>
            </slide-left-delete>
        </div>
        
        <!-- <div class="mix_list" v-else>
            <router-link v-for="(item, index) in favorites" tag="div" class="mix_list_child" :to="{ name: 'goods_detail', params: { id: item.id }}">
                <img :src="item.image" alt="">
                <div class="mix_list_text">
                    <p>{{ item.name }}</p>
                    <p>&nbsp;</p>
                    <p>￥{{ item.new_price }}元</p>
                    <img id="addcart" src="../image/icon_cart.png" alt="" @click.stop="addCart(item.id)">
                </div>
            </router-link>
        </div> -->
    </scroller>
  
</template>

<script>
import $ from '../common';
import { Scroller } from 'vux';
import SlideLeftDelete from '../components/slide_left_delete.vue';

export default {
    name: 'my_collect',
    components: {
      Scroller,
      SlideLeftDelete
    },

    data () {
        return {
            isSlide: -1,
            page: 1,
            type: '',
            title: '今日上线',
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            favorites: []
        }    
    },
    metaInfo () {
        return {
            title: '我的收藏'
        }
    },
    mounted: function() {
        this.getFavorites();
    },
    methods:{
        goPage (id) {
            this.$router.push({ name: 'goods_detail', params: { id: id }})
        },
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
            this.getFavorites();
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
                        self.favorites.push(res.data.favorites[i])
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
        deleteFavorite (index) {
            var self = this;
            self.$vux.confirm.show({
                title: '删除？',
                content: '确认删除？',
                onConfirm () {
                    self.$vux.loading.show({
                        text: '删除中...'
                    })
                    $.ajax({
                        url: '/api/v1/favorites/' + self.products[index].id,
                        method: 'delete',
                        Authorization: true,
                        success: function (res) {
                            self.products.splice(index,1);
                            self.$vux.toast.text('删除成功', 'bottom');
                        },
                        error: function (err) {
                            self.$vux.toast.text('删除失败', 'bottom');
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '../assets/goods_list.less';
    .mix_list_child{
        margin-bottom: 0;
    }
</style>
