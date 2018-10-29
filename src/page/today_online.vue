<template>
  <scroller lock-x use-pullup :pullup-config="config" @on-pullup-loading="getTodayonline" ref="scroller">
    <div class="todayOnline">
        <div class="list_good">
            <ul class="list_goods">
                <router-link v-for="(item, index) in products" :to="{ name: 'goods_detail', params: { id: item.id }}" tag="li">
                    <img class="goodImg" :src="item.image" alt="">
                    <p>{{ item.name }}</p>
                    <p>￥{{ item.price }}/{{ item.spec }}g</p>
                </router-link>  
            </ul>
        </div>
    </div>
  </scroller>
  
</template>

<script>
import $ from '../common';
import { Scroller, LoadMore } from 'vux';

export default {
    name: 'today_online',
    components: {
      Scroller,
      LoadMore 
    },

    data () {
        return {
            page: 1,
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            products: []
        }    
    },
    metaInfo: {
      title: '今日上线'
    },
    mounted: function() {
        this.getTodayonline()
    },
    methods:{
        getTodayonline () {
            var self = this;
            $.ajax({
                url: '/api/v1/product/todayonline',
                data: {
                    page: self.page,
                    page_size: 10
                },
                success: function (res) {
                    console.log(res)
                    self.page ++;
                    for(var i=0; i<res.data.products.length; i++){
                        self.products.push(res.data.products[i])
                    }
                    // self.$refs.scroller.reset()
                    self.$refs.scroller.donePullup();
                    if(res.data.meta.current_count < 10){
                        self.$refs.scroller.disablePullup()
                    }
                    console.log(self.products)
                },
                error: function (err) {
                    console.log(err)
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
