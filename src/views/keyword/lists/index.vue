<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <el-card>
        <div class="title">
          <h3>关键词列表</h3>
          <div class="title-search">
            <el-input
              placeholder="请输入内容"
              v-model="input3"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

          <div class="progress">
            <!-- <div class="progress-percentage">
              <el-progress :percentage="2" :show-text="false"></el-progress>
            </div>
            <div class="progress-quota">
              <p><span>2</span>/<span>1000</span>已跟踪</p>
            </div> -->
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <div class="addButton">
          <el-button type="primary" size="small">添加关键词</el-button>
        </div>
        <div class="content">
          <!-- <div class="content-button">
          <el-button type="primary" size="small" plain icon="el-icon-search"
            >筛选列</el-button
          >
        </div> -->
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
                label="组名"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.account_id
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均售价"
                width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.account_name
                }}</template>
              </el-table-column>

              <el-table-column
                prop="rank"
                label="平均费用"
                width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.media_id }}</template>
              </el-table-column>

              <el-table-column
                prop="rank"
                label="平均毛利润"
                width="90"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.post_url }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均日销量"
                width="90"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.video_view_count | tranNumber
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均日收入"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.media_tag
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均日排名"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.text }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="评论数"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.like_count | tranNumber
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均星级"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.comment_count | tranNumber
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均产品尺寸分段"
                width="130"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.comment_count | tranNumber
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均产品重量"
                width="100"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.comment_count | tranNumber
                }}</template>
              </el-table-column>
              <el-table-column
                prop="rank"
                label="平均Listing质量分数"
                width="150"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{
                  scope.row.comment_count | tranNumber
                }}</template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <el-pagination
              style="padding: 20px 0; float: right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="enquiryFrom.page"
              :page-sizes="[10, 20, 50, 100, 300]"
              :page-size="enquiryFrom.rows"
              layout="total,prev, pager, next, sizes, jumper"
              :total="listTotal"
            ></el-pagination> -->
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      mediaList: [],
    };
  },
  methods: {},
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

  .content {
    background: white;
    margin-top: 20px;
    &-button {
      padding: 20px;
      // float: right;
      text-align: right;
    }
    &-table {
      .el-table {
        tr {
          td {
            // max-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              cursor: pointer;
              // font-size: 12px;
              padding: 0 10px;
              // border-right: 1px solid #aaa;
            }
            span:nth-child(1) {
              padding-left: 0;
            }
            span:last-child {
              border: none;
            }
          }
        }
        .cell {
          .el-button--text {
            padding: 0 !important;
            height: 24px;
            line-height: 22px;
            font-size: 12px;
          }
        }
      }
      .el-pagination ::v-deep .el-select {
        width: 90px !important;
      }
    }
  }
}

::v-deep .el-table th,
::v-deep .el-table td {
  padding: 0;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #333;
}
</style>
