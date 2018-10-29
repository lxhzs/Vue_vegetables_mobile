<template>
    <div class="myset" style="background:#f8f8f8;">
        <div v-if="!messages.length" class="no-content">暂无消息</div>
        <ul class="list">
            <li v-for="(item, index) in messages">
                <p>{{ item.title }}</p>
                <p style="padding-bottom: 10px">{{ item.content }}</p>
                <p class="time">{{ item.time }}</p>
            </li> 
        </ul>
        <!-- <div class="exit">退出登录</div> -->
    </div>
</template>

<script>
import $ from '../common';

export default {
    name: 'message_reminding',
    data () {
        return {
            messages: []
        }    
    },
    metaInfo: {
      title: '消息推送'
    },
    mounted: function() {
        var id = this.$route.query.id;
        this.getMessages(id);
    },
    methods:{
        getMessages (id) {
            var self = this;
            $.ajax({
                url: '/api/v1/message/categories/'+ id +'/messages',
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
    .list{
      padding-top: 1px;
    }
    .list li{
      margin-top: .42rem;
      background: #fff;
      border-top: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      
    }
    .list li p:nth-child(1){
       margin-top: .3rem;
    }

    .list li p{
      padding-left: .4rem;
      padding-right: .3rem;
      font-size: .34rem;
      color: #000000;
    }

    .list li p:nth-child(2){
      margin-top: .2rem;
      font-size: .28rem;
      color: #9B9B9B;
      text-indent: .28rem;
    }

    .time{
      padding-left: .4rem;
      padding-right: .3rem;
      border-top:1px solid #E5E5E5; 
      height: .88rem;
      line-height: .88rem;
      font-size: .34rem;
      color: #000000;
    }

</style>
