<template>
    <div class="address" style="background:#fff; height:100vh">
        <ul class="list">
            <li v-for="(item,idx) in addressList" :key="idx"> 
                <slide-left-delete :index="idx"  :isPrevent="item.isEdit" @deleteItem="deleteItemFn(idx,item.id)">
                    <div @click="select(item.id)">
                        <div>
                            <p>{{item.receiver}}<span class="telphone">{{item.receiver_phone}}</span></p>
                            <p class="text-ellipsis">{{item.province+item.city+item.county+item.receiver_address}}</p>
                        </div>
                        <img src="../image/right_tip.png" v-if="type != 'choose'">
                    </div>
                </slide-left-delete>
            </li>
            <!-- <li>
                <div>
                    <p>小二<span class="telphone">12345678901</span></p>
                    <p>江苏省无锡市新港中路TIT创意园</p>
                </div>
                <img src="../image/right_tip.png">
            </li> -->
            <router-link class="add" to="add_address" tag="div">
                <img src="../image/add.png">
                <p>新增收货地址</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
import store from '../store';
import SlideLeftDelete from '../components/slide_left_delete_nowarp.vue';
import $ from '../common';

export default {
    name: 'address',
    components: {
        SlideLeftDelete
    },
    data () {
        return {
            ids: '',
            type: '',
            addressList:[],
            checkItems:[],              
        }    
    },
    metaInfo: {
        title: '地址'
    },
    mounted: function() {
        this.type = this.$route.query.type;
        this.ids = this.$route.query.ids;
        this.getAddress();
    },
    methods:{
        select (id) {
            if(this.type == 'choose'){
                store.address = id;
                this.$router.back();
            }else{
                this.$router.push({ name: 'add_address', query: { address: id } })
            }
        },
        getAddress:function(){
            var self = this;
            $.ajax({
                url: '/api/v1/address/',
                Authorization:true,
                success: function (res) {
                    console.log(res)
                    self.addressList=res.data.addresses
                }
            })
        },
        deleteItemFn(index,id){
            var self = this;
            self.$vux.confirm.show({
                title: '删除？',
                content: '确认删除？',
                onCancel () {
                    console.log('plugin cancel')
                },
                onConfirm () {
                    $.ajax({
                        url: '/api/v1/address/'+id,
                        method:'delete',
                        Authorization:true,
                        success: function (res) {
                            self.$vux.toast.text(res.data.message, 'middle');
                            self.addressList.splice(index,1);
                        }
                    })
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .address{
      .list{
        box-sizing: border-box;
        border-bottom: 1px solid #E5E5E5;
      }
      .list li{
        position: relative;
        height:1.5rem;
        line-height: .75rem;
        border-bottom: 1px solid #E5E5E5;
      }
      .list li p{
        width: 7rem;
        font-size: .32rem;
        color: #000000;
      }
      .telphone{
        margin-left: .6rem;
      }
      .list li .move{
        padding-left: .3rem;
      }
      .list li .move:active{
        
        background: #eee;
      }
      .list li img{
        position: absolute;
        top: 50%;
        right: .2rem;
        margin-top: -.13rem;
        width:.16rem;
        height: .26rem;
      }
      .add{
        padding-left: .3rem;
        display: flex;
        height: 1.2rem;
        line-height: 1.2rem;
      }
      .add:active{
        background: #eee;
      }
      .add img{
        margin-right: .3rem;
        margin-top: .4rem;
        width: .36rem;
        height: .36rem;
        display: inline-block;
      }
      .add p{
        font-size: .32rem;
        color: #000000;
      }
      .move{
        display:flex;
        justify-content: space-between;
        background:#fff;
      }
      .deleteIcon{
        width:1.4rem;
        height: 1.5rem;
        line-height:1.5rem;
        padding-top:0;
        background:#d60020;
        border-radius:0;
        font-size:.38rem;
      }
    }
    
</style>
