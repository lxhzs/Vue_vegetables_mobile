<template>
<div class="login">
  <div class="line"></div>
  <div class="login_box" v-show="step1">
    <div class="head_img"></div>
    <div class="input_msg">
      <div class="verificate">
        <input type="text" placeholder="手机号" v-model='phone'>
        <span @click="getVerifyCode()" :id="[isSending ? 'sending' : '']">{{btnText}}</span>
      </div>
      <input type="text" placeholder="验证码" v-model='verify_code'>
    </div>
    <div class="forgetOrRegister">
      <!--  <a href="#">登录</a>
            <a href="#">注册</a> -->
    </div>
    <div class="confirm" @click="next">下一步</div>
  </div>
  <div class="login_box" v-show="step2">
    <div class="head_img"></div>
    <div class="input_msg">
      <input type="password" placeholder="输入密码" v-model='password'>
      <input type="password" placeholder="确认密码" v-model='confirm_password'>
    </div>
    <div class="forgetOrRegister">
      <!--       <a href="#">忘记密码?</a>
            <a href="#">注册</a> -->
    </div>
    <div class="confirm" @click="confirm">确定</div>
  </div>
  <div class="login_box" v-show="step3">
    <div class="step3">
      <img src="../image/true.png" alt="">
      <p>修改成功</p>
    </div>
    <router-link tag="div" to="/login" class="confirm">返回登录</router-link>
  </div>
</div>
</template>

<script>
import { Group, Cell } from 'vux';
import $ from '../common';
export default {
    name: 'register',
    components: {
        Group,
        Cell
    },
    data() {
        return {
            phone: "",
            password: "",
            confirm_password: "",
            verify_code: "",
            check: false,
            btnText: "发送验证码",
            isSending: false,
            step1: true,
            step2: false,
            isclick: true,
            step3: false,
        }
    },
    metaInfo: {
        title: '注册'
    },
    mounted: function() {

    },
    methods: {
        //发送短信后计时
        btnTextFun() {
            var self = this;
            if(self.isSending) return;
            var a = 60;
            self.isSending = true;
            self.btnText = a + "秒后获取";
            var t = setInterval(function() {
                if (a <= 0) {
                    self.btnText = "重新获取";
                    self.isSending = false;
                    clearInterval(t);
                    return;
                }
                a--;
                self.btnText = a + "秒后获取";
            }, 1000);
        },

        //获取验证码
        getVerifyCode () {
            var self = this;
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (self.isSending) return;
            if (!myreg.test(self.phone)) {
                self.$vux.toast.show({
                    type: 'text',
                    text:'请输入有效的手机号码', 
                    width: '4rem',
                    position: 'middle'
                })
                return;
            }

            $.ajax({
                url: '/api/v1/auth/verify-code',
                method: 'get',
                params: {
                    phone: self.phone
                },
                success:function(data){
                    self.$vux.toast.text('验证码发送成功', 'middle');
                    self.btnTextFun()
                    self.isclick = false;
                },
                error: function (argument) {
                    self.$vux.toast.show({
                        type: 'text',
                        text:'验证码获取失败，请重试', 
                        width: '4rem',
                        position: 'middle'
                    })
                }
            })
        },

        next () {
            var self = this;
            if (!self.phone) {
                self.$vux.toast.text('手机号不能为空', 'middle')
                return;
            }
            if (!self.verify_code) {
                self.$vux.toast.text('验证码不能为空', 'middle')
                return;
            }
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(self.phone)) {
                self.$vux.toast.show({
                    type: 'text',
                    text:'请输入有效的手机号码', 
                    width: '4rem',
                    position: 'middle'
                })
                return;
            }
            self.verifyCode();
        },

        // 验证验证码
        verifyCode () {
            var self = this;
            this.$vux.loading.show({
                text: '提交中...'
            })
            $.ajax({
                url: '/api/v1/auth/verify-code',
                method: 'post',
                data:{
                    phone: self.phone,
                    verify_code: self.verify_code
                },
                success:function(data){
                    self.$vux.toast.text('验证通过', 'middle');
                    self.check = true;
                    self.step1 = false;
                    self.step2 = true;
                },
                error: function (argument) {
                    self.$vux.toast.text('验证失败，请重试', 'middle');
                }
            })
        },
        confirm () {
            var self = this;
            if(!self.password){
                self.$vux.toast.text('密码不能为空', 'middle');
                return;
            }
            if (self.password != self.confirm_password) {
                self.$vux.toast.show({
                    type: 'text',
                    text:'两次密码输入不一致！', 
                    width: '4rem',
                    position: 'middle'
                })
                return;
            }
            self.resetPassword();
        },

        resetPassword () {
            var self = this;
            self.$vux.loading.show({
                text: '提交中...'
            })
            $.ajax({
                url: '/api/v1/auth/reset-password',
                method: 'post',
                data: {
                    password: self.password,
                    confirm_password: self.confirm_password,
                    verify_code: self.verify_code
                },
                success: function (res) {
                    self.step2 = false;
                    self.step3 = true;
                    // self.$vux.toast.text('重置成功', 'middle');
                    // setTimeout(function () {
                    //     self.$router.push('/login')
                    // }, 1000)
                },
                error: function (err) {
                    self.$vux.toast.text('重置失败', 'middle');
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/login.css';
</style>
