<template>
  <div class="feed_back" style="background:#fff; height:100vh">
      <div class="text">
          <textarea placeholder="写下你的宝贵建议" v-model="content"></textarea>
      </div>
      
      <div class="exit" @click="submit">提交</div>
  </div>
</template>

<script>
import $ from '../common';
export default {
  name: 'feed_back',
  data () {
    return {
      content: ''
    }    
  },
  metaInfo: {
    title: '用户反馈'
  },
  methods:{
    submit () {
      var self = this;
      if(!self.content){
        self.$vux.toast.text('内容不能为空', 'middle');
        return;
      }
      self.$vux.loading.show({
       text: '提交中'
      })
      $.ajax({
        url: '/api/v1/common/feedback',
        data:{
          content: self.content
        },
        Authorization: true,
        method: 'post',
        success: function (res) {
          self.$vux.toast.text('反馈成功', 'middle');
          setTimeout(function (argument) {
            self.$router.back()
          }, 1000)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .feed_back{
      padding-top:1px;
    }
    .text{
      padding-top: .42rem;
      margin:0 auto;
      margin-top: .89rem;
      width: 6.86rem;
      height: 4.49rem;
      box-sizing: border-box;
      background: rgba(216,216,216,.3);
      border: 1px solid #979797;
    }
    .text textarea{
      width: 100%;
      height: 100%;
      font-size: .37rem;
      background: none;
      border:0;
      text-indent: .37rem;
      outline: none;
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
      background: #D9EADF;
      border: 2px solid #5DC56E;
    }
</style>
