<template>
  <div class="content">
    <Title titleName="输电网优化措施" ref="title" :params="params"></Title>
    <div class="ul-wrapper">
      <ul class="block">
        <li>
          <div class="icon">
            <img src="../assets/09.png" alt="">
          </div>
          <div class="name">优化设备</div>
          <div class="data">
            <div class="number">{{RPOPSRNUM}}</div>
            <div class="company">台</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/10.png" alt="">
          </div>
          <div class="name">年节电量</div>
          <div class="data">
            <div class="number">{{YEARTOTALSAVED}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/011.png" alt="">
          </div>
          <div class="name">CO2减排量</div>
          <div class="data">
            <div class="number">{{CO2REDUCTION}}</div>
            <div class="company">万kg</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from './title'

export default {
  name: 'TopRight',
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Title
  },
  data() {
    return {
      RPOPSRNUM: '0', // 优化设备

      YEARTOTALSAVED: '0', // 年节电量

      CO2REDUCTION: '0', // CO2减排量

      params: {
        hour: false,
        formData: this.formData,
        tabId: '4028801b5d52bb79015d54e49d2202b2',
        tabName: '无功优化策略结果表',
        url: 'eagle2HummerRootPath+hummer/report.action?queryId=4028801b5d53022d015d54a6833e0070',
        isRefresh: true
      }
    };
  },
  methods: {
    loadData(data) {
      this.RPOPSRNUM = data && data.RPOPSRNUM ? data.RPOPSRNUM : '0'
      this.YEARTOTALSAVED = data && data.YEARTOTALSAVED ? data.YEARTOTALSAVED : '0'
      this.CO2REDUCTION = data && data.CO2REDUCTION ? data.CO2REDUCTION : '0'
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ul-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.block {
  height: 100%;
  flex: 1;
  overflow: hidden;
  margin: 10px 5px;
  display: flex;
  justify-content: space-between;
  // background-color: #f8fafa;
  border-radius: 10px;
  li {
    height: 100%;
    width: 33%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    white-space: nowrap;
    .icon {
      img {
        height: 20px;
      }
      margin-bottom: 5px;
      box-sizing: border-box;
    }
    .name {
      color: #74798C;
      font-size: 12px;
      margin-bottom: 5px;
      box-sizing: border-box;
    }
    .data {
      color: #282D30;
      display: flex;
      align-items: flex-end;
      .number {
        font-size: 16px;
      }
      .company {
        font-size: 12px;
      }
    }
    &:after {
      content: '';
      position: absolute;
      left: auto;
      top: auto;
      bottom: 50%;
      transform: translateY(50%);
      right: 0;
      height: 30%;
      width: 1px;
      background-color: #d1d1d1;
    }
    &:last-child {
      &:after {
        width: 0px;
      }
    }
  }
}
</style>
