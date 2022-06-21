<template>
  <div class="app-container">

    <el-input v-model="domain" placeholder="输入主域名，如http://weibo.com" style="margin-bottom:30px;" />

    <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入html源码"
      v-model="html_text">
    </el-input>

    <p></p>


    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="get_url_classify()" :disabled="url_classify_button">分析链接</el-button>
      </el-form-item>
      <el-form-item label="正则检测">
        <el-input v-model="str_re" placeholder="请输入正则表达式"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_url_match()" :disabled="url_match_button">查询匹配</el-button>
        {{stat_text}}
      </el-form-item>
    </el-form>

    <!--<p>推荐正则：</p>-->

    <!--<el-card class="box-card">-->
      <!--<div slot="header" class="clearfix">-->
        <!--<span>推荐正则表达式</span>-->
      <!--</div>-->
      <!--<div class="text item">-->
          <!--*-->
      <!--</div>-->
    <!--</el-card>-->

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
  import { hello,get_url_classify,get_url_match } from '@/api/ins'

  export default {

  data() {
    return {
      formInline:{},
      domain: '',
      html_text:"",
      str_re:".*",
      domain:"",
      stat_text:"", //正则统计数据

      url_classify_button:false,
      url_match_button:false,
      data2: [],

      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  created() {
    this.fetchData()
    //this.get_url_classify()
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    fetchData() {
      hello().then(response => {
        var data = response
        console.log(data)
        console.log(process.env.NODE_ENV=="development")
      })
    },

    get_url_classify() {
      this.url_classify_button = true
      get_url_classify({domain:this.domain, html:this.html_text}).then(response => {
        var data = response
        this.data2 = data.results
        console.log(this.data2)
        this.url_classify_button = false

      })
    },

    get_url_match() {
        this.url_match_button = true

        get_url_match({domain:this.domain, html:this.html_text, str_re:this.str_re}).then(response => {
        var data = response
        this.data2 = data.results.data
        var stat_data = data.results.stat_data
        //console.log(this.data2)
        this.stat_text = "url总数:" + stat_data["url_num"] +
          "，url匹配数:" + stat_data["match_url_num"] +
          " | 正文url数:" +  stat_data["content_url_num"] +
          "， 正文url匹配数:" + stat_data["content_match_url_num"];
        this.url_match_button = false

        })
    }
  }
}
</script>

