<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.name}}</div>
            <div class="province">{{item.province}}</div>
            <div class="city">{{item.city}}</div>
            <div class="region">{{item.region}}</div>
            <div class="address-msg">{{item.detailAddress}}</div>
            <div class="telephone">{{item.phoneNumber}}</div>
<!--            <div class="defalut">-->
<!--              <a @click="changeDef(item)"-->
<!--                 href="javascript:;"-->
<!--                 v-text="item.defaultStatus===1 ?'( 默认地址 )':'设为默认'"-->
<!--                 :class="{'defalut-address':item.defaultStatus}"></a>-->
<!--            </div>-->
            <div class="operation">
              <el-button type="primary" icon="edit" size="small"  @click="update(item)"></el-button>
              <el-button type="danger" icon="delete" size="small" :data-id="item.id" @click="del(item.id,i)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.id">
        <div>
          <input type="text" placeholder="收货人姓名" v-model="msg.name">
        </div>
        <div>
          <input type="number" placeholder="手机号码" v-model="msg.phoneNumber">
        </div>
        <div>
          <input type="text" placeholder="省份" v-model="msg.province">
        </div>
        <div>
          <input type="text" placeholder="城市" v-model="msg.city">
        </div>
        <div>
          <input type="text" placeholder="县/区" v-model="msg.region">
        </div>
        <div>
          <input type="text" placeholder="收货地址" v-model="msg.detailAddress">
        </div>
        <div>
          <el-checkbox class="auto-login" v-model="msg.defaultStatus">设为默认</el-checkbox>
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({memberId:userId,id:msg.addressId,name:msg.name,phoneNumber:msg.phoneNumber,detailAddress:msg.detailAddress,defaultStatus:msg.defaultStatus})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { getReceiveAddress, addReceiveAddress, deleteReceiveAddress } from '/api/user'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        // 收货地址参数
        msg: {
          id: '',
          memberId: '',
          name: '',
          phoneNumber: '',
          postCode: '',
          province: '',
          city: '',
          region: '',
          detailAddress: '',
          defaultStatus: false
        },
        userId: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.name && msg.phoneNumber && msg.detailAddress
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      _addressList () {
        getReceiveAddress().then(res => {
          let data = res.data
          if (data.length) {
            this.addList = res.data
            // this.addressId = res.result[0].addressId || '1'
          } else {
            this.addList = []
          }
        })
      },
      // _addressUpdate (params) {
      //   addressUpdate(params).then(res => {
      //     this._addressList()
      //   })
      // },
      _addressAdd (params) {
        addReceiveAddress(params).then(res => {
          if (res.success === true) {
            this._addressList()
          } else {
            this.message(res.message)
          }
        })
      },
      // changeDef (item) {
      //   if (!item.defaultStatus) {
      //     item.defaultStatus = 1
      //     this._addressUpdate(item)
      //   }
      //   return false
      // },
      // 保存
      save (p) {
        this.popupOpen = false
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
      },
      // 删除
      del (addressId, i) {
        deleteReceiveAddress({id: addressId}).then(res => {
          if (res.code === 200) {
            this.addList.splice(i, 1)
          } else {
            this.message('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.name = item.name
          this.msg.phoneNumber = item.phoneNumber
          this.msg.detailAddress = item.detailAddress
          this.msg.defaultStatus = item.defaultStatus
          this.msg.id = item.id
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.name = ''
          this.msg.phoneNumber = ''
          this.msg.detailAddress = ''
          this.msg.defaultStatus = false
          this.msg.id = ''
        }
      }
    },
    created () {
      this.userId = getStore('userId')
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    .name {
      float: left;
      text-align: left;
    }
    span {
      width: 137px;
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      margin-left: 115px;
    }
    .tel {
      margin-left: 195px;
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
