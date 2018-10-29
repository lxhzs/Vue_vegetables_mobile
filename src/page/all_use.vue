<template>
  <div class="myset" style="background:#fff; height:100vh">
      <ul class="list">
          <router-link to="feed_back" tag="div">
              <li>
                  <p>通用反馈</p>
                  <img src="../image/right_tip.png">
              </li>
          </router-link>
          <router-link to="usually_qustion" tag="div">
              <li>
                  <p>常见问题</p>
                  <img src="../image/right_tip.png">
              </li>
          </router-link>
          <router-link to="about_us" tag="li">
            <p>关于我们</p>
            <img src="../image/right_tip.png">
          </router-link>
      </ul>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux';
export default {
  name: 'myset',
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }    
  },
  metaInfo: {
    title: '通用'
  },
  mounted: function() {

  },
  computed: {

  },
  methods:{
     

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
