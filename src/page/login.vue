<template>
  <div class="login">
      <div class="line"></div>
      <div class="login_box">
          <div class="head_img"></div>
          <div class="input_msg">
              <input type="text" placeholder="手机号" v-model="phone">
              <input type="password" placeholder="密码" v-model="password">
          </div>
          <div class="forgetOrRegister">
            <router-link to="/forget_password">忘记密码?</router-link>
            <router-link to="/register" href="#">注册</router-link>
          </div>
          <div class="confirm" @click="confirm">确定</div>
      </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
import $ from '../common';

export default {
    name: 'login',
    components: {
      Group,
      Cell
    },
    data () {
      return {
        phone: '13211111111',
        password: 'xiaodaozong'
      }    
    },
    metaInfo: {
      title: '登陆'
    },
    methods:{
        //登录
        confirm () {
            var self = this;
            var myreg =  /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            //判断输入情况
            if(!self.phone){
                self.$vux.toast.show({
                    type: 'text',
                    text:'手机号码不能为空！', 
                    width: '4rem',
                    position: 'middle'
                })
                return ;
            }
            if(!myreg.test(self.phone)){
                self.$vux.toast.show({
                    type: 'text',
                    text:'请输入有效的手机号码！', 
                    width: '4rem',
                    position: 'middle'
                })
                return;
            }
            if(!self.password){
                self.$vux.toast.show({
                    type: 'text',
                    text:'请输入密码！', 
                    width: '4rem',
                    position: 'middle'
                })
                return ;
            }
            self.login ();
        },
        login () {
            var self = this;
            self.$vux.loading.show({
                text: '登录中...'
            })
            $.ajax({
                url: '/api/v1/auth/login',
                method: 'post',
                data: {
                    phone: self.phone,
                    password: self.password
                },
                success: function (res) {
                    self.step2 = false;
                    self.step3 = true;
                    $.setStorage('user',res.data)
                    self.$vux.toast.text('登录成功', 'middle');
                    self.$router.push('/')
                },
                error: function (err) {
                    console.log(err)
                    self.$vux.toast.text('登录失败', 'middle');
                }
            })
        }
    }
}
</script>

<style scoped>
    @import '../assets/login.css';
</style>
