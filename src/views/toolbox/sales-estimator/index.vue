<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <div class="progress">
        <div class="progress-percentage">
          <el-progress :percentage="2" :show-text="false"></el-progress>
        </div>
        <div class="progress-quota">
          <p><span>2</span>/<span>1000</span>每月搜索限额</p>
        </div>
      </div>
      <div class="estimate">
        <h1 class="estimate-title">亚马逊销量预估</h1>
        <p class="estimate-tips">
          销量预估计算器可以用来查看竞品月销量，验证市场需求。
        </p>
        <div class="main">
          <el-form ref="form" label-width="0px">
            <div class="el-column-row">
              <el-form-item label="亚马逊站点">
                <span slot="label">亚马逊站点
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="选择地区"
                    placement="top-start"
                  > <i class="el-icon-question"></i> </el-tooltip>
                </span>

                <el-select
                  v-model="cc"
                  placeholder="请选择活动区域"
                  size="small"
                  style="width: 395px; margin-right: 15px"
                >
                  <el-option label="美国" value="us"></el-option>
                  <el-option label="其他" value="other"></el-option>
                </el-select>

              </el-form-item>
              <el-form-item label="亚马逊大类">
                <span slot="label"
                  >亚马逊大类
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="1级类别"
                    placement="top-start"
                  >
                    <i class="el-icon-question"></i> </el-tooltip></span>
                <el-select
                  v-model="category"
                  placeholder="请选择活动区域"
                  size="small"
                  style="width: 395px; margin-right: 15px"
                >
                  <el-option
                    v-for="item in goods_category"
                    :key="item.category"
                    :label="item.category"
                    :value="item.category">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="top排名">
                <span slot="label">
                  产品的大类排名
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="前多少名"
                    placement="top-start"
                  >
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <el-input
                  v-model="rank"
                  size="small"
                  style="width: 395px; margin-right: 15px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="eDTOHJ">
              <el-button type="primary" size="mini" class="select"
                @click="clear()">重置</el-button
              >
              <el-button type="primary" size="mini" class="reset"
                @click="predict_sales()">计算月销量</el-button
              >
            </div>
          </el-form>
          <div class="SalesEstimatorValueWrapper-sc-148qs1w-6 bEkDL">
            <h2 class="SalesEstimatorTitle-sc-148qs1w-7 gKVrHm">预估月销量</h2>
            <h3 class="SalesEstimatorCounter-sc-148qs1w-8 jIANYZ">{{value}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get_goods_category } from '@/api/goods'
import { predict_sales, get_listing_level} from '@/api/tools'

export default {
  data() {
    return {
      cc:"美国",
      goods_category:[],
      category:"",
      rank:10,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  created() {
    //获得商品类别列表
    this.get_goods_category();
  },
  methods: {
    //获得商品类别
    get_goods_category() {
      get_goods_category().then(response => {
        this.goods_category = response.results
      })
    },

    //清空数据
    clear() {
      this.category = "";
      this.rank = 10;
    },
    //销量预估
    predict_sales() {
      predict_sales({cc:"us", category:this.category, rank:this.rank}).then(response => {
        this.value = response.results.sales
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
    margin-top: 110px;
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
        height: 220px;
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
