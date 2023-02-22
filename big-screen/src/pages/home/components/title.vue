<template>
  <div class="title">
    <img src="../assets/title-icon.png" alt="title-icon">
    <div class="title-name" @click="showInTab">
      {{titleName}}
    </div>
  </div>
</template>

<script>
import { isPlainObject, isEmpty } from 'lodash'

export default {
  name: 'Title',
  props: {
    titleName: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    showInTab() {
      if (isPlainObject(this.params) && !isEmpty(this.params)) { // 如果不是非空对象
        let COMPANY_ID = this.params.formData.companyId
        let DATA_TIME = this.params.formData.dataTime
        let param = {}

        if (this.params.hour === true) { // 整点报表（需要传具体时间）
          param = {
            tabId : this.params.tabId,
            tabName : this.params.tabName,
            url : `${this.params.url}&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME} 00:00&END_DATA_TIME=${DATA_TIME} 23:59`,
            isRefresh : this.params.isRefresh
          }
        } else {
          param = {
            tabId : this.params.tabId,
            tabName : this.params.tabName,
            url : `${this.params.url}&COMPANY_ID=${COMPANY_ID}&BEGIN_DATA_TIME=${DATA_TIME}&END_DATA_TIME=${DATA_TIME}`,
            isRefresh : this.params.isRefresh
          }
        }

        top.showInTab(param.tabId, param.tabName, param.url, param.isRefresh)
      } else {
        return
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  img {
    height: 16px;
  }
  .title-name {
    cursor: pointer;
    color: #20253A;
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
