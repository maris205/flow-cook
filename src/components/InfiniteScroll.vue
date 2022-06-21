<template>
  <div class="infinite-scroll" :style="{height: wrapHeight}" @scroll="infiniteScroll">
    <slot></slot>
    <scroll-loading v-show="loading"></scroll-loading>
  </div>
</template>

<script>
  import ScrollLoading from "@/components/ScrollLoading.vue";
  export default {
    name: "InfiniteScroll",
    props: {
      wrapHeight: String,
      loading: Boolean
    },
    data() {
      return {
        initialScrollTop: 0
      };
    },
    components: {
      ScrollLoading
    },
    computed: {},
    methods: {
      bindScroll() {
        if (document.querySelector(".ctn-rt-ctn")) {
          document.querySelector(".ctn-rt-ctn").addEventListener("scroll", this.infiniteScroll);
        }
      },
      unbindScroll() {
        if (document.querySelector(".ctn-rt-ctn")) {
          document.querySelector(".ctn-rt-ctn").removeEventListener("scroll", this.infiniteScroll);
        }
      },
      infiniteScroll(e) {
        let _this = this;
        if (!this.wrapHeight) {
          let scrollTop = document.querySelector(".ctn-rt-ctn").scrollTop;
          let clientHeight = document.querySelector(".ctn-rt-ctn").clientHeight;
          let scrollHeight = document.querySelector(".ctn-rt-ctn").scrollHeight;
          if (scrollTop > this.initialScrollTop) {
            this.initialScrollTop = scrollTop;
            if (!this.loading && scrollTop + clientHeight >= scrollHeight - 20) {
              _this.$emit("loadMore");
            }
          } else {
            this.initialScrollTop = scrollTop;
          }
        } else {
          let ele = e.srcElement ? e.srcElement : e.target;
          if (ele.scrollTop > this.initialScrollTop) {
            this.initialScrollTop = ele.scrollTop;
            if (!this.loading && ele.scrollTop + ele.offsetHeight > ele.scrollHeight - 20) {
              _this.$emit("loadMore");
            }
          } else {
            this.initialScrollTop = ele.scrollTop;
          }
        }
      }
    },
    mounted() {
      if (!this.wrapHeight) {
        this.initialScrollTop = document.querySelector(".ctn-rt-ctn").scrollTop;
        this.bindScroll();
      } else {
        this.initialScrollTop = document.querySelector(".infinite-scroll").scrollTop;
      }
    },
    destroyed() {
      if (!this.wrapHeight) {
        this.unbindScroll();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-loading-mask {
    background: #FFF !important;
  }
</style>
<style scoped lang="less">
  .infinite-scroll {
    overflow-y: auto;
    .scroll-loading {
      padding-top: 30px;
    }
  }
</style>
