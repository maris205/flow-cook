/** * @author zhangkun * @date 2020-07-10 */
<template>
  <div class="date-select-buttons">
    <el-button :type="button1" @click="timeChange(1)">日榜</el-button>
    <el-button :type="button2" @click="timeChange(7)">周榜</el-button>
    <el-button :type="button3" @click="timeChange(30)">月榜</el-button>
    <el-select v-model="selectInput" placeholder="请选择" @change="selectChange" :popper-append-to-body="false" popper-class="selectinfo" size="mini">
      <el-option v-for="(item, index) in optionList" :key="index" :label="item.lable" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DateSelectButtons",
  data() {
    return {
      button1: "primary",
      button2: "",
      button3: "",
      selectInput: 1,
      optionList: [],
      times: 1
    };
  },
  created() {
    this.times = 1;
    this.selectInput = 1;
    this.getDaysOption();
  },
  methods: {
    timeChange(val) {
      this.times = val;
      this.selectInput = 1;
      if (val === 1) {
        this.getDaysOption();
        this.button1 = "primary";
        this.button2 = "";
        this.button3 = "";
      } else if (val === 7) {
        this.getWeeksOption();
        this.button1 = "";
        this.button2 = "primary";
        this.button3 = "";
      } else {
        this.getMonthsOption();
        this.button1 = "";
        this.button2 = "";
        this.button3 = "primary";
      }
      let day = this.selectInput * this.times;
      this.$emit("timeChange", val);
    },
    selectChange(val) {
      console.log(val);
      let day = val * this.times;
      console.log(day);
      this.$emit("timeChange", val);
    },
    getDaysOption() {
      this.optionList = [];
      for (let i = 1; i < 8; i++) {
        var day = {
          value: i,
          lable: moment()
            .subtract("days", i)
            .format("MM月DD日")
        };
        this.optionList.push(day);
      }
      // console.log(this.optionList);
    },
    getWeeksOption() {
      this.optionList = [];
      for (let i = 1; i < 5; i++) {
        var day = {
          value: i,
          lable: this.getLastWeek(i)
        };
        this.optionList.push(day);
      }
    },

    getMonthsOption() {
      this.optionList = [];
      for (let i = 1; i < 4; i++) {
        var day = {
          value: i,
          lable: moment()
            .subtract("month", i)
            .format("YYYY年MM月")
        };
        this.optionList.push(day);
      }
    },
    /**
     * 获取前 i 周的周一和周日日期，并以数组的方式返回。
     * 当 i=1，获取的是上周一和上周日的日期；
     * 当 i=2，获取的是上上周一和上上周日的日期
     * ...以此类推
     * @param i
     */
    getLastWeek(i) {
      let weekOfDay = parseInt(moment().format("E")); //计算今天是这周第几天
      let last_monday = moment()
        .subtract(weekOfDay + 7 * i - 1, "days")
        .format("MM月DD日"); //周一日期
      let last_sunday = moment()
        .subtract(weekOfDay + 7 * (i - 1), "days")
        .format("MM月DD日"); //周日日期
      return last_monday + "-" + last_sunday;
    },
    /**
     * 获取后 i 周的周一和周日日期，并以数组的方式返回。
     * 当 i=1，获取的是下周一和下周日的日期；
     * 当 i=2，获取的是下下周一和下下周日的日期
     * ...以此类推
     * @param i
     */
    getNextWeek(i) {
      let weekOfDay = parseInt(moment().format("E")); //计算今天是这周第几天
      let next_monday = moment()
        .add(7 - weekOfDay + 7 * (i - 1) + 1, "days")
        .format("YYYY-MM-DD"); //周一日期
      let next_sunday = moment()
        .add(7 - weekOfDay + 7 * i, "days")
        .format("YYYY-MM-DD"); //周日日期
      return [next_monday, next_sunday];
    }
  }
};
</script>

<style lang="less">
.date-select-buttons {
  .el-button:focus {
    color: #ffcd1e;
    border-color: #d8dce6;
    background-color: #f5fcf7;
  }

  .el-button:hover {
    color: #fff;
    background: #3d3a28;
    border-color: #ffcd1e !important;
  }

  .el-input__inner:focus {
    border-color: #ffcd1e !important;
    // background: #ffcd1e;
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #ffcd1e !important;
  }
  .el-select {
    margin-left: 10px;
    // height: 34px;
    .el-input__inner {
      height: 34px;
      line-height: 32px;
      border-color: #d8dce6;
      background: #181b1a;
      color: #fff;
    }
    .el-input__icon {
      line-height: 32px;
    }
  }
  .el-select-dropdown__item.selected {
    background: #f5fcf7;
    color: #ffcd1e;
  }
  .el-button--primary {
    color: #ffffff !important;
    background: #ffcd1e !important;
    border-color: #ffcd1e !important;
  }
  .el-button--medium {
    background: #181b1a;
    color: #fff;
    height: 34px;
  }
}
// 下拉框样式
</style>
<style lang="less" scoped>
// @import "@/assets/less/select.less";
</style>
