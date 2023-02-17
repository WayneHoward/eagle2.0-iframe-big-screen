<template>
  <div class="content">
    <Title titleName="输电网基本情况"></Title>
    <div class="ul-wrapper">
      <ul class="block">
        <li>
          <div class="name">供电量</div>
          <div class="data">
            <div class="number">{{ACTIVEPOWERBEFORE}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
          <div class="name">总损耗</div>
          <div class="data">
            <div class="number">{{TOTALLOSSBEFORE}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
          <div class="name">线损率</div>
          <div class="data">
            <div class="number">{{TOTALLOSSRATEBEFORE}}</div>
            <div class="company">%</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from './title'

export default {
  name: 'TopCenter',
  components: {
    Title
  },
  data() {
    return {
      ACTIVEPOWERBEFORE: '0', // 供电量

      TOTALLOSSBEFORE: '0', // 总损耗

      TOTALLOSSRATEBEFORE: '0' // 线损率
    };
  },
  methods: {
    loadData(data) {
      this.ACTIVEPOWERBEFORE = data && data.ACTIVEPOWERBEFORE ? data.ACTIVEPOWERBEFORE : '0'
      this.TOTALLOSSBEFORE = data && data.TOTALLOSSBEFORE ? data.TOTALLOSSBEFORE : '0'
      this.TOTALLOSSRATEBEFORE = data && data.TOTALLOSSRATEBEFORE ? data.TOTALLOSSRATEBEFORE : '0'
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
  flex: 1;
  overflow: hidden;
  margin: 10px 5px;
  display: flex;
  justify-content: space-between;
  // background-color: #f8fafa;
  border-radius: 10px;
  li {
    width: 33%;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    white-space: nowrap;
    .name {
      color: #74798C;
      font-size: 12px;
      margin-bottom: 5px;
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
