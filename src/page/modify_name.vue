<template>
  <div class="modify_name" style="background:#fff; height:100vh">
      <ul class="list">
          <li>
              <p>用户名：</p>
              <!-- <img src="../image/right_tip.png"> -->
              <input type="text" name="" v-model="nickname">
              <img class="close" src="../image/close.png">
              <span class="confirm" @click='confirm'>确定</span>
          </li>
      </ul>
  </div>
</template>

<script>
import $ from '../common';
export default {
  name: 'modify_name',
  data () {
    return {
      nickname:"",
    }    
  },
  metaInfo: {
    title: '修改名称'
  },
  mounted: function() {
    if ($.getStorage('profile')) {
       this.nickname=$.getStorage('profile').nickname
    }
   
  },
  methods:{
     confirm:function(){
      var self = this;
      if (!self.nickname) {
        self.$vux.toast.text('昵称不能为空', 'middle')
        return;
      }
      $.ajax({
          url: '/api/v1/profile/nickname',
          method: 'post',
          data:{
            nickname: self.nickname
          },
          Authorization:true,
          success: function (res) {
            self.$vux.toast.text(res.data.message, 'middle');
            $.setStorage('profile', { nickname: self.nickname })
            setTimeout(function () {
                self.$router.back()
            }, 1000)
          },
          error: function () {
            self.$vux.toast.text('修改失败', 'middle');
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
    .list li input{
      font-size: .34rem;
      color: #000000;
    }

/*    .list li img{
      margin-top: .3rem;
      margin-left: .3rem;
      width:.16rem;
      height: .26rem;
    }
*/    .exit{
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
    .close{
      margin-top: .3rem;
      width: .3rem;
      height: .3rem;
    }
    .confirm{
      font-size: .28rem;
      color: #5DC56E;
    }
</style>
