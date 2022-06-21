<template>
  <div class="content-wrapper el-col el-col-24">
    <div class="router-content">
      <div class="cable-shop">
        <el-card shadow="always">
          <el-tabs v-model="activeName">
            <el-tab-pane label="选品数据库" name="0">

              <div class="aa-top el-row" >
                <div class="el-col el-col-1" style="padding:6px 0px">分类：</div>
                <div class="content el-col el-col-22">
                  <div v-for="(item, index) in goods_category" :key="index" class="classBtn" :class="{ selected: params.params_data.classification === item.category }" @click="sifting(item.category)">
                    {{ item.category }}
                  </div>
                </div>
              </div>

              <div class="aa-top el-row">
                <div class="el-col el-col-1">选择：</div>
                <div class="content el-col el-col-22">

                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="标准尺寸"></el-checkbox>
                    <el-checkbox label="特大尺寸"></el-checkbox>
                    <el-checkbox label="Amazon"></el-checkbox>
                    <el-checkbox label="FBA" ></el-checkbox>
                    <el-checkbox label="FBM" ></el-checkbox>
                  </el-checkbox-group>

                </div>
              </div>

              <div class="aa-top el-row">
                <div class="el-col el-col-1" style="padding:10px 0px">筛选：</div>
                <div class="content el-col el-col-22">

                  <div class="demo-input-size">
                    <el-input
                      placeholder="最低价"
                      v-model="input1">
                    </el-input>
                    <span class="el-icon-right" style="padding-top: 13px; padding-right: 1px"></span>
                    <el-input
                      placeholder="最高价"
                      v-model="input2">
                    </el-input>
                    <el-input
                      placeholder="最低星级"
                      v-model="input3">
                    </el-input>
                    <span class="el-icon-right" style="padding-top: 13px; padding-right: 1px"></span>
                    <el-input
                      placeholder="最高星级"
                      v-model="input4">
                    </el-input>

                    <el-input
                      placeholder="最低销量"
                      v-model="input3">
                    </el-input>
                    <span class="el-icon-right" style="padding-top: 13px; padding-right: 1px"></span>
                    <el-input
                      placeholder="最高销量"
                      v-model="input4">
                    </el-input>

                    <el-input
                      placeholder="最低收入"
                      v-model="input3">
                    </el-input>
                    <span class="el-icon-right" style="padding-top: 13px; padding-right: 1px"></span>
                    <el-input
                      placeholder="最高收入"
                      v-model="input4">
                    </el-input>



                  </div>

                </div>
              </div>

              <div class="shop-table el-row" style="margin-top: 10px">
                <div class="el-col el-col-24">
                  <el-table
                    :data="tableData"
                    v-loading="loading"
                    @sort-change="process_order"
                    :default-sort = "{prop: 'estimated_sales', order: 'descending'}"
                  >
                    <el-table-column label="名称" min-width="260" prop="title">
                      <template slot-scope="scope">
                        <div style="display: flex; align-items: center; cursor: pointer">
                          <div>
                            <img :src="scope.row.pic_url" class="shopImg">
                          </div>

                          <el-tooltip class="shopTitle titletwo item" effect="dark" :content="scope.row.title" placement="bottom-end">
                            <span>{{ scope.row.title }}</span>
                          </el-tooltip>

                          <el-link :underline="false" :href="scope.row.detail_url" target="_blank">
                            <i class="el-icon-shopping-bag-1" style="padding-left: 14px;"></i>
                          </el-link>

                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column label="类目" width="160" prop="category" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.category }}</span>
                      </template>
                    </el-table-column>


                    <el-table-column label="月收入" width="120" prop="est_revenue" align="center" sortable="custom">
                      <template slot-scope="scope">
                        <span>{{ scope.row.est_revenue|tranNumber }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="月销量" width="120" prop="estimated_sales" align="center" sortable="custom">
                      <template slot-scope="scope">
                        <span>{{ scope.row.estimated_sales|tranNumber }}</span>
                      </template>
                    </el-table-column>


                    <el-table-column label="价格|费用" width="140" prop="price" align="center" sortable="custom">
                      <template slot-scope="scope">
                        <span>${{ scope.row.price }}|${{scope.row.fees}}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="排名" width="100" prop="rank" align="center" sortable="custom">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rank }}</span>
                      </template>
                    </el-table-column>


                    <el-table-column label="星级" width="160" prop="star" align="center">
                      <template slot-scope="scope">
                        <el-rate
                          v-model="scope.row.star|parseFloat"
                          disabled
                          show-score
                          text-color="#ff9900"
                        >
                        </el-rate>

                      </template>
                    </el-table-column>
                    <el-table-column label="评论数" width="120" prop="star_num" align="center" sortable="custom">
                      <template slot-scope="scope">
                        <span>{{ scope.row.star_num|tranNumber }}</span>
                      </template>
                    </el-table-column>


                    <el-table-column label="上架时间" width="120" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.delist_time }}</span>
                        <!--                <el-button type="primary" @click="details(scope.row.detail_url)"> 详情 </el-button>-->
                      </template>
                    </el-table-column>

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
import { get_category_goods_rank, get_goods_category } from '@/api/goods'
import { get_url_classify } from '@/api/ins'

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
      order:"",//排序顺序
      direct:"",//排序方向
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
      selected: 'Appliances', // 当前选中的标签类别(默认全部)
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
    this.get_category_goods_rank();

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

    //获得商品类别榜单
    get_category_goods_rank() {
      this.loading = true
      this.tableData = []
      get_category_goods_rank({category:this.selected,order:this.order,
        direct:this.direct,
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
      this.get_category_goods_rank()
    },

    //切换类别
    sifting(name) {
      this.start = 0 //翻页初始化
      this.params.params_data.classification = name
      this.selected = name
      this.get_category_goods_rank()
    },
    changeCondition() {
      this.tableData = [[], []]
      this.params.page_no = 1
      this.getGoods()
    },

    details(url) {
      window.open(url, '_blank')
    },

    //排序处理
    process_order({ column, prop, order }) {
      console.log("order:", prop, order )
      this.order = prop;
      this.direct = order;
      this.get_category_goods_rank();
    }
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
