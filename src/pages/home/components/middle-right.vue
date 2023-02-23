<template>
  <div class="content">
    <Title titleName="近7日全网线损率对比" ref="title"></Title>
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
import { getLineBar2 } from './middle-config'

export default {
  name: 'MiddleRight',
  components: {
    Title,
    dfCharts
  },
  computed: {
    lineBar () {
      return getLineBar2.call(this)
    }
  },
  data() {
    return {
      dateTimeList: [],

      ACTIVE_POWER: [], // 供电量
      TOTAL_LOSS_RATE_BEFORE: [], // 优化前线损率
      TOTAL_LOSS_RATE: [] // 优化后线损率
    };
  },
  methods: {
    loadData(data) {
      this.dateTimeList = []
      this.ACTIVE_POWER = []
      this.TOTAL_LOSS_RATE_BEFORE = []
      this.TOTAL_LOSS_RATE = []

      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          if (item.DATA_TIME) {
            this.dateTimeList.push(item.DATA_TIME)
            this.ACTIVE_POWER.push(item['ACTIVE_POWER'])
            this.TOTAL_LOSS_RATE_BEFORE.push(item.TOTAL_LOSS_RATE_BEFORE)
            this.TOTAL_LOSS_RATE.push(item.TOTAL_LOSS_RATE)
          }
        })
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
