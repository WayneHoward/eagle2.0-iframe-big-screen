<template>
  <div class="content">
    <Title titleName="电压合格率对比"></Title>
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
  name: 'TopLeft',
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
      after: []
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
