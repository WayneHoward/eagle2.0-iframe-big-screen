<template>
  <div class="content">
    <Title titleName="线路运行情况对比" ref="title" :params="params"></Title>
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
  name: 'BottomLeft',
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
    bar () {
      return getBar1.call(this)
    }
  },
  data() {
    return {
      before: [],
      after: [],

      params: {
        hour: true,
        formData: this.formData,
        tabId: '4028801b5d52bb79015d54766623018d',
        tabName: '输电线路结果对比表（整点）',
        url: 'http://192.168.0.26:18080/hummer/report.action?queryId=4028801b5d0cacfe015d0d98e573001d',
        isRefresh: true
      }
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
