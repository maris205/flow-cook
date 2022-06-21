<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <el-card>
        <div class="title">
          <h3>Listing评级器</h3>
          <div class="title-search">
            <el-input
              placeholder="请输入商品id(ASIN),如B00H7G6VCG"
              v-model="input"
              class="input-with-select"
              @change="get_listing_level()"
            >
              <el-select v-model="cc" placeholder="请选择">
                <el-option label="美国" value="美国"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>

              <el-button slot="append" icon="el-icon-search" @click="get_listing_level()"></el-button>
            </el-input>
          </div>

          <div class="progress">
            <div class="progress-percentage">
              <el-progress :percentage="2" :show-text="false"></el-progress>
            </div>
            <div class="progress-quota">
              <p><span>2</span>/<span>1000</span>每月搜索限额</p>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <div class="listing">
          <div class="listing-score">
            <div id="myChart" style="width: 200px; height: 200px"></div>
            <div class="hfApCe">
              <h2 class="jiFbXW">Listing表现</h2>
              <h4 class="eFbJqq">
                我们的Listing评级工具可帮助您评估Listing质量，协助您如何优化Listing，
                并可以直接在Listing生成器中修改。
              </h4>
            </div>
          </div>
          <div class="content-table">
            <el-table
              :fit="true"
              :data="mediaList"
              style="width: 100%"
              :header-cell-style="{
                backgroundColor: '#f0f3f4',
                color: '#222222',
                fontSize: '13px',
                fontWeight: '400',
              }"
            >
              <el-table-column
                prop="rank"
                label="详细信息"
                width="220"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.information
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="当前"
                width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <p v-for="(item, index) in scope.row.current" :key="index">
                    {{ item }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="rank" label="建议" show-overflow-tooltip>
                <template slot-scope="scope">
                  <p
                    v-for="(item, index) in scope.row.proposal"
                    :key="index"
                    style="white-space: pre-wrap"
                  >
                    {{ item }}
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts");
import { predict_sales, get_listing_level} from '@/api/tools'

export default {
  data() {
    return {
      input: "",
      cc: "美国",
      mediaList: [
        {
          information: "产品标题",
          current: ["-"],
          proposal: ["标题需介于100-200个字符之间"],
        },
        {
          information: "产品五点描述",
          current: ["-"],
          proposal: [
            "至少要有五点功能描述",
            "推荐使用100-200个字符来描述每个产品特点（总共约500-1000个字符）",
          ],
        },
        {
          information: "产品描述",
          current: ["-"],
          proposal: ["1000-2000个字符"],
        },
        {
          information: "产品图片",
          current: ["-", "-"],
          proposal: ["至少7张产品图片", "高分辨率图片（不低于1000像素）"],
        },
      ],
      value:0, //评分
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    //list评级
    get_listing_level() {
      get_listing_level({cc:"us", goods_id:this.input}).then(response => {
        this.mediaList = response.results
        this.value =  response.score
        //重置echart
        this.drawLine()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            radius: "100%",
            name: "Pressure",
            type: "gauge",
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
            },
            data: [
              {
                value: this.value,
                name: "SCORE",
              },
            ],
          },
        ],
      });
    },

  },
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
  overflow: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
      line-height: 45px;
      // width: 150px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      color: rgb(34, 34, 34);
      letter-spacing: 0px;
      text-align: center;
      // margin: 0px auto 14px;
      font-size: 18px !important;
    }
    &-search {
      width: 445px;
    }
    .progress {
      width: 260px;
      overflow: hidden;
      margin-top: 10px;
      &-percentage {
        width: 100%;
        float: right;
      }
      &-quota {
        clear: both;
        float: right;
        color: #9b9b9b;
        font-size: 13px;
        margin-top: 10px;
        p {
          margin: 0;
        }
      }
    }
  }

  .listing {
    padding: 45px 52px;
    &-score {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      max-width: 692px;
      margin: 0px auto 25px;
      align-items: normal;
    }
    .hfApCe {
      margin-left: 34px;
      margin-bottom: 15px;
      .jiFbXW {
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.11;
        letter-spacing: normal;
        color: rgb(34, 34, 34);
        margin-top: 0px;
        margin-bottom: 15px;
        font-size: 18px !important;
      }
      .eFbJqq {
        font-style: normal;
        font-stretch: normal;
        line-height: 1.38;
        letter-spacing: normal;
        color: rgb(34, 34, 34);
        margin-top: 0px;
        max-width: 360px;
        font-size: 13px !important;
        font-weight: 500 !important;
      }
    }
  }
  .content-table {
    width: 692px;
    margin: 0px auto;
    border-spacing: 0px;
  }
}
</style>
