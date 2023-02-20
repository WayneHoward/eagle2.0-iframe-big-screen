<template>
  <div class="content">
    <Title titleName="线路运行情况对比"></Title>
    <div class="echarts">
      <df-charts
        ref="bar"
        name="bar"
        class="bar-echarts"
        :option="bar"
        self-adaption
      />
    </div>
  </div>
</template>

<script>
import Title from './title'
import { dfCharts } from 'dfview'
import { getBar1 } from './bottom-config'

export default {
  name: 'TopLeft',
  components: {
    Title,
    dfCharts
  },
  computed: {
    bar () {
      return getBar1.call(this)
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

      if (typeof data != 'string' && data.length > 0) {
        data.forEach(item => {
          switch (item.TYPE) {
            case 'before':
              this.before = [item.LOSSRATE1, item.LOSSRATE2, item.LOSSRATE3, item.LOSSRATE4]
              break
            case 'after':
              this.after = [item.LOSSRATE1, item.LOSSRATE2, item.LOSSRATE3, item.LOSSRATE4]
              break
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
