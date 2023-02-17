<template>
  <div class="content">
    <Title titleName="输电网优化措施"></Title>
    <div class="ul-wrapper">
      <ul class="block">
        <li>
          <div class="name">优化设备</div>
          <div class="data">
            <div class="number">{{RPOPSRNUM}}</div>
            <div class="company">台</div>
          </div>
        </li>
        <li>
          <div class="name">年节电量</div>
          <div class="data">
            <div class="number">{{YEARTOTALSAVED}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
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
  name: 'TopLeft',
  components: {
    Title
  },
  data() {
    return {
      RPOPSRNUM: '0', // 优化设备

      YEARTOTALSAVED: '0', // 年节电量

      CO2REDUCTION: '0' // CO2减排量
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
