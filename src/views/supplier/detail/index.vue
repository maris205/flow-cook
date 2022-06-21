<template>
  <div class="app-container">
    <div class="app-container-wrapper">
      <el-card style="height: 150px">

        <el-descriptions title="商品信息">
          <el-descriptions-item label="商品">{{title}}</el-descriptions-item>
          <el-descriptions-item label="手机">18100000</el-descriptions-item>
          <el-descriptions-item label="微信">mariswang</el-descriptions-item>
          <el-descriptions-item label="信誉分">
            <el-tag size="small">87</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="链接"><a :href="detail_url" target="_blank"><i class="el-icon-share"></i></a></el-descriptions-item>
          <el-descriptions-item label="联系地址">广东省深圳市</el-descriptions-item>
        </el-descriptions>

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
<!--                <el-button type="text" class="button">详情（{{item.num}}张图片）</el-button>-->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { get_user_goods } from  '@/api/ai'

export default {
  data() {
    return {
      loading:false,
      title:"", //
      detail_url:"",
      img_path: "",
      tableData:[], //表格数据
    }
  },
  created() {
    this.img_path = this.$route.query.img_path
    console.log(this.img_path)
    this.get_user_goods()
  },
  methods: {
    get_user_goods() {
      this.loading = true
      get_user_goods({img_path:this.img_path}).then(response => {
        this.tableData = response.results
        //console.log(this.tableData)
        this.title = this.tableData[0].title
        this.detail_url = this.tableData[0].detail_url
        this.loading = false
      })
    },
  }
}
</script>
