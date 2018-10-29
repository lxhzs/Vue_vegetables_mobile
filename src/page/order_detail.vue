<template>
	<div class="main confirm-order">
		<group class="confirm-top">
		    <cell-box is-link>
		        <div class="inside-choose-address clear">
		        	<img src="../image/address1.png" alt="">
		        	<div class="address-midd">
		        		<p class="address-name text-ellipsis"><span>{{order.address.receiver}}</span>{{order.address.user_phone}}</p>
		        		<p class="address-txt text-ellipsis">{{order.address.user_address}}</p>
		        	</div>
		        </div>
		    </cell-box>
	      	<cell-box>
		        <div class="confirm-goods-box">
					<div class="cart-item-inside clear" v-for="(item,idx) in order.carts" :key="idx">
		              <div class="goods-img" v-if='item.product[0]' :style="{backgroundImage:'url('+ item.product[0].image +')'}"></div>
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
	      	<cell-box style="display: block;">
	        	<div class="order-detail-info"><span>订单编号：</span><p>{{order.order_no}}</p></div>
	        	<div class="order-detail-info"><span>下单时间：</span><p>{{order.created_at}}</p></div>
	        	<div class="order-detail-info"><span>买家留言：</span><p>{{order.remark}}</p></div>
	      	</cell-box>
	      	<cell-box style="padding: 0.12rem 0.19rem;display: block">
	      		<div class="order-detail-pay">
	      			<p class="discount">{{order.coupon.coupon.name}}</p>
	      			<p class="realpay">实付：{{order.total_amount}}元</p>
	      		</div>
	      	</cell-box>
	    </group>
	</div>
</template>

<script>
	import {Group, CellBox, Cell, Actionsheet} from 'vux'
	import $ from '../common';
	export default {
		name:'order_detail',
		components: {
			Group,
			CellBox,
			Cell
		},
		metaInfo: {
		    title: '订单详情'
		},
		data(){
			return{
				id:'',
				order:{
		            'id': 5,
		            'order_no': '456',
		            'address': {
		                'id': 2,
		                'receiver': '小胖',
		                'receiver_phone': '12345678911',
		                'receiver_address': '江苏省苏州市'
		            },
		            'carts': [
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
		                },
		                {
		                    'id': 2,
		                    'price': '100.02',
		                    'count': 5,
		                    'product': {
		                        'id': 3,
		                        'name': '里脊肉',
		                        'product_images': []
		                    }
		                },
		                {
		                    'id': 1,
		                    'price': '100.01',
		                    'count': 3,
		                    'product': {
		                        'id': 1,
		                        'name': '蛤蜊',
		                        'product_images': []
		                    }
		                }
		            ],
		            'coupon': {
		                'id': 1,
		                'coupon': {
		                    'type': '折扣券',
		                    'name': '折扣券满88打折'
		                }
		            },
		            'total_amount': '100.35',
		            'remark': '555',
		            'order_status': '代配送',
		            'created_at': '2017-12-06T15:35:43.553000+08:00'
		        }
			}
		},
		mounted:function(){
			this.id = this.$route.query.id
			this.getDetail()
		},
		methods:{
			getDetail () {
				var self=this;
		        $.ajax({
		          url: '/api/v1/orders/'+self.id,
		          Authorization:true,
		          success: function (res) {
		            self.order=res.data.orders;
		          },
		          error: function (argument) {
		          }
		        })
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
		margin-bottom: .23rem;
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
	}
	.order-detail-info{
		width: 100%;
		box-sizing: border-box;
		padding-left: .2rem;
		line-height: .33rem;
		font-size: .24rem;
		color: #9b9b9b;
		letter-spacing: .01rem;
		span{
			display: inline-block;
			vertical-align: top;
		}
		p{
			width: 5rem;
			display: inline-block;
		}
	}
	.order-detail-pay{
		width: 100%;
		text-align: right;
		.discount{
			font-size: .24rem;
			color: #9b9b9b;
			line-height: .33rem;
		}
		.realpay{
			font-size: .28rem;
			color: #000;
			line-height: .4rem;
		}
	}
}
</style>