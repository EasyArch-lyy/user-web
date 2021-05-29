<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <a @click="openProduct(msg.id)">
          <img v-lazy="msg.pic" :alt="msg.name" :key="msg.pic">
        </a>
      </div>
      <h6 class="good-title" v-html="msg.name">{{msg.name}}</h6>
      <h3 class="sub-title ellipsis">{{msg.subTitle}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <a @click="openProduct(msg.productCategoryId)">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </a>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(msg)"
                    classStyle="main-btn">
          </y-button>
        </div>
        <p><span style="font-size:14px">￥</span>{{Number(msg.price).toFixed(2)}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { addCart } from '/api/cart'
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from '/utils/storage'
  export default {
    props: {
      msg: {
        salePrice: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      goodsDetails (id) {
        this.$router.push({path: 'goodsDetails/productId=' + id})
      },
      openProduct (id) {
        window.open('//' + window.location.host + '/#/goodsDetails?productId=' + id)
      },
      addCart (msg) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            /**
             *   private Long id;
             private Long productSkuId;
             @ApiModelProperty(value = "购买数量")
             private Integer quantity;
             @ApiModelProperty(value = "添加到购物车的价格")
             private BigDecimal price;
             @ApiModelProperty(value = "商品主图")
             private String productPic;
             @ApiModelProperty(value = "商品名称")
             private String productName;
             @ApiModelProperty(value = "商品副标题（卖点）")
             private String productSubTitle;
             @ApiModelProperty(value = "商品sku条码")
             private String productSkuCode;
             @ApiModelProperty(value = "会员昵称")
             private String memberNickname;
             @ApiModelProperty(value = "创建时间")
             private Date createDate;
             @ApiModelProperty(value = "修改时间")
             private Date modifyDate;
             @ApiModelProperty(value = "是否删除")
             private Integer deleteStatus;
             @ApiModelProperty(value = "商品分类")
             private Long productCategoryId;
             private String productBrand;
             private String productSn;
             @ApiModelProperty(value = "商品销售属性:[{'key':'颜色','value':'颜色'},{'key':'容量','value':'4G'}]")
             private String productAttr;
             * */
            addCart({productId: msg.id, memberId: getStore('userId'), productNum: 1}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({productId: msg.id, salePrice: msg.price, productName: msg.name, productPic: msg.pic})
            })
          } else { // 未登录 vuex
            this.ADD_CART({productId: msg.id, salePrice: msg.price, productName: msg.name, productPic: msg.pic})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: msg.pic})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>
