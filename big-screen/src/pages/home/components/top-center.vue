<template>
  <div class="content">
    <Title titleName="输电网基本情况" ref="title" :params="params"></Title>
    <div class="ul-wrapper">
      <ul class="block">
        <li>
          <div class="icon">
            <img src="../assets/06.png" alt="">
          </div>
          <div class="name">供电量</div>
          <div class="data">
            <div class="dock">
              <img src="../assets/dock.png" alt="dock.png">
            </div>
            <div class="number">{{ACTIVEPOWERBEFORE}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/07.png" alt="">
          </div>
          <div class="name">总损耗</div>
          <div class="data">
            <div class="dock">
              <img src="../assets/dock.png" alt="dock.png">
            </div>
            <div class="number">{{TOTALLOSSBEFORE}}</div>
            <div class="company">万kWh</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/08.png" alt="">
          </div>
          <div class="name">线损率</div>
          <div class="data">
            <div class="dock">
              <img src="../assets/dock.png" alt="dock.png">
            </div>
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
      ACTIVEPOWERBEFORE: '0', // 供电量

      TOTALLOSSBEFORE: '0', // 总损耗

      TOTALLOSSRATEBEFORE: '0', // 线损率

      params: {
        hour: false,
        formData: this.formData,
        tabId: '4028b8815d5f0e1d015d5fbebd790005',
        tabName: '全网总损耗结果对比表（日）',
        url: 'eagle2HummerRootPath+hummer/report.action?queryId=4028801b5d5828d9015d58ba3b900000&ISNOLOSS=1',
        isRefresh: true
      }
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
    // background-image: url('../assets/dock.png');
    // background-repeat: no-repeat;
    // background-size: 50%;
    // background-position: 50% 90%;
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
      position: relative;
      line-height: 16px;
      .dock {
        img {
          height: 35px;
        }
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -20px;
      }
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
