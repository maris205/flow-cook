<template>
  <div class="app-container">
    <div class="app-container-wrapper">

      <el-card style="height: 140px"  v-loading="upload_loading">

            <!-- 图片上传 -->
        <el-upload
          class="avatar-uploader"
          action="string1"
          :http-request="UploadImage"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
                    <img :src="scope.row.cloud_path" class="shopImg">
                  </div>

                  <el-tooltip class="shopTitle titletwo item" effect="dark" :content="scope.row.title" placement="bottom-end">
                      <span>{{ scope.row.title }}</span>
                  </el-tooltip>

                  <el-link :underline="false" :href="scope.row.ipfs" target="_blank">
                  <i class="el-icon-share" style="padding-left: 14px;"></i>
                  </el-link>

                </div>
              </template>
            </el-table-column>

            <el-table-column label="IPFS CID" min-width="240" prop="cos_fee_scale" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cid }}</span>
              </template>
            </el-table-column>


            <el-table-column label="大小" width="120" prop="est_revenue" align="center" sortable :sort-method="sort_est_revenue">
              <template slot-scope="scope">
                <span>{{ scope.row.file_size|tranNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="上传日期" width="190" prop="estimated_sales" align="center" sortable :sort-method="sort_estimated_sales">
              <template slot-scope="scope">
                <span>{{ scope.row.upload_time }}</span>
              </template>
            </el-table-column>

          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="publish(scope.row.id)" :disabled="'1'==scope.row.is_sync_ipfs && '0'==scope.row.is_publish?false:true">发布NFT </el-button>
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
import { search_pic,search_goods } from '@/api/ai'
import { get_user_file_list, upload_image } from '@/api/file'

import '../../assets/less/dianshang/cable.less';


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

        if (numStr.length > 6) {
          // eslint-disable-next-line no-undef
          // let decimal = numStr.substring(numStr.length - 8, 3);
          return parseFloat(num / (1024*1024)).toFixed(1) + 'M'
        } else if (numStr.length > 3) {
          // let decimal = numStr.substring(numStr.length - 4, 3);
          // return parseFloat(parseInt(num / 10000) + "." + decimal) + " w";
          return parseFloat(num / 1204).toFixed(1) + 'K'
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
    //console.log("accept email", this.$route.query.email)
    this.get_user_info()//获得用户信息
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

    get_user_file_list() {
      this.loading = true
      get_user_file_list({email:this.account, token:this.token, start:this.start,
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
      this.get_user_file_list()
    },

    get_user_info() {
      //先判断是否有直接传入的数据
      let account = this.$route.query.email
      let token  = this.$route.query.token

      if (typeof(account) === "undefined") { //如果没有数据过来,检测是否cookie
        account = localStorage.getItem('account');
        token = localStorage.getItem('token');
        this.account = account;
        this.token = token;

        //如果都没有，退出
        if(token==null) {
          this.$router.push('/login')
        } else {
          this.get_user_file_list()//获得用户文件列表
        }
      } else { //有数据传输过来，同时存储ck，以传输的数据为高优先级
        this.account = account;
        this.token = token;

        localStorage.setItem('account', account);
        localStorage.setItem('token',token);

        this.get_user_file_list()//获得用户文件列表

      }


    },

    //自定义图片上传
    UploadImage(param){
      this.upload_loading = true
      //console.log("param before upload", param)
      const formData = new FormData()
      formData.append('file', param.file)
      formData.append("email", this.account)
      formData.append("token", this.token)

      upload_image(formData).then(response => {
        // console.log("param after upload", param)
        console.log('上传图片成功', response)
        this.upload_loading = false
        this.$message({
          message: '上传文件成功！',
          type: 'success'
        });

        //加载文件列表
        this.get_user_file_list()
      })
    },

    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isLt2M;
    },

    //发布nft
    publish(img_id) {
      console.log("img_id", img_id)
      this.$router.push({path:'/publish',
        query:{img_id:img_id}
      })
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
}
.avatar {
  width: 85px;
  height: 85px;
  display: block;
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
