<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <el-card class="elCard">
        <div class="title">
          <h3>商品关键词</h3>
        </div>
        <div class="search">
          <!--          <el-select-->
          <!--            v-model="value"-->
          <!--            placeholder="请选择"-->
          <!--            size="small"-->
          <!--            style="width: 50px"-->
          <!--          >-->
          <!--            <el-option-->
          <!--              v-for="item in options"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            >-->
          <!--            </el-option>-->
          <!--          </el-select>-->
          <el-input
            v-model="input"
            placeholder="请输入商品id(ASIN)，例如 B099HZL93P"
            size="small"
            style="margin: 0 20px"
            @change="get_goods_words()"
          ></el-input>
          <el-button type="primary" size="small" @click="get_goods_words()"
          >搜索</el-button
          >
        </div>
      </el-card>

      <el-card style="margin-top: 20px">
        <div class="content">
          <div class="content-table">
            <el-table
              :data="tableData"
              v-loading="loading"
            >
              <el-table-column label="排名" type="index" align="center" width="90">
              </el-table-column>


              <el-table-column label="关键词" min-width="260">
                <template slot-scope="scope">
                  {{scope.row.word }}
                </template>
              </el-table-column>

              <el-table-column label="搜索量" min-width="260">
                <template slot-scope="scope">
                  {{scope.row.qv }}
                </template>
              </el-table-column>

              <el-table-column label="流行度" min-width="260">
                <template slot-scope="scope">
                  {{scope.row.popularity }}
                </template>
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
import { get_goods_words } from '@/api/word'

export default {
  data() {
    return {
      loading:false,
      input: "",
      value: "",
      tableData:[],
      options: [],
    };
  },
  methods: {
    //关键词搜索
    get_goods_words() {
      this.loading = true
      get_goods_words({goods_id:this.input}).then(response => {
        this.tableData = response.results
        //console.log(this.tableData)
        this.loading = false
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
  overflow: hidden;
  .elCard {
    ::v-deep .el-card__body {
      padding: 0 !important;
    }
    .title {
      border-bottom: 1px solid #cfd8dc;
      padding: 10px 10px 10px 15px;
      h3 {
        margin: 0;
        line-height: 30px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        color: rgb(34, 34, 34);
        letter-spacing: 0px;
        font-size: 18px !important;
      }
    }
    .search {
      padding: 12px 15px;
      display: flex;
    }
  }
}
</style>
