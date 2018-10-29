<template>
  <div class="myset" style="background:#fff; height:100vh">
      <ul class="list">
          <router-link :to="{name: 'modify_head'}" tag="div">
              <li>
                  <p>头像</p>
                  <img src="../image/right_tip.png">
              </li>
          </router-link>
          <router-link  :to="{name: 'modify_name'}" tag="div">
              <li>
                  <p>昵称</p>
                  <img src="../image/right_tip.png">
              </li>
          </router-link>
          <router-link  :to="{name: 'modify_date'}" tag="div">
              <li>
                  <p>生日</p>
                  <img src="../image/right_tip.png">
              </li>
          </router-link>
      </ul>
      <!-- <div class="exit">退出登录</div> -->
  </div>
</template>

<script>

export default {
    name: 'my_message',
    metaInfo: {
        title: '我的信息'
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
