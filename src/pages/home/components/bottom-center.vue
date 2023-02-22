<template>
  <div class="content">
    <Title titleName="电压合格率对比" ref="title" :params="params"></Title>
    <div class="echarts">
      <df-charts
        ref="line"
        name="line"
        class="line-echarts"
        :option="line"
        self-adaption
      />
    </div>
  </div>
</template>

<script>
import Title from './title'
import { dfCharts } from 'dfview'
import { getLine1 } from './bottom-config'

export default {
  name: 'BottomCenter',
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
    line () {
      return getLine1.call(this)
    }
  },
  data() {
    return {
      before: [],
      after: [],

      params: {
        hour: true,
        formData: this.formData,
        tabId: '4028801b5d52bb79015d5477c51201d6',
        tabName: '电压合格率结果对比表（整点）',
        url: 'http://192.168.0.26:18080/hummer/report.action?queryId=4028801b5d100f53015d11e73b85004c',
        isRefresh: true
      }
    };
  },
  methods: {
    loadData(data) {
      this.before = []
      this.after = []

      let arr330 = {}
      let arr110 = {}
      let arr35 = {}

      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          switch (item.VOLT_NAME) {
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

        this.before = [arr330.STANDARD_RATE_BEFORE, arr110.STANDARD_RATE_BEFORE, arr35.STANDARD_RATE_BEFORE]
        this.after = [arr330.STANDARD_RATE, arr110.STANDARD_RATE, arr35.STANDARD_RATE]
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
