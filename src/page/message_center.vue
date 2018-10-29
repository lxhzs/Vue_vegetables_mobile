<template>
  <div class="myset" style="background:#fff; height:100vh">
      <ul class="list">
        <router-link v-for="(item, index) in messages" :to="{ name: 'message_reminding', query: { id: item.id }}" tag="li">
            <div class="left">
                <img id="lingdang" src="../image/lingdang.png">
                <p>{{ item.name }}</p>
            </div>
            
            <img src="../image/right_tip.png">
        </router-link>
      </ul>
  </div>
</template>

<script>
import $ from '../common';

export default {
    name: 'my_set',
    metaInfo: {
        title: '消息中心'
    },
    data () {
        return {
            messages: []
        }    
    },
    mounted: function() {
        this.getMessages()
    },
    methods:{
        getMessages () {
             var self=this;
             $.ajax({
                 url: '/api/v1/message/categories',
                 Authorization:true,
                 success: function (res) {
                     self.messages = res.data.Products
                 }
             })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .list li{
      
      padding-left: .4rem;
      padding-right: .3rem;
      height: .88rem;
      line-height: .88rem;
      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid #E5E5E5;
    }
    .list li p{
      font-size: .34rem;
      color: #000000;
    }

    .list li img{
      margin-top: .3rem;
      margin-left: .3rem;
      width:.16rem;
      height: .26rem;
    }
    #lingdang{
      margin-right: .16rem;
      margin-left: 0;
      margin-top: .12rem;
      width: .5rem;
      height: .58rem;
    }
    .exit{
      margin:0 auto;
      margin-top: 2.68rem;
      width: 6.7rem;
      height: .94rem;
      line-height: .94rem;
      text-align: center;
      border-radius: .1rem;
      font-size: .34rem;
      color: #fff;
      background: #bde8c7
    }
    .left{
      display: flex;
    }
</style>
