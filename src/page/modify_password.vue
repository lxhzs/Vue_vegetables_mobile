<template>
  <div class="modify_password" style="background:#f8f8f8;">
      <ul class="list">
          <li>
              <input type="password" v-model="old_password" placeholder="请输入当前密码">
          </li>
          <li>
              <input type="password" v-model="new_password" placeholder="请新密码">
          </li>
          <li>
              <input type="password" v-model="confirm_password" placeholder="确认新密码">
          </li>
      </ul>
     
       <div class="exit" @click='confirm'>确认修改</div>
  </div>
</template>

<script>
import $ from '../common';
export default {
  name: 'modify_password',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name:"",
      old_password:"",
      new_password:"",
      confirm_password:"",
    }    
  },
  metaInfo: {
    title: '修改密码'
  },
  mounted: function() {

  },
  computed: {

  },
  methods:{
      //验证必填
     confirm:function(){
        var self = this;
        if (!self.old_password) {
          self.$vux.toast.text('当前不能为空', 'middle')
          return;
        }
        if (!self.new_password) {
          self.$vux.toast.text('新密码不能为空', 'middle')
          return;
        }
        if (!self.confirm_password) {
          self.$vux.toast.text('请再次输入密码', 'middle')
          return;
        }
        if (self.new_password != self.confirm_password) {
          self.$vux.toast.text('两次输入密码不一致', 'middle')
          return;
        }
        self.password();
     },
     //申请提交
     password:function(){
      var self = this;
       $.ajax({
          url: '/api/v1/profile/password',
          method: 'post',
          Authorization:true,
          data:{
            old_password:self.old_password,
            password:self.new_password,
            confirm_password:self.confirm_password,
          },
          success: function (res) {
            self.$vux.toast.text(res.data.message, 'middle');
            setTimeout(function () {
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
    .list{
      padding-top: 1px;
      width:6.7rem;
      margin: 0 auto;
      margin-top: .3rem;
      
    }
    .list li{
      padding-left: .4rem;
      height: 1.2rem;
      line-height: 1.2rem;
      background: #fff;
      margin-bottom: .2rem;
    }
    .list li input{
      font-size: .37rem;
      color: #9b9b9b;
    }

/*    .list li img{
      margin-top: .3rem;
      margin-left: .3rem;
      width:.16rem;
      height: .26rem;
    }
*/    .exit{
      margin:0 auto;
      margin-top: .7rem;
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
