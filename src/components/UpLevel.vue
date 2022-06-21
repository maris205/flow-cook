<template>
  <el-row class="up-level">
    <el-col :span="24" v-if="vipVis || isVIP">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        class="rc-fr"
      >
      </el-pagination>
    </el-col>
    <el-col :span="24" v-else :class="isHeight ? 'up-level-box bg-not-white' : 'up-level-box bg-white'">
      <p>查看更多数据&nbsp;&nbsp;需要升级会员</p>
      <el-button type="primary" class="btn-up-level" @click="toUpLevel">立即升级</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UpLevel",
  props: {
    isHeight: { type: Boolean },
    isVIP: { type: Boolean, default: true },
    pageTotal: { type: [Number, String] }
  },
  computed: {
    ...mapState("check", ["MemberLevel"])
  },
  watch: {
    MemberLevel(val) {
      this.vipVis = val.toString() !== this.$enums.vipLevel.NotVip.value;
    }
  },
  data() {
    return {
      vipVis: false,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.vipVis = this.MemberLevel.toString() !== this.$enums.vipLevel.NotVip.value;
  },
  methods: {
    toUpLevel() {
      this.$router.push({ path: "/user", query: { activeName: "buyMember" } });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("pageSize", this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("currentPage", this.currentPage);
    }
  }
};
</script>

<style scoped lang="scss">
.up-level {
  text-align: center;
  /*overflow: hidden;*/
  .up-level-box {
    text-align: center;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      color: rgba(16, 16, 16, 1);
      font-size: 16px;
    }
    .btn-up-level {
      align-items: center;
      margin-top: 10px;
    }
  }
  .bg-not-white {
    height: 400px;
    background-color: rgba(246, 250, 255, 1);
  }
  .bg-white {
    height: 100px;
    background-color: #ffffff;
  }
}
</style>
