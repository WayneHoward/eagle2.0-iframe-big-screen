<template>
  <div class="content">
    <Title titleName="全网分压对比" ref="title" :params="params"></Title>
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

  data() {
    return {
      TOTALLOSSBEFORE: [], // 优化前损耗电量
      TOTALLOSS: [], // 优化后损耗电量
      TOTALLOSSRATEBEFORE: [], // 优化前线损率
      TOTALLOSSRATE: [], // 优化后线损率

      params: {
        hour: false,
        formData: this.formData,
        tabId: '4028b8815d5f0e1d015d5fc0180b000d',
        tabName: '分压结果对比表',
        url: 'eagle2HummerRootPath+hummer/report.action?queryId=4028801b5d5828d9015d58ba96a5001d',
        isRefresh: true
      }
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
