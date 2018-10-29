<template>
    <div class="feedback" style="background:#fff; height:100vh">
        <div class="text">
            <textarea placeholder="取货时间，要求等..." v-model="remark"></textarea>
        </div>
        
        <div class="exit" @click="submit">提交</div>
    </div>
</template>

<script>
import store from '../store';

export default {
    name: 'buyer_remind',
    data () {
        return {
            remark: ''
        }    
    },
    metaInfo: {
      title: '备注'
    },
    mounted: function() {
        this.remark = store.remark;
    },
    methods:{
        submit () {
            store.remark = this.remark;
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .feedback{
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
