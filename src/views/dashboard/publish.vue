<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <div class="progress">
        <div class="progress-percentage">
          <el-progress :percentage="2" :show-text="false"></el-progress>
        </div>
        <div class="progress-quota">
          <p><span>2</span>/<span>1000</span>空间使用限额</p>
        </div>
      </div>
      <div class="estimate">
        <h1 class="estimate-title">发布NFT到Flow</h1>
        <p class="estimate-tips">
          将图片发布为NFT，暂存合约中，可随时转移到自己的Flow钱包。
        </p>
        <div class="main">
          <el-form ref="form" label-width="0px">
            <div class="el-column-row">
              <el-form-item label="NFT标题">
                <span slot="label">
                  NFT物品标题
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="NFT物品的标题"
                    placement="top-start"
                  >
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <el-input
                  v-model="img_info.title"
                  size="small"
                  style="width: 410px; margin-right: 15px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="el-column-row">
              <el-form-item label="NFT物品描述">
                <span slot="label">
                  NFT物品描述
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="NFT物品的描述信息"
                    placement="top-start"
                  >
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <el-input
                  v-model="img_info.description"
                  size="small"
                  style="width: 410px; margin-right: 15px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="el-column-row">
              <el-form-item label="NFT CID">
                <span slot="label">
                  NFT CID
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="NFT物品存储在IPFS上的CID"
                    placement="top-start"
                  >
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <el-input
                  v-model="img_info.cid"
                  size="small"
                  style="width: 410px; margin-right: 15px"
                ></el-input>
              </el-form-item>
            </div>


            <div class="eDTOHJ">
              <el-button type="primary" size="mini" class="reset"
                         @click="publish_nft()">发布NFT</el-button
              >
            </div>
          </el-form>
          <div style="margin-left: 50px">
            <el-image
              style="width: 260px; height: 260px"
              :src="img_info.ipfs"
              fit="fill"></el-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get_user_file } from '@/api/file'
import { publish_nft } from '@/api/nft'

export default {
  name: "publish",
  data() {
    return {
      account:"",//email账号
      token:"", //验证token
      img_id:"",
      img_info:{},//文件信息
    };
  },
  created() {
    this.img_id = this.$route.query.img_id
    console.log(this.img_id)
    this.get_user_info()//获得用户信息
    this.get_user_file()//获得用户文件
  },
  methods: {
    //获得用户本地信息
    get_user_info() {
      var account = localStorage.getItem('account');
      var token = localStorage.getItem('token');
      this.account = account;
      this.token = token;

      if(token==null) {
        this.$router.push('/login')
      }
    },

    get_user_file() {
      get_user_file({email:this.account, token:this.token, id:this.img_id}).then(response => {
        this.img_info = response.results[0]
      })
    },

    publish_nft() {
      let img = this.img_info
      img.email = this.account
      img.token = this.token
      img.image_id = this.img_id

      publish_nft(img).then(response => {
        console.log("publish", response)
        this.$message('NFT发布成功，等待同步到Flow链上');
        this.$router.push({path:'/nft/nft'})
      })
    },

    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  overflow: hidden;
  .progress {
    width: 100%;
    overflow: hidden;
    &-percentage {
      width: 30%;
      float: right;
    }
    &-quota {
      clear: both;
      float: right;
      color: #9b9b9b;
      font-size: 13px;
    }
  }
  .estimate {
    margin-top: 50px;
    &-title {
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      color: rgb(34, 34, 34);
      letter-spacing: 0px;
      margin-bottom: 7px;
      font-size: 48px !important;
      font-weight: 600 !important;
      text-align: center;
    }
    &-tips {
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      color: rgb(34, 34, 34);
      line-height: 20px;
      max-width: 654px;
      margin: 0px auto;
      font-size: 12px !important;
      font-weight: normal !important;
      text-align: center;
    }
    .main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border: 1px solid rgb(207, 216, 220);
      background-color: rgb(255, 255, 255);
      margin: 36px auto 0px;
      // text-align: center;
      max-width: 1084px;
      .el-column-row {
        width: 100%;
        display: grid;
        // gap: 20px;
        border-right: 1px solid rgb(207, 216, 220);
      }
      .el-label {
        display: flex;
        margin-bottom: 5px;
      }
      ::v-deep .el-form-item__label {
        // clear: both;
        float: inherit;
        text-align: left !important;
        line-height: 20px;
      }
      ::v-deep .el-form-item {
        margin-bottom: 15px !important;
      }
      .eDTOHJ {
        display: flex;
        -webkit-box-pack: end;
        justify-content: flex-end;
        max-width: 396px;
        margin-top: 12px;
      }

      .bEkDL {
        width: 396px;
        height: 396px;
        box-shadow: rgb(34 34 34 / 10%) 0px 0px 5px 2px;
        border-radius: 16px;
        margin-bottom: auto;
        margin-left: auto;
        .gKVrHm {
          font-weight: 600;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.11;
          letter-spacing: normal;
          color: rgb(34, 34, 34);
          margin-top: 72px;
          margin-bottom: 22px;
          font-size: 18px !important;
          text-align: center;
        }
        .jIANYZ {
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -1.5px;
          color: rgb(34, 34, 34);
          margin: 0px;
          font-size: 48px !important;
          font-weight: 600 !important;
          text-align: center;
        }
      }
    }
  }
}

@media only screen and (min-width: 940px) and (max-width: 1200px) {
  .main {
    padding: 30px 40px !important;
  }
}
@media only screen and (min-width: 1200px) {
  .main {
    padding: 40px 100px !important;
  }
}
</style>
