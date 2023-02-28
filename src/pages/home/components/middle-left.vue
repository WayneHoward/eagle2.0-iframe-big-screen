<template>
  <div class="content">
    <div class="title">
      <img src="../assets/title-icon.png" alt="title-icon">
      <div class="title-name">
        主变运行情况对比
      </div>
      <ul class="tabs">
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="tabValue === item.value ? 'light' : ''"
          @click="tabClick(item.value)"
        >
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="echarts">
      <df-charts
        v-if="tabValue == '1'"
        ref="tab1Bar"
        name="tab1Bar"
        class="bar-echarts"
        :option="tab1Bar"
        self-adaption
      />
      <df-charts
        v-if="tabValue == '2'"
        ref="tab2Bar"
        name="tab2Bar"
        class="bar-echarts"
        :option="tab2Bar"
        self-adaption
      />
    </div>
  </div>
</template>

<script>
import { dfCharts } from 'dfview'
import { getBar1, getBar2 } from './middle-config'

export default {
  name: 'MiddleLeft',
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    dfCharts
  },
  computed: {
    tab1Bar () {
      return getBar1.call(this)
    },
    tab2Bar () {
      return getBar2.call(this)
    },
  },
  data() {
    return {
      tabValue: '1',
      tabs: [
        {
          value: '1',
          label: '经济运行'
        },
        {
          value: '2',
          label: '负载率'
        }
      ],

      COPPIRON_BEFORE: [], // 经济运行优化前
      COPPIRON_AFTER: [], // 经济运行优化后
      LOADRATE_BEFORE: [], // 负载率优化前
      LOADRATE_AFTER: [] // 负载率优化后
    };
  },

  mounted() {
    const tab1Bar = this.$refs.tab1Bar.getInstance()
    tab1Bar.off('click')// 清除事件
    tab1Bar.on('click', (param) => {this.showInTab()});

    const tab2Bar = this.$refs.tab2Bar.getInstance()
    tab2Bar.off('click')// 清除事件
    tab2Bar.on('click', (param) => {this.showInTab()});
  },

  methods: {
    loadData(data) {
      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          switch (item.TYPE) {
            // 经济运行优化前
            case 'COPPIRON_BEFORE':
              this.COPPIRON_BEFORE = [item.HEAVYLOADNUM, item.LIGHTLOADNUM, item.ECONOMICLOADNUM, item.EMPTYLOADNUM, item.OTHERLOADNUM]
              break
            // 经济运行优化后
            case 'COPPIRON_AFTER':
              this.COPPIRON_AFTER = [item.HEAVYLOADNUM, item.LIGHTLOADNUM, item.ECONOMICLOADNUM, item.EMPTYLOADNUM, item.OTHERLOADNUM]
              break
            // 负载率优化前
            case 'LOADRATE_BEFORE':
              this.LOADRATE_BEFORE = [item.LESSTHEN10NUM, item.GREATEER10LESSTHEN30NUM, item.GREATEER30LESSTHEN70NUM, item.GREATEER70NUM]
              break
            // 负载率优化后
            case 'LOADRATE_AFTER':
              this.LOADRATE_AFTER = [item.LESSTHEN10NUM, item.GREATEER10LESSTHEN30NUM, item.GREATEER30LESSTHEN70NUM, item.GREATEER70NUM]
              break
          }
        })
      }
    },

    tabClick(value) {
      this.tabValue = value
    },

    showInTab() {
      let COMPANY_ID = this.formData.companyId
      let DATA_TIME = this.formData.dataTime

      let param = {
        tabId: '4028801b5d52bb79015d54680b760162',
        tabName: '变压器结果对比表（整点）',
        url: `${window.eagle2HummerRootPath}/report.action?queryId=4028801b5d0cacfe015d0d8c14360000&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME} 00:00&END_DATA_TIME=${DATA_TIME} 23:59`,
        isRefresh: true
      }

      top.showInTab(param.tabId, param.tabName, param.url, param.isRefresh)
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    position: relative;
    box-sizing: border-box;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    img {
      height: 16px;
    }
    .title-name {
      color: #20253A;
      font-size: 14px;
      margin-left: 5px;
    }
    .tabs {
      top: -5px;
      right: -5px;
      position: absolute;
      display: flex;
      justify-content: center;
      font-size: 12px;
      padding: 5px;
      li {
        cursor: pointer;
        padding: 5px 20px;
        box-sizing: border-box;
        color: #74798C;
        // background-color: #f1f1f1;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          left: auto;
          top: auto;
          bottom: 50%;
          transform: translateY(50%);
          right: 0;
          height: 50%;
          width: 1px;
          background-color: #d1d1d1;
        }
        &:nth-child(1) {
          border-radius: 10px 0px 0px 0px;
        }
        &:last-child {
          border-radius: 0px 10px 0px 0px;
          &:after {
            width: 0px;
          }
        }
      }
      .light {
        color: #fff;
        background-color: #62b5aa;
        &:after {
          width: 0px;
        }
      }
    }
  }
  .echarts {
    flex: 1;
    overflow: hidden;
  }
}
</style>
