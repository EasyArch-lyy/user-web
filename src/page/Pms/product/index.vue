<template>
<!--  <y-header></y-header>-->
<!--商品分类界面：选择类型进入访问类型下商品列表  -->
  <div class="goods">
    <div class="nav">
    </div>
    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <!--遍历商品类型-->
      <div v-for="(item, i) in categoryKind">
        <!--获取最上层父级类型-->
        <div v-if="item.parent_id == 0">

        </div>
        <div v-else>
          <div></div>
        </div>
<!-- <div class="img-item" v-if="!noResult">
          <div class="goods-box w">
            <cageory v-for="(itemm, j) in item.children" :key="j" :msg="itemm"></cageory>
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
        </div>       -->
      </div>
      <div class="no-info" v-if="noResult">
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> 抱歉！暂时还没有商品
        </div>
      </div>
      <div class="no-data" v-if="error">
        <img src="static/images/error.png">
        <br> 抱歉！ 出错了...
      </div>
    </div>
  </div>
</template>

<script>
  import mallGoods from '/components/mallGoods'
  import cageory from '/components/cageory'
  import { categoryTreeList } from '/api/product'
  import YButton from '../../../components/YButton'
  import YShelf from '/components/shelf'
  import YHeader from '/common/header'
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
        loading: true,
        error: true
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
    components: {YButton, mallGoods, YShelf, YHeader, cageory}
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
