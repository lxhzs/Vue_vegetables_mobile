<template>
  <div class="search_classify">
  <!-- 搜索 -->
        <div class="search">
            <div class="search_main">
                <img src="../image/search.png" alt="">
                <input type="text" :placeholder="text" v-model="text" @keyup.enter="search">
            </div >
            <span @click="search">搜索</span>
        </div>

        <scroller lock-x use-pullup :height="scrollHeight" :pullup-config="config" @on-pullup-loading="loadMore" ref="scroller">
            <div class="today_list">
                <div class="list_good">
                    <ul class="list_goods">
                        <router-link tag="li" v-for="(item,index) in products" :to="{ name: 'goods_detail', params: { id: item.id }}">
                            <img class="goodImg" :src="item.image" alt="">
                            <p class="name">{{item.name}}</p>
                            <p v-if="item.type=='COMBO'">{{item.people}}人餐</p>
                            <p class="price"><i>￥{{item.price}}</i></p>
                            <img v-if="item.type=='BARGIN'" class="icon_tejia" src="../image/tejia.png" alt="">
                        </router-link>
                    </ul>
                </div>
            </div>
        </scroller>
  </div>
</template>

<script>
import { Scroller } from 'vux'
import $ from '../common';

export default {
    name: 'search_classify',
    components: {
        Scroller
    },
    data () {
        return {
            text: '',
            scrollHeight: '620px',
            page: 1,
            config: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            products:[]
        }    
    },
    metaInfo: {
        title: '查看全部'
    },
    mounted: function() {
        this.scrollHeight = (document.documentElement.clientHeight - 50) + 'px';
        this.text = this.$route.query.text;
        this.getSearch();
    },
    methods:{
        search () {
            this.page = 1;
            this.$refs.scroller.enablePullup()
            this.$refs.scroller.reset();
            this.products = [];
            this.getSearch();
        },
        loadMore () {
            this.getSearch();
        },
        getSearch () {
            var self = this;
            if(!self.text){
                self.$vux.toast.text('请输入搜索内容', 'middle');
                return;
            }
            $.ajax({
                url: '/api/v1/search/products',
                params: {
                    page: self.page,
                    page_size: 20,
                    text: self.text
                },
                success: function (res) {
                    self.page ++;
                    console.log(res)
                    for (var i = 0; i < res.data.products.length; i++) {
                        self.products.push(res.data.products[i])
                    }
                    self.$refs.scroller.donePullup();
                    if(res.data.products.length < 10){
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .search_classify{
        height: 100%;
        background: #fff
    }
    .today_list{
        padding-bottom: 10px;
    }
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
        padding: 10px .24rem;
        padding-top: 10px;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
    }
    .search_main{
        width: 6.2rem;
        height: 30px;
        line-height: 30px;
        background: rgba(3,3,3,0.09);
        display: flex;
        border-radius: .2rem;
    }
    .search_main input{
        height: 30px;
        background: rgba(3,3,3,0);
        color: #fff;
        font-size: 14px;
    }
    .search_main img{
        margin-left: 9px;
        margin-top: 6px;
        margin-right: 9px;
        width: 18px;
        height: 18px;
        display: inline-block;
        vertical-align:middle;
    }
    .search span{
      font-size: 14px;
      color:#66c97e
    }
    /*今日特价*/
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
    .list_goods{
      display: flex;
      flex-wrap: wrap;
    }  

    .list_goods li{
      position: relative;
      padding:0 .24rem;
      padding-top: .13rem;
      margin-bottom: .05rem;
      width: 2.49rem;
      height: auto;
      background: #fff;
      text-align: center;
      box-sizing: border-box;
      border-right: 1px solid rgba(155,155,155,0.64);
    }
    .list_goods li i{
        font-style: normal;
    }
    .list_goods li .goodImg{
      display: inline-block;
      width: 2.03rem;
      height: 1.5rem;
    }
    .list_goods li .icon_tejia{
      position: absolute;
      top:0;
      left: 0;
      width: .81rem;
      height: .81rem;
    }  
    .list_goods li p.name{
/*      margin-top: .1rem;*/
      text-align: left;
      font-size: .2rem;
      color: #4a4a4a; 
    }  
    .list_goods li p{
      text-align: left;
      font-size: .14rem;
      color: #9b9b9b;    
    }
    .list_goods li p.price {
      text-align: left;
      font-size: .18rem;
      color:#fb0724;
    }
    .list_goods li:nth-child(3n+3){
      border-right: 0;
    } 

</style>
