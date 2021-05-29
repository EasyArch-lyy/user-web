<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
      </div>
    </div>
    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <!--遍历商品类型-->
      <div v-for="(item, i) in categoryKind">
        <!--商品  todo 实现折叠展开-->
        <div class="img-item" v-if="!noResult">
          <div class="goods-box w">
            <mall-goods v-for="(itemm, j) in item.children" :key="j" :msg="itemm"></mall-goods>
          </div>
          <el-pagination
            v-if="!noResult&&error"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8,20,40,80]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> 抱歉！暂时还没有商品
        </div>
      </div>
      <div class="no-data">
        <img src="static/images/error.png">
        <br> 抱歉！ 出错了...
      </div>
    </div>
  </div>
</template>
<script>
  import mallGoods from '/components/mallGoods'
  import { categoryTreeList } from '/api/product'
  import YButton from '../../../components/YButton'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        noResult: false,
        // 商品类别
        categoryKind: [],
        category: [],
        min: '',
        max: '',
        timer: null,
        currentPage: 1,
        total: 0,
        pageSize: 20,
        sortType: 1,
        loading: true
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this._getProduct()
        this.loading = true
      },
      _getProduct () {
        categoryTreeList().then(res => {
          if (res.code === 200) {
            this.error = false
            this.categoryKind = res.data
            this.loading = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
        })
      },
      // 价格排序
      sortByPrice (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.sort = v
        this.currentPage = 1
        this.loading = true
        this._getAllGoods()
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this._getAllGoods()
      }
      // _getAllGoods () {
      //   let cid = this.$route.query.cid
      //   if (this.min !== '') {
      //     this.min = Math.floor(this.min)
      //   }
      //   if (this.max !== '') {
      //     this.max = Math.floor(this.max)
      //   }
      //   let params = {
      //     params: {
      //       page: this.currentPage,
      //       size: this.pageSize,
      //       sort: this.sort,
      //       priceGt: this.min,
      //       priceLte: this.max,
      //       cid: cid
      //     }
      //   }
      //   // eslint-disable-next-line no-undef
      //   getAllGoods(params).then(res => {
      //     if (res.success === true) {
      //       this.total = res.result.total
      //       this.goods = res.result.data
      //       this.noResult = false
      //       if (this.total === 0) {
      //         this.noResult = true
      //       }
      //       this.error = false
      //     } else {
      //       this.error = true
      //     }
      //     this.loading = false
      //   })
      // }
    },
    mounted () {
      categoryTreeList().then(res => {
        if (res.code === 200) {
          this.error = false
          this.categoryKind = res.data
          this.loading = false
        }
      })
    },
    components: {YButton, mallGoods, YShelf}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/style/mixin";
  @import "../../../assets/style/theme";

  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }

  .img-item{
    display: flex;
    flex-direction: column;
  }

  .el-pagination{
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }

  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }

  .recommend {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }



</style>
