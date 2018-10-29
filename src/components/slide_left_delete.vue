<template>
    <div class="left-delete">
        <div class="move"
            @touchstart="_touchStart"
            @touchmove="_touchMove"
            @touchend="_touchEnd"
            :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index)">删<br>除</div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number,
            txtStyle: {
                type: [String,Boolean],
                default: ''
            },
            isPrevent:Boolean
        },
        data() {
            return {
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                delWidth: 180,
                style: '',
                top: '',
                zIndex: 'z-index:-1',
            }
        },
        watch:{
            isPrevent(val){
                if (val) {
                    this.txtStyle = '';
                }
            }
        },
        methods: {
            _touchStart: function(ev) {
                if (this.isPrevent) return;
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    // console.log(this.startX)
                }
            },
            _touchMove: function(ev) {
                if (this.isPrevent) return;
                ev = ev || event;
                if(ev.touches.length == 1) {
                    this.moveX = ev.touches[0].clientX
                    this.disX = this.startX - this.moveX;
                    if(this.disX < 0 || this.disX == 0) {
                        this.txtStyle = "transform:translateX(0)";
                    }else if (this.disX > 20) {
                        this.txtStyle = "transform:translateX(-" + this.disX/100 + "rem)";
                        if (this.disX >= this.delWidth/100) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth/100 + "rem)";
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            _touchEnd: function(ev) {
                if (this.isPrevent) return;
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    let endX = event.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                }
            },
            deleteItem: function(index) {
                if (this.isPrevent) return;
                this.txtStyle = "transform:translateX(0rem)";
                this.$emit('deleteItem', index);
            }
        }
    }
</script>

<style>
    .left-delete{
        width:100%;
        height:100%;
        position:relative;
        z-index:2;
    }
    .move{
        position: relative;
        height: 100%;
        transition: all .3s;
    }
    .deleteIcon{
        width: 1.8rem;
        height:100%;
        position: absolute;
        right:0;
        top:0;
        background-color: #fc5110;
        font-size: .48rem;
        color: #fff;
        padding-top: .6rem;
        box-sizing: border-box;
        text-align: center;
        border-radius: 0 8px 8px 0;
        line-height: .67rem;
    }
</style>