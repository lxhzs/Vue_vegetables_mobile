<template>
    <div class="modify-head" style="background:#fff; height:100vh">
        <ul class="list">
            <li @click="show=true">
                <p>头像</p>
                <img src="../image/right_tip.png">
            </li>
        </ul>
        <vue-cropper v-show="isCrop"
            ref="cropper"
            :autoCrop="option.crop"
            :autoCropWidth="option.width"
            :autoCropHeight="option.height"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="false"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :fixedBox="option.fixedBox"
            :original="option.original"
        ></vue-cropper>

        <div class="btns" v-show="isCrop">
            <x-button type="primary" @click.native="upload">确定</x-button>
            <x-button type="warn" @click.native="isCrop=false">取消</x-button>
        </div>
        
        <actionsheet v-model="show" show-cancel>
            <div slot="header">
                <label for="file" @click="show=false">从相册选取</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg" hidden id="file" @change="openAlbum">
            </div>
        </actionsheet>
    </div>
    
</template>

<script>
import $ from '../common';
import { Actionsheet, XButton } from 'vux';
import vueCropper from 'vue-cropper';

export default {
    name:"my_head",
    components: {
        XButton,
        vueCropper,
        Actionsheet
    },
    data () {
        return {
            isCrop: false,
            option: {
                img: 'https://cn.vuejs.org/images/logo.png',
                crop: true,
                width: 200,
                height: 200,
                size: .4,
                full: false,
                outputType: 'png',
                canMove: true,
                fixedBox: true,
                original: false,
                canMoveBox: false
            },
            token: '',
            show: false
        }    
    },
    metaInfo: {
        title: '修改头像'
    },
    mounted: function() {
        this.token = $.getStorage('user').token;
    },
    methods:{
        upload () {
            var self = this;
            this.isCrop = false;
            this.$vux.loading.show({
                text: '提交中...' 
            })

            this.$refs.cropper.getCropBlob((data) => {
                console.log(data);
                var formData = new FormData();
                formData.append('thumbnail', data);
                console.log(formData)
                $.ajax({
                    url: '/api/v1/profile/avatar',
                    method: 'post',
                    Authorization: true,
                    data: formData,
                    success: function () {
                        self.$vux.toast.text('保存成功', 'middle');
                    },
                    error: function () {
                        self.$vux.toast.text('上传失败，请重试', 'middle');
                    }
                })
            })
        },
        openAlbum (e) {
            this.show = false;
            var obj = e.target.files[0];
            var url = window.URL.createObjectURL(obj);
            this.option.img = url;
            this.isCrop = true;
            e.target.value = '';
        }
    }
}
</script>

<style lang="less">
    .modify-head{
        label{
            display: block;
            width: 100%;
            font-size: 18px;
        }
        .btns{
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            .weui-btn{
                margin: .5rem;
                display: inline-block;
                width: 2rem;
            }
        }
        .cropper-crop-box{
            pointer-events: none;
        }
        .vue-cropper{
            position: fixed;
            top: 0;
        }
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
    }
</style>
