<template>
  <div class="content-wrapper el-col el-col-24">
    <div class="router-content">
      <div class="cable-shop">
        <el-card shadow="always">
          <el-tabs v-model="activeName">
            <el-tab-pane label="类目趋势" name="0">

              <div class="aa-top el-row" >
                <div class="el-col el-col-1" style="padding:6px 0px">分类：</div>
                <div class="content el-col el-col-22">
                  <div v-for="(item, index) in goods_category" :key="index" class="classBtn" :class="{ selected: params.params_data.classification === item.category }" @click="sifting(item.category)">
                    {{ item.category }}
                  </div>
                </div>
              </div>

              <div class="aa-top el-row">
                <div class="el-col el-col-1" style="padding:8px 0px">日期：</div>
                <div class="content el-col el-col-22">

                    <el-date-picker
                      style="width: 300px"
                      v-model="value1"
                      type="date"
                      size="large"
                      placeholder="选择日期">
                    </el-date-picker>

                </div>
              </div>

              <div class="shop-table el-row">
                <div class="el-col el-col-24">
                  <el-table
                    :data="tableData"
                    v-loading="loading"
                  >
                    <el-table-column label="排名" type="index" align="center" width="90">
                      <template slot-scope="scope">
                        <p style="font-weight: bold">{{ scope.row.rank }}</p>
                      </template>
                    </el-table-column>

                    <el-table-column label="名称" min-width="260">
                      <template slot-scope="scope">
                        <div style="display: flex; align-items: center; cursor: pointer">
                          <div>
                            <img :src="scope.row.pic_url" class="shopImg">
                          </div>
                          <el-tooltip class="shopTitle titletwo item" effect="dark" :content="scope.row.title" placement="bottom-end">
                            <el-link :underline="false" :href="scope.row.detail_url" target="_blank">
                              <span>{{ scope.row.title }}</span>
                            </el-link>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="价格" width="120" prop="today_promotion_user_account" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.price }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="星级" width="160" prop="cos_fee_scale" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.star }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="评论数" width="120" prop="conversion_rate" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.star_num }}</span>
                      </template>
                    </el-table-column>
                    <!--
                    <el-table-column label="月销量" width="120" prop="sales" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.sales | tranNumber }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="月销售额" width="120" prop="price" align="center">
                      <template slot-scope="scope">
                        <span>{{ parseInt(scope.row.sales_volume / 100) | tranNumber }}</span>
                      </template>
                    </el-table-column>
                    -->

<!--                    <el-table-column label="操作" width="120" align="center">-->
<!--                      <template slot-scope="scope">-->
<!--                        <el-button type="primary" @click="details(scope.row.detail_url)"> 详情 </el-button>-->
<!--                      </template>-->
<!--                    </el-table-column>-->

                  </el-table>
                </div>
              </div>

              <el-row type="flex" justify="end" style="margin-top: 10px">
              <el-pagination
                style=""
                background
                layout="prev, pager, next"
                @current-change="change_page"
                :total="100">
              </el-pagination>
              </el-row>


            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
// import { daysCondition } from "@/api/prod";
import DateSelectButtons from '@/components/DateSelectButtons.vue'
import { get_best_seller_rank, get_goods_category } from '@/api/goods'

// import moment from "moment";
export default {
  components: {
    DateSelectButtons
  },
  filters: {
    filterStr: function (value) {
      if(value&& value.length > 8) {
        value= value.substring(0,8)+ '.';
      }
      return value;
    },
    tranNumber(num) {
      // 十万以内直接返回，大于6位数是十万 (以10W分割 10W以下全部显示)，大于8位数是亿
      if (num != null) {
        const numStr = num.toString()

        if (numStr.length > 8) {
          // eslint-disable-next-line no-undef
          // let decimal = numStr.substring(numStr.length - 8, 3);
          return parseFloat(num / 100000000).toFixed(1) + '亿'
        } else if (numStr.length > 4) {
          // let decimal = numStr.substring(numStr.length - 4, 3);
          // return parseFloat(parseInt(num / 10000) + "." + decimal) + " w";
          return parseFloat(num / 10000).toFixed(1) + 'w'
        }
        return numStr
      }
    },
    formatPrice(value) {
      // 截取当前数据到小数点后两位
      const realVal = value.toFixed(2)
      return realVal
    }
  },
  data() {
    return {
      loading:false,
      start:0,
      limit:10,
      value1: '',
      checkList: ['选中且禁用','复选框 A'],
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      radio: '1',
      times: '1',
      activeName: '0',
      buttonOptions: [
        // { value: "DAY", label: "日榜" }
        // { value: "WEEK", label: "周榜" }
      ],
      buttonStatus: ['primary', ''],
      optionsCon: [],
      daysOption: [],
      tableURL: ['/tiktok/ranking/tiktok_goods_sales_rank', '/tiktok/ranking/tiktok_goods_rank'],
      tableData: [],
      imgSrc: [
        require('@/assets/images/tb-lo.png'),
        require('@/assets/images/tm-lo.png'),
        require('@/assets/images/jd-lo.png'),
        require('@/assets/images/kl-lo.png'),
        require('@/assets/images/sn-lo.png'),
        require('@/assets/images/fxg-lo.png'),
        require('@/assets/images/vip-lo.png')
      ],
      imgSrcMap: {
        'taobao.com': 0,
        'tmall.com': 1,
        'jd.com': 2,
        'kaola.com': 3,
        'suning.com': 4,
        'jinritemai.com': 5,
        'vip.com': 6
      },
      goods_category: [], // 商品分类标签列表
      selected: 'Appliances', // 当前选中的标签类别(默认Appliances)
      goodsData: [], // 获取一个标签下的商品列表
      stopQuery: false,
      value: '',
      input: '',
      formInline: {
        user: '',
        region: ''
      },
      loadingTb: false,
      params: {
        page_no: 1,
        page_size: 20,
        params_data: {
          age: 'ALL',
          city: '',
          classification: 'Appliances',
          keyword: '',
          period: 'DAY',
          period_value: '20200704',
          sex: 'ALL',
          sub_classification: '',
          price: 'ALL',
          cos_fee_scale: 'ALL',
          has_coupon: '',
          source_type: 'ALL'
        },
        orders: [{ asc: false, column: 'today_product_order_account' }]
      },
      now_day: '',
      start_day: '',
      end_day: ''
    }
  },
  created() {
    //获得商品类别列表
    this.get_goods_category();
    //获得默认的商品榜单
    this.get_best_seller_rank();
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    //获得商品类别
    get_goods_category() {
      get_goods_category().then(response => {
        this.goods_category = this.goods_category.concat(response.results)
        //console.log(this.goods_category)
      })
    },

    //获得bsr
    get_best_seller_rank() {
      this.loading = true
      this.tableData = []
      get_best_seller_rank({category:this.selected,
        start:this.start,limit:this.limit}).then(response => {
        this.tableData = response.results
        //console.log(this.tableData)
        this.loading = false
      })
    },

    //翻页
    change_page(page) {
      //默认一页10个结果。page-size
      this.start = 10*(page-1)
      console.log("翻页", page)
      //获得榜单
      this.get_best_seller_rank()
    },

    sifting(name) {
      this.start = 0 //翻页初始化
      this.params.params_data.classification = name
      this.selected = name
      this.get_best_seller_rank()
    },
    changeCondition() {
      this.tableData = [[], []]
      this.params.page_no = 1
      this.getGoods()
    },

    details(url) {
      window.open(url, '_blank')
    },

  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/dianshang/cable.less';

a:hover {
  text-decoration: none;
}
.el-input {
  width: 100px;
}
.demo-input-size {
  .el-input {
    vertical-align: top;
    margin: 0 10px 10px 0;
  }
}
</style>
<style>

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #ff5e60;
  border-color: #ff5e60;
  -webkit-box-shadow: -1px 0 0 0 #ff5e60;
  box-shadow: -1px 0 0 0 #ff5e60;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover {
  color: #fff !important;
}
.el-radio-button__inner:hover {
  color: #ff5e60 !important;
}
</style>
