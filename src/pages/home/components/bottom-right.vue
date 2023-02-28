<template>
  <div class="content">
    <div class="title">
      <img src="../assets/title-icon.png" alt="title-icon">
      <div class="title-name">
        无功补偿装置容量对比
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
        ref="tab1DoubleBar"
        name="tab1DoubleBar"
        class="doubleBar-echarts"
        :option="tab1DoubleBar"
        self-adaption
      />
      <df-charts
        v-if="tabValue == '2'"
        ref="tab2DoubleBar"
        name="tab2DoubleBar"
        class="doubleBar-echarts"
        :option="tab2DoubleBar"
        self-adaption
      />
      <df-charts
        v-if="tabValue == '3'"
        ref="tab3DoubleBar"
        name="tab3DoubleBar"
        class="doubleBar-echarts"
        :option="tab3DoubleBar"
        self-adaption
      />
    </div>
  </div>
</template>

<script>
import { dfCharts } from 'dfview'
import { getDoubleBar } from './bottom-config'

export default {
  name: 'BottomRight',
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
    tab1DoubleBar () {
      return getDoubleBar.call(this, this.tab1LeftData, this.tab1RightData, ['优化前容量(MVar)', '优化后容量(MVar)'])
    },
    tab2DoubleBar () {
      return getDoubleBar.call(this, this.tab2LeftData, this.tab2RightData, ['优化前无功输出(MVar)', '优化后无功输出(MVar)'])
    },
    tab3DoubleBar () {
      return getDoubleBar.call(this, this.tab3LeftData, this.tab3RightData, ['优化前无功输出(MVar)', '优化后无功输出(MVar)'])
    }
  },
  data() {
    return {
      tabValue: '1',
      tabs: [
        {
          value: '1',
          label: '电容器'
        },
        {
          value: '2',
          label: '逆变器'
        },
        {
          value: '3',
          label: '变流器'
        }
      ],

      tab1LeftData: [],
      tab1RightData: [],
      tab2LeftData: [],
      tab2RightData: [],
      tab3LeftData: [],
      tab3RightData: []
    };
  },
  mounted() {
    const tab1DoubleBar = this.$refs.tab1DoubleBar.getInstance()
    tab1DoubleBar.off('click')// 清除事件
    tab1DoubleBar.on('click', (param) => {this.showInTab()});

    const tab2DoubleBar = this.$refs.tab2DoubleBar.getInstance()
    tab2DoubleBar.off('click')// 清除事件
    tab2DoubleBar.on('click', (param) => {this.showInTab()});

    const tab3DoubleBar = this.$refs.tab3DoubleBar.getInstance()
    tab3DoubleBar.off('click')// 清除事件
    tab3DoubleBar.on('click', (param) => {this.showInTab()});
  },
  methods: {
    loadData(data) {
      this.tab1LeftData = []
      this.tab1RightData = []
      this.tab2LeftData = []
      this.tab2RightData = []
      this.tab3LeftData = []
      this.tab3RightData = []

      let CTDRQ = [] // 电容器
      let CTNBQ = [] // 逆变器
      let CTBLQ = [] //变流器

      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          switch (item.TYPE) {
            case 'CTDRQ':
              CTDRQ.push(item)
              break
            case 'CTNBQ':
              CTNBQ.push(item)
              break
            case 'CTBLQ':
              CTBLQ.push(item)
              break
          }
        })

        if (CTDRQ.length > 0) {
          let arr330 = {}
          let arr110 = {}
          let arr35 = {}

          CTDRQ.forEach(item => {
            switch (String(item.VOLTAGE)) {
              case '330':
                arr330 = item
                break
              case '110':
                arr110 = item
                break
              case '35':
                arr35 = item
                break
            }
          })

          this.tab1LeftData = [arr330.BEFORE, arr110.BEFORE, arr35.BEFORE]
          this.tab1RightData = [arr330.AFTER, arr110.AFTER, arr35.AFTER]
        }

        if (CTNBQ.length > 0) {
          let arr330 = {}
          let arr110 = {}
          let arr35 = {}

          CTNBQ.forEach(item => {
            switch (String(item.VOLTAGE)) {
              case '330':
                arr330 = item
                break
              case '110':
                arr110 = item
                break
              case '35':
                arr35 = item
                break
            }
          })

          this.tab2LeftData = [arr330.BEFORE, arr110.BEFORE, arr35.BEFORE]
          this.tab2RightData = [arr330.AFTER, arr110.AFTER, arr35.AFTER]
        }

        if (CTBLQ.length > 0) {
          let arr330 = {}
          let arr110 = {}
          let arr35 = {}

          CTBLQ.forEach(item => {
            switch (String(item.VOLTAGE)) {
              case '330':
                arr330 = item
                break
              case '110':
                arr110 = item
                break
              case '35':
                arr35 = item
                break
            }
          })

          this.tab3LeftData = [arr330.BEFORE, arr110.BEFORE, arr35.BEFORE]
          this.tab3RightData = [arr330.AFTER, arr110.AFTER, arr35.AFTER]
        }
      }
    },

    tabClick(value) {
      this.tabValue = value
    },

    showInTab() {
      let COMPANY_ID = this.formData.companyId
      let DATA_TIME = this.formData.dataTime

      let param = {
        tabId: '4028801b5d52bb79015d54e49d2202b2',
        tabName: '无功优化策略结果表',
        url: `${window.eagle2HummerRootPath}/report.action?queryId=4028801b5d53022d015d54a6833e0070&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME}&END_DATA_TIME=${DATA_TIME}`,
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
