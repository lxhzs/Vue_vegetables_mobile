<template>
  <div class="modify_date" style="background:#fff; height:100vh">
      <group>
            
          <datetime value-text-align="center" v-model="date" @on-confirm="isConfirm=true" @on-change="confirm" :min-year="1950" :max-year="2017" format="YYYY年MM月DD日" clear-text="选择你的生日" ></datetime>
      </group>
  </div>
</template>

<script>
import { Group, Datetime } from 'vux';
import $ from '../common';
export default {
    name: 'modify_date',
    components: {
        Group,
        Datetime
    },
    data () {
        return {
            isConfirm: false,
            date: ''
        }    
    },
    metaInfo: {
        title: '修改日期'
    },
    mounted: function() {
        var self = this;
        var value = $.getStorage('profile').birthday;
        if (value) {
            setTimeout(function (argument) {
                self.date = value.substring(0,4)+'年'+value.substring(5,7)+'月'+value.substring(8,10)+'日';
            }, 400)
        }
    },
    methods:{
        confirm (value) {
            if(!this.isConfirm) return;
            var self = this;
            var data = value.substring(0,4)+'-'+value.substring(5,7)+'-'+value.substring(8,10)
            $.ajax({
                url: '/api/v1/profile/birthday',
                method: 'post',
                data:{
                    birthday: data
                },
                Authorization:true,
                success: function (res) {
                    self.$vux.toast.text(res.data.message, 'middle');
                    $.setStorage('profile', { birthday: data })
                },
                error: function (argument) {
                    self.$vux.toast.text('修改失败', 'middle');
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
      border-bottom: 1px solid #E5E5E5;
      text-align: center;
    }
    .list li p{
      font-size: .34rem;
      color: #e1e1e1;
    }
</style>
