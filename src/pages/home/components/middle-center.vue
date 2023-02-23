<template>
  <div class="content">
    <Title titleName="全网分压对比" ref="title"></Title>
    <div class="echarts">
      <df-charts
        ref="lineBar"
        name="lineBar"
        class="lineBar-echarts"
        :option="lineBar"
        self-adaption
      />
    </div>
  </div>
</template>

<script>
import Title from './title'
import { dfCharts } from 'dfview'
import { getLineBar1 } from './middle-config'

export default {
  name: 'MiddleCenter',
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Title,
    dfCharts
  },
  computed: {
    lineBar () {
      return getLineBar1.call(this)
    }
  },

  mounted() {
    const lineBar = this.$refs.lineBar.getInstance()
    lineBar.off('click')// 清除事件
    lineBar.on('click', (param) => {this.showInTab()});
  },

  data() {
    return {
      TOTALLOSSBEFORE: [], // 优化前损耗电量
      TOTALLOSS: [], // 优化后损耗电量
      TOTALLOSSRATEBEFORE: [], // 优化前线损率
      TOTALLOSSRATE: [] // 优化后线损率
    };
  },

  methods: {
    loadData(data) {
      this.TOTALLOSSBEFORE = []
      this.TOTALLOSS = []
      this.TOTALLOSSRATEBEFORE = []
      this.TOTALLOSSRATE = []

      let arr330 = {}
      let arr110 = {}
      let arr35 = {}

      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          switch (item.VOLTNAME) {
            case '330kV':
              arr330 = item
              break
            case '110kV':
              arr110 = item
              break
            case '35kV':
              arr35 = item
              break
          }
        })

        this.TOTALLOSSBEFORE = [arr330.TOTALLOSSBEFORE, arr110.TOTALLOSSBEFORE, arr35.TOTALLOSSBEFORE]
        this.TOTALLOSS = [arr330.TOTALLOSS, arr110.TOTALLOSS, arr35.TOTALLOSS]
        this.TOTALLOSSRATEBEFORE = [arr330.TOTALLOSSRATEBEFORE, arr110.TOTALLOSSRATEBEFORE, arr35.TOTALLOSSRATEBEFORE]
        this.TOTALLOSSRATE = [arr330.TOTALLOSSRATE, arr110.TOTALLOSSRATE, arr35.TOTALLOSSRATE]
      }
    },

    showInTab() {
      let COMPANY_ID = this.formData.companyId
      let DATA_TIME = this.formData.dataTime

      let param = {
        tabId: '4028b8815d5f0e1d015d5fc0180b000d',
        tabName: '分压结果对比表',
        url: `http://192.168.0.26:18080/hummer/report.action?queryId=4028801b5d5828d9015d58ba96a5001d&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME}&END_DATA_TIME=${DATA_TIME}`,
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
  .echarts {
    flex: 1;
    overflow: hidden;
  }
}
</style>
