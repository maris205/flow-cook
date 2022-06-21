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
              action="http://rest.kkyx.shop/image_ai/upload_file_search_user_img"
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

      <el-row  v-loading="loading">
        <el-col :span="8" v-for="(item, index) in tableData">
          <el-card :body-style="{ padding: '10px' }" >
            <div style="height: 400px">
            <img :src="item.local_pic_url" class="image" fit="cover" style="max-height: 379px">
            </div>
            <div style="padding: 14px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{item.fetch_time}}</time>
                <el-button type="text" class="button" @click="get_deail(item.img_path)">详情（{{item.num}}张图片）</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>


  </div>
</template>

<script>
import { search_user_goods } from '@/api/ai'
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

    //到详情页
    get_deail(img_path) {
      console.log("img_path", img_path)
      this.$router.push({path:'/supplier/detail',
                        query:{img_path:img_path}
                      })
    },
    //关键词搜索
    search_goods() {
      this.loading = true
      this.tableData = []
      search_user_goods({word:this.word}).then(response => {
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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

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
