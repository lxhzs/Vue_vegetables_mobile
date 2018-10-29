<template>
	<div class="main confirm-order">
		<group class="confirm-top">
			<cell-box>
	        	地址选择
	      	</cell-box>
		    <cell-box is-link :link="'/address?type=choose'">
		        <div class="inside-choose-address clear">
		        	<img src="../image/address1.png" alt="">
		        	<div class="address-midd">
		        		<p class="address-name text-ellipsis"><span>{{ order.address.receiver }}</span>{{ order.address.receiver_phone }}</p>
		        		<p class="address-txt text-ellipsis">{{ order.address.receiver_address }}</p>
		        	</div>
		        </div>
		    </cell-box>
		    <cell-box>
	        	货品清单
	      	</cell-box>
	      	<cell-box>
		        <div class="confirm-goods-box">
					<div class="cart-item-inside clear" v-for="(item,idx) in order.carts" :key="idx">
		              <div class="goods-img" v-if="item.product.product_images.length" :style="{backgroundImage:'url('+ item.product.product_images[0].image +')'}"></div>
		              <div class="cart-text-midd">
		                <p class="text-ellipsis">{{item.product.name}}</p>
		                <span>￥ {{item.price}}</span>
		              </div>
		              <div class="editandnum">
		                <span>×{{item.count}}</span>
		              </div>
		            </div>
		        </div>
		    </cell-box>
	    </group>
	    <group class="confirm-bottom">
	    	<cell title="店铺优惠" value="" is-link link='/coupon_choose'></cell>
	    	<cell-box>
	    		<div class="payway-box clear" @click="choosePayWay">
	    			<span>支付选择</span><p class="payway">{{ pay_wey }}</p>
	    		</div>
	      	</cell-box>
	      	<cell-box>
	        	<span style="width: 1.8rem;">买家留言：</span><router-link to='/buyer_remind' class="buyer-remind text-ellipsis">{{ order.remark || '取货时间，要求等...' }}</router-link>
	      	</cell-box>
	    </group>
	    <div class='payth-is-order'>
	    	<div class='shoud-pay'>
	    		应付金额：￥{{ order.real_pay }}
	    	</div>
	    	<div class='submit-btn' @click="submitOrder()">提交订单</div>
	    </div>
	    <actionsheet v-model="show" :menus="menus" @on-click-menu="choosePayWayClick" show-cancel></actionsheet>
	</div>
</template>

<script>
import $ from '../common';
import store from '../store';
import {Group, CellBox, Cell, Actionsheet } from 'vux'

export default {
	name:'confirm_order',
	components: {
		Group,
		CellBox,
		Cell,
		Actionsheet
	},
	metaInfo: {
	    title: '确认订单'
	},
	data(){
		return{
			pay_wey: '微信支付',
		    show: false,
		    menus: [{
		        label: '微信支付',
		        value: 1
		    },{
		        label: '支付宝支付',
		        value: 2
		    }],
		    order: {
		        'remark': '',
		        'trade_types': [
		            {
		                'id': 1,
		                'name': '支付宝支付'
		            },
		            {
		                'id': 2,
		                'name': '微信支付'
		            }
		        ],
		        'carts': [
		            {
		                'id': 1,
		                'price': '100.01',
		                'count': 3,
		                'product': {
		                    'id': 1,
		                    'name': '蛤蜊',
		                    'product_images': []
		                }
		            },
		            {
		                'id': 3,
		                'price': '100.03',
		                'count': 6,
		                'product': {
		                    'id': 4,
		                    'name': '海贝',
		                    'product_images': [
		                        {
		                            'id': 1,
		                            'image': '/media/product/1.png'
		                        },
		                        {
		                            'id': 2,
		                            'image': '/media/product/12x.png'
		                        },
		                        {
		                            'id': 3,
		                            'image': '/media/product/13x.png'
		                        }
		                    ]
		                }
		            }
		        ],
		        'coupon': [
		            {
		                'id': 1,
		                'coupon': {
		                    'type': '折扣券',
		                    'limit': 88,
		                    'discount': '9.0',
		                    'deadline': '2017-12-31'
		                }
		            },
		            {
		                'id': 2,
		                'coupon': {
		                    'type': '优惠券',
		                    'limit': 90,
		                    'discount': '10.0',
		                    'deadline': '2017-12-06'
		                }
		            },
		            {
		                'id': 3,
		                'coupon': {
		                    'type': '现金券',
		                    'limit': 0,
		                    'discount': '9.0',
		                    'deadline': '2017-12-07'
		                }
		            }
		        ],
		        'address': {
		            'id': 1,
		            'receiver': '小王',
		            'receiver_phone': '12345678900',
		            'receiver_address': '江苏省无锡市'
		        },
		        'real_pay': 900.21
		    }
		}
	},
	mounted () {
		var carts = store.ids.split(',');
		var ids = [];
		for (var i = 0; i <= carts.length; i++) {
			ids.push({ id: carts[i] })
		}
		this.order.remark = store.remark;
		this.getOrders(ids)
	},
	methods:{
		getOrders (ids) {
			var self = this;
            $.ajax({
                url: '/api/v1/orders/check',
                method: 'post',
                Authorization: true,
                data: {
                	address: store.address,
                	coupon: store.coupon,
                    carts: ids,
                },
                success: function (res) {
                    store.coupons = res.data.coupon;
                    for(var i=0; i<res.data.trade_types.length; i++){
                    	self.menus[i].label = res.data.trade_types[i].name;
                    	self.menus[i].value = res.data.trade_types[i].id;
                    }
                },
                error: function (err) {
                    self.$vux.toast.text('获取订单失败,请重试！', 'middle');
                }
            })
		},
		choosePayWay(){
			this.show = !this.show
		},
		choosePayWayClick (key, value) {
			this.pay_wey = value.label;
			if(value.label == '微信支付'){

			}
	    	console.log(key,value)
	    },
	    submitOrder(){
	    	this.$router.push('/my_order')
	    }
	}
}
</script>

<style lang="less">
.confirm-order{
	padding-bottom: 1.2rem;
	.weui-cells.vux-no-group-title{
		margin-top: 0;	
		margin-bottom: .05rem;
		&:after{
			content: '';
			height: 0;
			background: none;
			border: 0;
		}
	}
	.weui-cell{
		padding: .19rem;
		font-size: .34rem;
		color:#000;
		line-height: .48rem; 
		&:before{
			content: '';
			height: 0;
			background: none;
			border: 0;
		}
	}
	.vux-label{
		font-size: .34rem;
	}
	.weui-cell__ft{
		font-size: .34rem;
	}
	.confirm-top{
		.weui-cell{
			border-bottom: 1px solid #e8e8e8;
		}
	}
	.inside-choose-address{
		width: 92%;
		padding-right: 8%;
		height: 100%;
		img{
			float: left;
			width: .28rem;
			margin-right: .28rem;
			margin-top: .3rem;
		}
		.address-midd{
			float: left;
			width: 5.72rem;
		}
		.address-name{
			font-size: 34px;
			color: #888888;
			font-size: .28rem;
			span{
				font-size: .34rem;
				color: #000;
				margin-right: .4rem;
			}
		}
		.address-txt{
			font-size: .28rem;
			color: #888;
		}
	}
	.confirm-goods-box{
		width: 100%;
	}
	.cart-item-inside{
	    position: relative;
	    width: 100%;
	    height: 100%;
	    background: #fff;
	    // border-radius: 6px;
	    padding-bottom: .2rem;
	    border-bottom: 1px solid #eee;
	    &:last-child{
	    	border: 0;
	    }
	  }
	  .goods-img{
	    width: 2.16rem;
	    height: 1.41rem;
	    float: left;
	    margin: .29rem .16rem 0 .03rem;
	    -webkit-background-size: 100% auto;
	    background-size: 100% auto;
	    background-position: center center;
	  }
	  .cart-text-midd{
	    float: left;
	    width: 2.6rem;
	    padding-top: .46rem;
	  }
	  .cart-text-midd p{
	    font-size: .28rem;
	    color: #4a4a4a;
	    line-height: .4rem;
	  }
	  .cart-text-midd span{
	    display: inline-block;
	    margin-top: .42rem;
	    font-size: .32rem;
	    color: #d52405;
	    line-height: .45rem;
	  }
	  .editandnum{
	    float: right;
	    padding-top: .85rem;
	    padding-right: .6rem;
	    text-align: center;
	  }
	  .editandnum span{
	    font-size: .32rem;
	    color: #312e2e;
	  }
	 .confirm-bottom{
	 	.weui-cell{
			border-bottom: 1px solid #e8e8e8;
		}
		.payway-box{
			width: 100%;
			span{
				font-size: .34rem;
			}
		}
		.payway{
			display: inline-block;
			font-size: .36rem;
			color: #4a4a4a;
			float: right;
			text-align: right;
		}
		.buyer-remind{
		    width: 5rem;
			font-size: .34rem;
			color: #9b9b9b;
		}
	 }
	 .payth-is-order{
	 	position: fixed;
	 	left: 0;
	 	bottom: 0;
	 	line-height: 1.1rem;
	 	height: 1.1rem;
	 	background: #fff;
	 	width: 100%;
	 	border-top: 1px solid #e8e8e8;
	 	border-bottom: 0;
		.shoud-pay{
			float: left;
			text-align: center;
			width: 60%;
			font-size: .34rem;
			color: #000;
		}
		.submit-btn{
			float: left;
			width: 40%;
			text-align: center;
			background: #5dc56e;
			font-size: .34rem;
			color: #fff;
			height: 100%;
			&:active{
				background: #43a453;
			}
		}
	 }
}
</style>