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
            <el-table-column label="名称" min-width="260">
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

            <el-table-column label="供应量" width="120" prop="estimated_sales" align="center" sortable :sort-method="sort_estimated_sales">
              <template slot-scope="scope">
                <span>{{ scope.row.estimated_sales|tranNumber }}</span>
              </template>
            </el-table-column>


            <el-table-column label="价格" width="140" prop="price" align="center" sortable :sort-method="sort_price">
              <template slot-scope="scope">
                <span>￥{{ scope.row.price }}</span>
              </template>
            </el-table-column>

            <el-table-column label="位置" width="100" prop="rank" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.province}}-{{ scope.row.location }}</span>
              </template>
            </el-table-column>


            <el-table-column label="供应商" width="220" prop="conversion_rate" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.nick }}</span>
              </template>
            </el-table-column>


          </el-table>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import { search_1688_goods } from '@/api/ai'
import '../../../assets/less/dianshang/cable.less';


export default {
  name: "Dashboard",
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
      word:"", //搜索词
      input: "",
      tableData:[], //表格数据
    };
  },
  created() {
    this.get_user_info()
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
      if(token==null) {
        this.$router.push('/login')
      }
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
