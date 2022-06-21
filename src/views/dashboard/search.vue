<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <el-card style="height: 150px">
        <!-- 搜索框 -->
        <div class="search">
          <el-input
            placeholder="请输入搜索词，或者点击相机图标，选择图片进行搜索"
            v-model="word"
            class="input-with-select"
            @change="search_goods()"
            style="width: 90%; margin-left: 5%"
          >
            <!-- 图片上传 -->
            <el-upload
              class="avatar-uploader search-span"
              action="http://rest.kkyx.shop/image_ai/search_1688_pic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              slot="append"
            >
              <i class="el-icon-camera"></i>
            </el-upload>

            <el-button slot="append" @click="search_goods()">搜索</el-button>
          </el-input>
        </div>
      </el-card>

      <div class="shop-table el-row" style="margin-top: 10px">
        <div class="el-col el-col-24">
          <el-table
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column label="名称" min-width="160">
              <template slot-scope="scope">
                <div style="display: flex; align-items: center; cursor: pointer">
                  <div>
                    <img :src="scope.row.ipfs" class="shopImg">
                  </div>

                  <el-tooltip class="shopTitle titletwo item" effect="dark" :content="scope.row.description" placement="bottom-end">
                    <span>{{ scope.row.title }}</span>
                  </el-tooltip>

                  <el-link :underline="false" :href="scope.row.ipfs" target="_blank">
                    <i class="el-icon-share" style="padding-left: 14px;"></i>
                  </el-link>

                </div>
              </template>
            </el-table-column>

            <el-table-column label="同步状态" min-width="140" prop="cos_fee_scale" align="center">
              <template slot-scope="scope">
                <span v-if="'0'===scope.row.is_sync_flow" style="color:red">未同步</span>
                <span v-else style="color: #00C915">已同步</span>
              </template>
            </el-table-column>


            <el-table-column label="NFT ID" width="120" prop="est_revenue" align="center" sortable :sort-method="sort_est_revenue">
              <template slot-scope="scope">
                <span>{{ scope.row.nft_id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="交易ID" min-width="220" prop="est_revenue" align="center" sortable :sort-method="sort_est_revenue">
              <template slot-scope="scope">
                <span>{{ scope.row.trans_id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="上链时间" width="190" prop="estimated_sales" align="center" sortable :sort-method="sort_estimated_sales">
              <template slot-scope="scope">
                <span>{{ scope.row.sync_flow_time }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="sell(scope.row.nft_id)" :disabled="'1'==scope.row.is_sync_flow && '0'==scope.row.is_sync_market?false:true">售卖NFT </el-button>
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
          :total="file_num">
        </el-pagination>
      </el-row>

    </div>


  </div>
</template>

<script>
import { get_user_nft_list } from '@/api/nft'
import '../../assets/less/dianshang/cable.less';


export default {
  name: "nft",
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
      account:"",//email账号
      token:"", //验证token
      imageUrl: '',
      file_num:0,
      start:0,
      limit:10,
      loading:false,
      upload_loading:false,
      word:"", //搜索词
      input: "",
      tableData:[], //表格数据
    };
  },
  created() {
    this.get_user_info()
    this.get_user_nft_list()
  },
  methods: {
    sort_rank(a,b) {
      return a.rank-b.rank;
    },
    sort_price(a,b) {
      return a.price-b.price;
    },
    sort_estimated_sales(a,b) {
      return a.estimated_sales-b.estimated_sales;
    },
    sort_est_revenue(a,b) {
      return a.est_revenue-b.est_revenue;
    },
    details(url) {
      window.open(url, '_blank')
    },

    get_user_info() {
      var account = localStorage.getItem('account');
      var token = localStorage.getItem('token');
      this.account = account;
      this.token = token;

      if(token==null) {
        this.$router.push('/login')
      }
    },

    get_user_nft_list() {
      this.loading = true
      get_user_nft_list({email:this.account, token:this.token, start:this.start,
        limit:this.limit}).then(response => {
        this.tableData = response.results
        this.file_num = Number(response.num)
        this.loading = false
      })
    },

    //翻页
    change_page(page) {
      //默认一页10个结果。page-size
      this.start = 10*(page-1)
      console.log("翻页", page)
      //获得榜单
      this.get_user_nft_list()
    },

    //关键词搜索
    search_goods() {
      this.loading = true
      search_1688_goods({word:this.word}).then(response => {
        this.tableData = response.results
        //console.log(this.tableData)
        this.loading = false
      })
    },

    //图片上传，然后搜索
    handleAvatarSuccess(res, file) {
      this.loading = false
      this.imageUrl = URL.createObjectURL(file.raw);
      //var url = res.img //图片url
      //console.log(res)
      this.tableData = res.results

      //进行图片搜索
      //this.search_pic(url)
    },
    beforeAvatarUpload(file) {
      this.loading = true
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //售卖
    sell(nft_id) {
      this.$message('暂不支持售卖,敬请期待');
    }

  },
};
</script>

<style lang="scss" scoped>

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


.app-container {
  padding: 20px 10px 10px;
  .search {
    height: 550px;
    margin-top: 40px;
    &-span {
      position: absolute;
      left: -30px;
      top: 9px;
      font-size: 20px;
    }
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
