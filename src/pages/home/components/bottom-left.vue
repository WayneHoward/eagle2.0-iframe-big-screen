<template>
  <div class="content">
    <Title titleName="线路运行情况对比" ref="title"></Title>
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
      after: []
    };
  },

  mounted() {
    const bar = this.$refs.bar.getInstance()
    bar.off('click')// 清除事件
    bar.on('click', (param) => {this.showInTab()});
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
    },

    showInTab() {
      let COMPANY_ID = this.formData.companyId
      let DATA_TIME = this.formData.dataTime

      let param = {
        tabId: '4028801b5d52bb79015d54766623018d',
        tabName: '输电线路结果对比表（整点）',
        url: `${window.eagle2HummerRootPath}/report.action?queryId=4028801b5d0cacfe015d0d98e573001d&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME} 00:00&END_DATA_TIME=${DATA_TIME} 23:59`,
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
