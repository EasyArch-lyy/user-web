<template>
  <div class="good-cageory">
    <div style="">
      <div class="good-image">
        <a @click="openCage(msg.id)">
          <img v-lazy="msg.icon" :alt="msg.name" :key="msg.icon">
        </a>
      </div>
      <h6 class="cageory-title" v-html="msg.name">{{msg.name}}</h6>
      <h3 class="sub-title" ellipsis>{{msg.keywords}}</h3>
      <div class="details">
        <div class="ds pa">
          <a @click="openDetail(msg.id)">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from './YButton'
  export default {
    data () {
      return {}
    },
    components: {YButton},
    methods: {
      // 查看商品分类详情
      openDetail (id) {
        window.open('//' + window.location.host + '/#/cageoryDetails?cageoryId=' + id)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-cageory {
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
    .cageory-title {
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
