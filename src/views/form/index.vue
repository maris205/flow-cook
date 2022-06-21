<template>

  <div class="app-container">

    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="网页html">
        <el-input v-model="form.html_text"
                  placeholder="请输入html源码"
                  :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item label="标题匹配规则">
        <el-input v-model="form.title_re"
                  />
      </el-form-item>

      <el-form-item label="正文匹配规则">
        <el-input v-model="form.content_re"
        />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="get_title_content()" :disabled="parse_button">分析页面</el-button>
      </el-form-item>
    </el-form>


    <el-form ref="form1" :model="form1" label-width="120px">

      <el-form-item label="标题结果">
        <el-input v-model="form1.title"
                  placeholder="显示标题匹配的结果"
                  />
      </el-form-item>

      <el-form-item label="正文结果">
        <el-input v-model="form1.content"
                  placeholder="请输入html源码"
                  :rows="10" type="textarea"/>
      </el-form-item>

    </el-form>

  </div>


</template>

<script>
  import { getList,get_title_content } from '@/api/ins'

export default {
  data() {
    return {
      parse_button:false,
      form: {
        html_text: '',
        title_re: '[title]',
        content_re: '[message]',
      },
      form1: {
        title: '',
        content: '',
      }
    }
  },
  methods: {
    get_title_content() {
      this.parse_button = true
      get_title_content({html:this.form.html_text, title_re:this.form.title_re, content_re:this.form.content_re}).then(response => {
        var data = response
        this.form1.title = data.results.title
        this.form1.content = data.results.content

        this.parse_button = false
      })
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

