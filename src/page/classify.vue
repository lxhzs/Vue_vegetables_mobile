<template>
  <div class="main">
        <ul class="leftBar">
            <li :class="active == index ? 'active' : ''" v-for="(item,index) in categories" :data-id="item.id" @click="active = index">{{item.name}}</li>
        </ul>

        <ul class="rightList" v-for="(sub,index) in categories" v-show="active == index">
          <router-link tag="li" v-for="(item, idx) in sub.sub_categories" :to="{ name: 'goods_list', query: { type: 'categories', id: item.id } }">
              <img :src="item.image" alt="">
              <p>{{ item.name }}</p>
          </router-link tag="li">
        </ul>
        <div class="tabbar_box"></div>
        <foot active="2"></foot>
  </div>
</template>

<script>
import $ from '../common';
import { Group, Cell } from 'vux';
import Foot from '../components/footer.vue';

export default {
  name: 'main',
  components: {
    Foot,
    Group,
    Cell
  },
  data () {
    return {
      active: 0,
      categories:[]
    }    
  },
  metaInfo: {
    title: '分类'
  },
  mounted: function() {
    this.getCategories()
  },
  methods:{
    getCategories:function(){
      var self = this;
      $.ajax({
          url: '/api/v1/product/categories',
          success: function (res) {
            self.categories = res.data.categories;
            console.log(res)
          }
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*tabbar*/
    .weui-tabbar{
        position: fixed;
    }
    .leftBar{
      position: fixed;
      top: 0;
      left: -.37rem;
      width: 2.06rem;
      height: 100%;
      background: #f9f9f9;
      text-align: center;

    }
    .leftBar li{
      height: .69rem;
      font-size: .24rem;
      line-height: .69rem;
      color: #4A4A4A;
      background: #EAEAEA;
    }
    .active{
      background: #f9f9f9!important;
    }
    .rightList{
      padding: 0 .24rem;
      margin-left: 1.69rem;
      width: 5.81rem;
      height: auto;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
    }
    .rightList li{
      margin-top: .23rem;
      width: 33.33%;
      height: 1.35rem;
      text-align: center;
    }
    .rightList li:active{
      background: #eee;
    }
    .rightList li img{
      width: 1.46rem;
      height: .99rem;
      display: inline-block;
    }
    .rightList li p{
      font-size: .2rem;
      color:#4a4a4a;
    }   
    .tabbar_box{
      width: 100%;
      height: .9rem;
      background: #f9f9f9;
    } 
</style>
