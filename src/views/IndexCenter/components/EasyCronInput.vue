<template>
  <div class="cron-con">
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="period" @change="periodChange">
          <el-radio
            :label="item"
            v-for="(item, index) of periodOpts"
            :key="index"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-col>
    </el-row>

    <div class="cron-input cron-seconds" v-show="period == '秒'">
      <el-row>
        <el-col :span="24">
          每
          <el-select v-model="nsec" @change="onChange">
            <el-option
              v-for="(item, index) of 60"
              :key="index"
              :value="item"
              :label="item"
            >
              {{ item }}
            </el-option>
          </el-select>
          秒</el-col
        >
      </el-row>
      <p></p>
    </div>
    <div class="cron-input cron-minutes" v-show="period == '分'">
      <p>
        每
        <el-select v-model="nmin" placeholder="" @change="onChange">
          <el-option
            v-for="(item, index) of 60"
            :key="index"
            :value="item"
            :label="item"
          >
            {{ item }}
          </el-option>
        </el-select>
        分钟
      </p>
    </div>
    <div class="cron-input cron-hourly" v-show="period == '时'">
      <p>
        每
        <el-select v-model="nhour" placeholder="" @change="onChange">
          <el-option
            v-for="(item, index) of 24"
            :key="index"
            :value="item"
            :label="item"
          >
            {{ item }}
          </el-option>
        </el-select>

        小时
      </p>
    </div>
    <div class="cron-input cron-daily" v-show="period == '天'">
      <p>
        每
        <el-select v-model="nday" placeholder="" @change="onChange">
          <el-option
            v-for="(item, index) of 100"
            :key="index"
            :value="item"
            :label="item"
          >
            {{ item }}
          </el-option>
        </el-select>
        天
      </p>
    </div>
    <div class="cron-input cron-weekly" v-show="period == '周'">
      <p>
        <el-checkbox-group v-model="dow" @change="onChange">
          <el-checkbox
            v-for="(item, index) in dayOfWeekOpts"
            :key="index"
            :label="index"
            :value="item"
            >{{ item }}</el-checkbox
          >
        </el-checkbox-group>
      </p>
    </div>
    <div class="cron-input cron-monthly" v-show="period == '月'">
      <p>
        每
        <el-select v-model="nmonth" placeholder="" @change="onChange">
          <el-option v-for="(item, index) of 12" :value="item" :key="index">
            {{ item }}
          </el-option>
        </el-select>

        月
        <el-select v-model="dom" @change="onChange">
          <el-option v-for="(item, index) of 31" :key="index" :value="item">
            {{ item }}
          </el-option>
        </el-select>
        日
      </p>
    </div>
    <div class="cron-input cron-yearly" v-show="period == '年'">
      <p>
        <el-row>
          <el-col :span="12">
            每年
            <el-select v-model="moy" placeholder="" @change="onChange">
              <el-option v-for="(item, index) of 12" :key="index" :value="item">
                {{ item }}
              </el-option>
            </el-select>
            月
          </el-col>
          <el-col :span="12">
            <el-select v-model="dom" placeholder="" @change="onChange">
              <el-option v-for="(item, index) of 31" :key="index" :value="item">
                {{ item }}
              </el-option>
            </el-select>
            日
          </el-col>
        </el-row>
      </p>
    </div>
    <div
      class="cron-input cron-start-time"
      v-show="
        period == '天' || period == '周' || period == '月' || period == '年'
      "
    >
      <el-row>
        <el-col :span="12">
          <span v-if="period == '年'" style="padding-left: 31px"> </span>
          <span v-if="period == '月'" style="padding-left: 18px"></span>
          <span v-if="period == '天'" style="padding-left: 18px"></span>
          <el-select v-model="hour" placeholder="" @change="onChange">
            <el-option
              v-for="(item, index) of 24"
              :key="index"
              :value="item - 1"
            >
              {{ ("00" + (item - 1)).slice(-2) }}
            </el-option>
          </el-select>

          时
        </el-col>
        <el-col :span="12">
          <el-select v-model="min" placeholder="" @change="onChange">
            <el-option
              v-for="(item, index) of 60"
              :key="index"
              :value="item - 1"
            >
              {{ ("00" + (item - 1)).slice(-2) }}
            </el-option>
          </el-select>
          分
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "easy-cron-input",
  props: {
    value: {
      type: String,
      default: "* * * * * *",
    },
  },
  data() {
    return {
      periodOpts: ["年", "月", "周", "天", "时", "分", "秒"],
      nthWeekOpts: ["第一个", "第二个", "第三个", "第四个"],
      dayOfWeekOpts: ["一", "二", "三", "四", "五", "六", "日"],
      period: "年",
      dow: [],
      dom: 1,
      moy: 1,
      min: 0,
      hour: 0,
      nsec: 1,
      nmin: 1,
      nhour: 1,
      nday: 1,
      nmonth: 1,
    };
  },
  mounted() {
    // this.setExpress(this.value);
    // this.onChange();
  },
  methods: {
    periodChange() {
      this.dow = [];
      this.dom = 1;
      this.moy = 1;
      this.min = 0;
      this.hour = 0;
      this.nsec = 1;
      this.nmin = 1;
      this.nhour = 1;
      this.nday = 1;
      this.nmonth = 1;
      this.onChange();
    },
    onChange() {
      console.log(this.getExpress());
      this.$emit("input", this.getExpress(), this.getText());
    },
    getExpress() {
      var sec = 0; // ignoring seconds by default
      var year = "*"; // every year by default
      var dow = "*",
        dom = "*",
        moy = "*";
      var hour = this.hour,
        min = this.min;
      switch (this.period) {
        case "秒":
          if (this.nsec > 1) {
            sec = "*/" + this.nsec;
          } else {
            sec = "*";
          }
          hour = "*";
          min = "*";
          break;
        case "分":
          if (this.nmin > 1) {
            min = "*/" + this.nmin;
          } else {
            min = "*";
          }
          hour = "*";
          break;
        case "时":
          if (this.nhour > 1) {
            hour = "*/" + this.nhour;
          } else {
            hour = "*";
          }
          min = 0;
          break;
        case "天":
          if (this.nday > 1) {
            dom = "*/" + this.nday;
          }
          break;
        case "周":
          if (this.dow.length > 0 && this.dow.length < 7) {
            dow = this.dow.sort().join(",");
          }
          break;
        case "月":
          if (this.nmonth > 1) {
            moy = "*/" + this.nmonth;
          }
          dom = this.dom;
          break;
        case "年":
          moy = this.moy;
          dom = this.dom;
          break;
        default:
          break;
      }
      return [sec, min, hour, dom, moy, dow].join(" ");
    },
    setExpress(express) {
      express = express || "* * * * * *";
      var crons = express.split(/\s+/);
      if (crons.length == 6) {
        if (crons[0] == "*") {
          this.period = "秒";
          this.nsec = 1;
          return;
        }
        if (crons[0].split("/").length == 2) {
          this.period = "秒";
          this.nsec = crons[0].split("/")[1];
          return;
        }
        if (crons[1] == "*") {
          this.period = "分";
          this.nmin = 1;
          return;
        }
        if (crons[1].split("/").length == 2) {
          this.period = "分";
          this.nmin = crons[1].split("/")[1];
          return;
        }
        if (crons[2] == "*") {
          this.period = "时";
          this.nhour = 1;
          return;
        }
        if (crons[2].split("/").length == 2) {
          this.period = "时";
          this.nhour = crons[2].split("/")[1];
          return;
        }
        if (crons[3] == "*" && crons[5] == "*") {
          this.period = "天";
          this.nday = 1;
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
        if (crons[3] == "*" && crons[5] != "*") {
          this.period = "周";
          this.dow = crons[5].split(",");
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
        if (crons[3].split("/").length == 2) {
          this.period = "天";
          this.nday = crons[3].split("/")[1];
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
        if (crons[4] == "*") {
          this.period = "月";
          this.nmonth = 1;
          this.dom = crons[3];
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
        if (crons[4].split("/").length == 2) {
          this.period = "月";
          this.moy = crons[4].split("/")[1];
          this.dom = crons[3];
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
        if (/\d+/.test(crons[4])) {
          this.period = "年";
          this.moy = crons[4];
          this.dom = crons[3];
          this.hour = crons[2];
          this.min = crons[1];
          return;
        }
      }
    },
    getText() {
      var text = "";
      switch (this.period) {
        case "秒":
          text += "每";
          text += this.nsec;
          text += "秒";
          break;
        case "分":
          text += "每";
          text += this.nmin;
          text += "分钟";
          break;
        case "时":
          text += "每";
          text += this.nhour;
          text += "分钟";
          break;
        case "天":
          text += "每";
          text += this.nday;
          text += "天";
          text += ("00" + this.hour).slice(-2);
          text += "时";
          text += ("00" + this.min).slice(-2);
          text += "分";
          break;
        case "周":
          if (this.dow.length > 0 && this.dow.length < 7) {
            text += "每周";
            var _dow = this.dow.sort().map((v) => {
              return this.dayOfWeekOpts[v];
            });
            text += _dow.join(",");
          } else {
            text += "每天";
          }
          text += ("00" + this.hour).slice(-2);
          text += "时";
          text += ("00" + this.min).slice(-2);
          text += "分";
          break;
        case "月":
          text += "每";
          text += this.nmonth;
          text += "月";
          text += this.dom;
          text += "日";
          text += ("00" + this.hour).slice(-2);
          text += "时";
          text += ("00" + this.min).slice(-2);
          text += "分";
          break;
        case "年":
          text += "每年";
          text += this.moy;
          text += "月";
          text += this.dom;
          text += "日";
          text += ("00" + this.hour).slice(-2);
          text += "时";
          text += ("00" + this.min).slice(-2);
          text += "分";
          break;
        default:
          break;
      }
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>
.cron-con {
  width: 100%;

  .cron-input {
    white-space: nowrap;
    padding: 5px 5px 0px 5px;
    // display: inline-block;
  }
}
</style>
