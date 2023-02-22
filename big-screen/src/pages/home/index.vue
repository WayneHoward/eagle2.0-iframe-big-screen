<template>
<div class="home" v-loading="loading">
    <div class="header">
      <el-form :inline="true" :model="formData" size="mini" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formData.companyId" disabled placeholder="请选择">
            <el-option
              v-for="item in companyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            :clearable="false"
            :editable="false"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="formData.dataTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <div class="top">
        <div class="topLeft">
          <TopLeft
            ref="topLeft"
            :formData="formData"
          ></TopLeft>
        </div>
        <div class="topCenter">
          <TopCenter
            ref="topCenter"
            :formData="formData"
          ></TopCenter>
        </div>
        <div class="topRight">
          <TopRight
            ref="topRight"
            :formData="formData"
          ></TopRight>
        </div>
      </div>
      <div class="middle">
        <div class="middleLeft">
          <MiddleLeft
            ref="middleLeft"
            :formData="formData"
          ></MiddleLeft>
        </div>
        <div class="middleCenter">
          <MiddleCenter
            ref="middleCenter"
            :formData="formData"
          ></MiddleCenter>
        </div>
        <div class="middleRight">
          <MiddleRight
            ref="middleRight"
            :formData="formData"
          ></MiddleRight>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomLeft">
          <BottomLeft
            ref="bottomLeft"
            :formData="formData"
          ></BottomLeft>
        </div>
        <div class="bottomCenter">
          <BottomCenter
            ref="bottomCenter"
            :formData="formData"
          ></BottomCenter>
        </div>
        <div class="bottomRight">
          <BottomRight
            ref="bottomRight"
            :formData="formData"
          ></BottomRight>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'

import TopLeft from './components/top-left'
import TopCenter from './components/top-center'
import TopRight from './components/top-right'
import MiddleLeft from './components/middle-left'
import MiddleCenter from './components/middle-center'
import MiddleRight from './components/middle-right'
import BottomLeft from './components/bottom-left'
import BottomCenter from './components/bottom-center'
import BottomRight from './components/bottom-right'

import {
  getFindTransQuantityAction, // 输电网规模
  getFindTranRpoBaseInfoAction, // 输电网基本情况、输电网优化措施
  getFindRpoPowerTransformerEconomicAction, // 主变运行情况对比
  getFindRpoWholeLossVoltageAction, // 全网分压对比、近7日全网线损率对比
  getFindRpoACLineSegmentListAction, // 线路运行情况对比
  getFindRpoStandardRateListAction, // 电压合格率对比
  getFindRpoOptimOutListAction // 无功补偿装置容量对比
} from '@/api/big-screen'

export default {
  name: 'HomeBigScreen',
  components: {
    TopLeft,
    TopCenter,
    TopRight,
    MiddleLeft,
    MiddleCenter,
    MiddleRight,
    BottomLeft,
    BottomCenter,
    BottomRight
  },

  data() {
    return {
      loading: false,

      companyOptions: [],

      formData: {
        companyId: '',

        dataTime: dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      }
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.$nextTick(_ => {
        this.companyOptions = [
          {
            value: window.eagle2CompanyId,
            label: window.eagle2CompanyName
          }
        ]

        this.formData.companyId = window.eagle2CompanyId

        let cookieArr = document.cookie.split('; ')

        if (cookieArr.length > 0) {
          cookieArr.forEach(item => {
            if (item.split('=')[0] == 'dataTime') {
              this.formData.dataTime = item.split('=')[1]
            }
          })
        }

        this.loadData()
      })
    },

    loadData() {
      this.loading = true

      Promise.all([
        getFindTransQuantityAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 输电网规模
        getFindTranRpoBaseInfoAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 输电网基本情况、输电网优化措施
        getFindRpoPowerTransformerEconomicAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 主变运行情况对比
        getFindRpoWholeLossVoltageAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 全网分压对比
        getFindRpoACLineSegmentListAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 线路运行情况对比
        getFindRpoStandardRateListAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }), // 电压合格率对比
        getFindRpoOptimOutListAction({ companyId: this.formData.companyId, dataTime: this.formData.dataTime }) // 无功补偿装置容量对比
      ]).then(([
        topLeftResult, // 输电网规模
        topCenterRightResult, // 输电网基本情况、输电网优化措施
        middleLeftResult, // 主变运行情况对比
        middleCenterRightResult, // 全网分压对比、近7日全网线损率对比
        bottomLeftResult, // 线路运行情况对比
        bottomCenterResult, // 电压合格率对比
        bottomRightResult, // 无功补偿装置容量对比
      ]) => {
        this.$refs.topLeft.loadData(topLeftResult)
        this.$refs.topCenter.loadData(topCenterRightResult)
        this.$refs.topRight.loadData(topCenterRightResult)
        this.$refs.middleLeft.loadData(middleLeftResult)
        this.$refs.middleCenter.loadData(middleCenterRightResult)
        this.$refs.middleRight.loadData(middleCenterRightResult)
        this.$refs.bottomLeft.loadData(bottomLeftResult)
        this.$refs.bottomCenter.loadData(bottomCenterResult)
        this.$refs.bottomRight.loadData(bottomRightResult)
      }).finally(_ => {
        this.loading = false
      })
    }
  },

  watch: {
    'formData.dataTime': {
      handler(val) {
        document.cookie=`dataTime=${val}`;

        this.loadData()
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
  background-color: #e8f0f0;
  padding: 10px;
  box-sizing: border-box;
  .header {
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  .body {
    width: 100%;
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    .top {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .topLeft, .topCenter, .topRight {
        border-radius: 10px;
        width: 33%;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 3px 4px 6px #dde1e2;
      }
    }
    .middle {
      margin-top: 10px;
      box-sizing: border-box;
      flex: 2.5;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .middleLeft, .middleCenter, .middleRight {
        border-radius: 10px;
        width: 33%;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 3px 4px 6px #dde1e2;
      }
    }
    .bottom {
      margin-top: 10px;
      box-sizing: border-box;
      flex: 2.5;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .bottomLeft, .bottomCenter, .bottomRight {
        border-radius: 10px;
        width: 33%;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 3px 4px 6px #dde1e2;
      }
    }
  }
}

::v-deep {
  .el-form-item, .el-form-item--mini.el-form-item {
    box-sizing: border-box;
    margin-bottom: 0px;
  }

  .el-form {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
