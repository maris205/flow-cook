<template>
  <el-dialog title="提示" :visible.sync="dialogQrVisible" width="30%" @close="checkFollow" class="dialog-box">
    <el-col :span="24" class="dialog-bd">
      <el-image fit="cover" :src="imgSrc[0]"></el-image>
      <p>请扫描二维码关注公众号</p>
      <p>获取最新思睿智训干货</p>
    </el-col>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="checkFollow">已关注公众号</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { isFollow } from "@/api/user";

export default {
  name: "Dialog-QR",
  props: {
    dialogQrVis: { type: Boolean, default: false }
  },
  data() {
    return {
      imgSrc: [require(`@/assets/images/qr-code.png`)],
      dialogQrVisible: false
    };
  },
  watch: {
    dialogQrVis() {
      this.dialogQrVisible = this.dialogQrVis;
    }
  },
  methods: {
    checkFollow() {
      // this.dialogQrVis = false;
      this.$emit("changeDialogQrVis", false);
    }
  }
};
</script>

<style lang="scss">
.dialog-box {
  .el-dialog__header {
    display: block !important;
  }
}
</style>

<style scoped lang="scss">
.dialog-bd {
  text-align: center;
  height: 330px;
}
</style>
