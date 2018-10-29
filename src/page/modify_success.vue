<template>
  <div class="login">
      <div class="line"></div>
      <div class="login_box">
          <img class="true" src="../image/true.png">
          <p class="text_p">修改成功</p>
          <div class="confirm"><router-link to="/login" tag="div">确定</router-link></div>
      </div>
  </div>
</template>

<script>
import $ from '../common';

export default {
  name: 'modify_success',
  data () {
    return {
      // phone: '13211111111',
      // password: 'xiaodaozong'
    }    
  },
  metaInfo: {
    title: '修改成功'
  },
  mounted: function() {

  },
  computed: {

  },
  methods:{
  }  
}
</script>

<style scoped>
    @import '../assets/login.css';
    .true{
      margin:0 auto;
      margin-top: 1.27rem;
      margin-bottom: .58rem;
      width: 1.54rem;
      height: 1.14rem;

    }
    .text_p{
      margin-bottom: .94rem;
      width: 100%;
      text-align: center;
      font-size: .48rem;
      color: #000000;
    }
</style>
