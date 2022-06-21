<template>
  <div class="scroll-loading">
    <div class="inner">
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollLoading",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    //console.log(this.$route.path)
  },
};
</script>
<style scoped lang="less">
.scroll-loading {
  text-align: center;
  padding-bottom: 30px;
}
.inner {
  width: 240px;
  margin: 0 auto;
}
// .load-container {

//   width: 240px;
//   height: 140px;
//   float: left;
//   position: relative;
//   overflow: hidden;
//   -moz-box-sizing: border-box;
//   box-sizing: border-box;
// }

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ff5e60;
  font-size: 10px;
  margin: 10px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped lang="less">
  .scroll-loading {
    text-align: center;
    padding-bottom: 30px;
  }
  .loader-inner {
    display: inline-block;
  } 

  @-webkit-keyframes line-scale {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }

    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }

    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }

  @keyframes line-scale {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }

    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }

    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }

  .line-scale > div:nth-child(1) {
    -webkit-animation: line-scale 1s 0.1s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: line-scale 1s 0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .line-scale > div:nth-child(2) {
    -webkit-animation: line-scale 1s 0.2s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: line-scale 1s 0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .line-scale > div:nth-child(3) {
    -webkit-animation: line-scale 1s 0.3s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: line-scale 1s 0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .line-scale > div:nth-child(4) {
    -webkit-animation: line-scale 1s 0.4s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: line-scale 1s 0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .line-scale > div:nth-child(5) {
    -webkit-animation: line-scale 1s 0.5s infinite
    cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: line-scale 1s 0.5s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }

  .line-scale > div {
    background-color: #ff5e60;
    width: 4px;
    height: 30px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
  }
</style> -->
