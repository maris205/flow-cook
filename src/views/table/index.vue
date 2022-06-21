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
      <el-form-item label="标签层级(1-3)">
        <el-input v-model="level" placeholder="请输入标签匹配"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="get_tag_classify()" :disabled="url_classify_button">分析链接</el-button>
      </el-form-item>
      <el-form-item label="标签匹配检测">
        <el-input v-model="str_re" placeholder="请输入标签匹配"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_tag_match()" :disabled="url_match_button">查询匹配</el-button>
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
import { getList,hello,get_tag_classify,get_tag_match } from '@/api/ins'

export default {
  data() {
    return {
      formInline:{},
      domain: '',
      html_text:"",
      str_re:'<a href="[url]"',
      domain:"",
      stat_text:"", //正则统计数据
      level:1, //标签级别
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

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    get_tag_classify() {
      this.url_classify_button = true
      get_tag_classify({domain:this.domain, html:this.html_text, level:this.level}).then(response => {
        var data = response
        this.data2 = data.results
        console.log(this.data2)
        this.url_classify_button = false
      })
    },

    get_tag_match() {
      this.url_match_button = true
      get_tag_match({domain:this.domain, html:this.html_text, level:this.level, str_re:this.str_re}).then(response => {
        var data = response
        this.data2 = data.results
        console.log(this.data2)
        this.url_match_button = false
      })
    },
  }
}
</script>
