<template>
  <div class="myset" style="background:#f8f8f8; height:100vh">
      <ul class="list">
          <li>
              <p>申请人</p>
              <input type="text" name="" placeholder="请输入姓名" v-model='user_name'>
          </li>
          <li>
              <p>联系电话</p>
              <input type="number" name="" placeholder="请输入电话" v-model='phone'>
          </li>
           <li style="margin-top:.35rem;">
              <p>店铺名称</p>
              <input type="text" name="" placeholder="请输入店铺名称" v-model='shop_name'>
          </li>
          <li>
              <p>店铺地址</p>
              <input type="text" name="" placeholder="店铺所在地" v-model='shop_address'>
          </li>
      </ul>
   
      <div class="shop_content">
          <p>店铺简介</p>
          <textarea placeholder="可经营的范围" v-model='shop_summary'></textarea>
      </div>
          

      <div class="exit" @click='confirm'>立即申请</div>
  </div>
</template>

<script>
import $ from '../common';

export default {
    name: 'shop_application',
    data () {
        return {
            user_name:'',
            phone:'',
            shop_name:'',
            shop_address:'',
            shop_summary:''
        }    
    },
    metaInfo: {
      title: '店铺申请'
    },
    mounted: function() {

    },
    methods:{
         //验证必填
        confirm:function(){
            var self = this;
            if (!self.user_name) {
              self.$vux.toast.text('姓名不能为空', 'middle')
              return;
            }
            if (!self.phone) {
              self.$vux.toast.text('联系电话不能为空', 'middle')
              return;
            }
            if (!self.shop_name) {
              self.$vux.toast.text('店铺名称不能为空', 'middle')
              return;
            }
            if (!self.shop_address) {
              self.$vux.toast.text('店铺地址不能为空', 'middle')
              return;
            }
            if (!self.shop_summary) {
              self.$vux.toast.text('可经营的范围不能为空', 'middle')
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
            self.apply();
        },
        //申请提交
        apply:function(){
            var self = this;
            $.ajax({
                url: '/api/v1/common/apply',
                method: 'post',
                Authorization: true,    
                data:{
                    user_name:self.user_name,
                    phone:self.phone,
                    shop_name:self.shop_name,
                    shop_address:self.shop_address,
                    shop_summary:self.shop_summary
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
      padding-top: .22rem;
    }
    .list li{
      padding-left: .4rem;
      padding-right: .3rem;
      height: .88rem;
      line-height: .88rem;
      display: flex;
      background: #fff;
      border-bottom: 1px solid #E5E5E5;
    }
    .list li input{
      width: 70%;
    }
    .list li:nth-child(odd){
      border-top: 1px solid #E5E5E5;
    }
    .list li p{
      margin-right: .7rem;
      width: 1.5rem;
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
      position: fixed;
      bottom: 0;
      width: 100%;
      height: .94rem;
      line-height: .94rem;
      text-align: center;
      
      font-size: .24rem;
      color: #fff;
      background: #bde8c7
    }
    .shop_content{
      width: 100%;
      padding-top: .1rem;
      padding-left: .4rem;
      height: 3.89rem;
      box-sizing: border-box;
      background: #fff;
      border-bottom: 1px solid #E5E5E5;
    }
    .shop_content p{
      font-size: .34rem;
      color: #000000;
    }
    .shop_content textarea{
      margin-top: .1rem;
      width: 100%;
      height: 3rem;
      font-size: .24rem;
      color: #000000;
      text-indent: .5rem;
      border:0;
      outline: none;
    }
</style>
