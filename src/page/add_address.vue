<template>
    <div class="add_address" style="background:#f8f8f8;padding-top:.3rem;">
        <ul class="list">
            <li>
                <p>收货人</p>
                <input type="text" placeholder="姓名" v-model='address.receiver'>
            </li>
            <li>
                <p>联系电话</p>
                <input type="text" placeholder="手机或固话" v-model='address.receiver_phone'>
            </li>
            <li>
                <!-- <p>选择地址</p> -->
                <x-address :title="title" v-model="value" raw-value :list="addressData" value-text-align="left" ></x-address>
                <img src="../image/right_tip.png">
            </li>
            <div class="address">
                <p>详细地址</p>
                <textarea placeholder="街道门牌信息" v-model='address.receiver_address'></textarea>
            </div>
        </ul>
        <div class="ischeck">
            <check-icon :value.sync="address.is_default"> 设为默认地址</check-icon>
        </div>
        <div class="exit" @click='editAddress'>确定</div>

        <div class="pop-success" v-show="isCreated">
            <img src="../image/cartChecked.png" alt="">
            <p>地址创建成功</p>
        </div>
    </div>
</template>

<script>
import { XAddress, ChinaAddressV4Data, CheckIcon, Value2nameFilter as value2name} from 'vux';

import $ from '../common';
export default {
    name: 'add_address',
    components: {
        XAddress,
        CheckIcon
    },
    data () {
        return {
            address: {
                receiver:"",
                receiver_phone:"",
                province: '江苏省',
                city: '无锡市',
                county: '滨湖区',
                receiver_address:'',
                is_default: false
            },
            isCreated: false,
            id: '',
            value: ['江苏省', '无锡市', '滨湖区'],
            title: '选择地址',
            addressData: ChinaAddressV4Data,
        }        
    },
    metaInfo: {
        title: '添加地址'
    },
    mounted: function() {
        this.id = this.$route.query.address;
        if(this.id){
            this.getAddress();
        }
    },
    methods:{
        getAddress () {
            var self = this;
            $.ajax({
                url: '/api/v1/address/' + self.id,
                Authorization: true,
                success: function (res) {
                    self.address = res.data.address;
                    self.value = [res.data.address.province, res.data.address.city, res.data.address.county];
                }
            })
        },
        editAddress () {
            var self = this;
            
            if(!self.address.receiver){
                self.$vux.toast.text('姓名不能为空', 'middle');
                return;
            }
            if(!self.address.receiver_phone){
                self.$vux.toast.text('手机号码不能为空', 'middle');
                return;
            }
            if(!self.address.receiver_address){
                self.$vux.toast.text('请填写详细地址', 'middle');
                return;
            }
            var district = value2name(self.value, ChinaAddressV4Data).split(' ');
            self.address.province = district[0];
            self.address.city = district[1];
            self.address.county = district[2];
            var url = '/api/v1/address/';
            if(self.$route.query.address){
                url = '/api/v1/address/' + self.$route.query.address;
            }
            $.ajax({
                url: url,
                method:'post',
                Authorization:true,
                data: self.address,
                success: function (res) {
                    self.isCreated = true;
                },
                error: function (argument) {
                    self.$vux.toast.text('添加失败，请重试', 'middle');
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .add_address{
        .pop-success{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            img{
                width: 93px;
                margin: 100px auto 20px auto;
            }
            p{
                color: #000;
                font-size: .4rem;
                text-align: center;
            }
        }
        .weui-cell{
            padding: 0;
        }
        .weui-cell_access .weui-cell__ft{
            display: none;
        }
        .list {     
            padding-left:.3rem;
            background: #fff;
            box-sizing:border-box;
        }
        .list li{
            height: .88rem;
            line-height: .88rem;
            display: flex;
            border-bottom: 1px solid #E5E5E5;
        }
        .list li p{
            margin-right:.44rem;
            width: 1.4rem;
            font-size: .34rem;
            color: #000000;
        }
        .list li:nth-child(3){
            position: relative;
            div:nth-child(1){
                width:100%
            }
            .weui-label{
                font-size:.34rem;
            }
            .vux-cell-primary{
                position:absolute;
                top:0;
                left:1.85rem;
                width:70%;
                font-size:.34rem;
                color:#B2B2B2;
                .vux-popup-picker-value{
                    font-size:.28rem;
                    color:#B2B2B2;
                }
            }
            .vux-cell-box{
                width:100%;
            }
                 
        }
        .list li input{
            font-size: .28rem;
            color: #B2B2B2;
        }
        .list li img{
            position:absolute;
            top: .3rem;
            right: .3rem;
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
        
        .vux-cell-box:before{
            border-top:none!important;
            content:none;
        }
        .address{
            padding-top:.1rem;
            height:1.5rem;
            display:flex;
        }
        .address p{
            margin-right:.44rem;
            width: 1.4rem;
            font-size: .34rem;
            color: #000000;
        }
        .address textarea{
            width:70%;
            font-size: .28rem;
            color: #B2B2B2;
            border:0;
            outline:none;
        }
        .ischeck{
            padding-left:.3rem;
            height:.88rem;
            line-height:.88rem;
            font-size: .37rem;
            color: #9B9B9B;
            box-sizing:border-box;
            .vux-check-icon > span{
                font-size: .37rem;
                color: #9B9B9B;
                line-height:.88rem;
            }
            border-bottom:1px solid #E5E5E5;
        }
    }
</style>
