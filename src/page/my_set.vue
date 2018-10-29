<template>
    <div class="myset" style="background:#fff; height:100vh">
        <ul class="list">
            <router-link to="my_message" tag="div">
                <li>
                    <p>个人信息</p>
                    <img src="../image/right_tip.png">
                </li>
            </router-link>
            <router-link to="/modify_password" tag="div">
                <li>
                    <p>修改密码</p>
                    <img src="../image/right_tip.png">
                </li>
            </router-link>
        </ul>
        <div class="exit" @click="exit">退出登录</div>
    </div>
</template>

<script>
import $ from '../common';

export default {
    name: 'myset',
    metaInfo: {
        title: '设置'
    },
    methods:{
        exit () {
            var self = this;
            self.$vux.confirm.show({
                title: '退出',
                content: '确认退出？',
                onCancel () {
                  console.log('plugin cancel')
                },
                onConfirm () {
                    $.clearStroage()
                    self.$router.push({ name: 'login'})
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
</style>
