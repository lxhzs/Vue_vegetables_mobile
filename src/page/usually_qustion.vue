<template>
  <div class="usually_qustion" style="background:#fff;">
      <ul class="list">
          <li>
              <p>常见问题</p>
          </li>
          <div v-for='item in questions'>
            <li>
                <p>问:{{item.question}}</p>
                <img src="../image/right_tip.png">
            </li>
            <li>
                <p>答案:{{item.answer}}</p>
                <img src="../image/right_tip.png">
            </li>
          </div>
          
      </ul>
      <!-- <div class="exit">退出登录</div> -->
  </div>
</template>

<script>
import $ from '../common';

export default {
  name: 'usually_qustion',
  data () {
    return {
      questions:[]
    }    
  },
  metaInfo: {
    title: '常见问题'
  },
  mounted: function() {
    this.getQusetion();
  },
  computed: {

  },
  methods:{
     getQusetion () {
        var self = this;
        $.ajax({
          url: '/api/v1/common/qa',
          Authorization:true,
          success: function (res) {
            self.questions=res.data.questions
          },
          error: function (argument) {
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
