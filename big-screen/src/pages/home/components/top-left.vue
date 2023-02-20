<template>
  <div class="content">
    <div class="title">
      <img src="../assets/title-icon.png" alt="title-icon">
      <div class="title-name">
        输电网规模
      </div>
      <ul class="tabs">
        <li
          v-for="(item, index) in tabs"
          :key="index"
          :class="tabValue === item.value ? 'light' : ''"
          @click="tabClick(item.value)"
        >
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="ul-wrapper">
      <ul class="block">
        <li>
          <div class="icon">
            <img src="../assets/01.png" alt="">
          </div>
          <div class="name">变电站数量</div>
          <div class="data">
            <div class="number" v-if="tabValue == ''">{{SUBSNUMAll}}</div>
            <div class="number" v-if="tabValue == '330kV'">{{SUBSNUM330}}</div>
            <div class="number" v-if="tabValue == '110kV'">{{SUBSNUM110}}</div>
            <div class="number" v-if="tabValue == '35kV'">{{SUBSNUM35}}</div>
            <div class="company">座</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/02.png" alt="">
          </div>
          <div class="name">主变数量</div>
          <div class="data">
            <div class="number" v-if="tabValue == ''">{{TRANNUMAll}}</div>
            <div class="number" v-if="tabValue == '330kV'">{{TRANNUM330}}</div>
            <div class="number" v-if="tabValue == '110kV'">{{TRANNUM110}}</div>
            <div class="number" v-if="tabValue == '35kV'">{{TRANNUM35}}</div>
            <div class="company">台</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/03.png" alt="">
          </div>
          <div class="name">主变容量</div>
          <div class="data">
            <div class="number" v-if="tabValue == ''">{{TRANCAPAll}}</div>
            <div class="number" v-if="tabValue == '330kV'">{{TRANCAP330}}</div>
            <div class="number" v-if="tabValue == '110kV'">{{TRANCAP110}}</div>
            <div class="number" v-if="tabValue == '35kV'">{{TRANCAP35}}</div>
            <div class="company">MVA</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/04.png" alt="">
          </div>
          <div class="name">线路条数</div>
          <div class="data">
            <div class="number" v-if="tabValue == ''">{{LINENUMAll}}</div>
            <div class="number" v-if="tabValue == '330kV'">{{LINENUM330}}</div>
            <div class="number" v-if="tabValue == '110kV'">{{LINENUM110}}</div>
            <div class="number" v-if="tabValue == '35kV'">{{LINENUM35}}</div>
            <div class="company">条</div>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="../assets/05.png" alt="">
          </div>
          <div class="name">线路长度</div>
          <div class="data">
            <div class="number" v-if="tabValue == ''">{{LINELENGTHAll}}</div>
            <div class="number" v-if="tabValue == '330kV'">{{LINELENGTH330}}</div>
            <div class="number" v-if="tabValue == '110kV'">{{LINELENGTH110}}</div>
            <div class="number" v-if="tabValue == '35kV'">{{LINELENGTH35}}</div>
            <div class="company">km</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopLeft',
  data() {
    return {
      tabValue: '',
      tabs: [
        {
          value: '',
          label: '全网'
        },
        {
          value: '330kV',
          label: '330kV'
        },
        {
          value: '110kV',
          label: '110kV'
        },
        {
          value: '35kV',
          label: '35kV'
        }
      ],

      SUBSNUMAll: '0', // 变电站数量all
      TRANNUMAll: '0', // 主变数量all
      TRANCAPAll: '0', // 主变容量all
      LINENUMAll: '0', // 线路条数条all
      LINELENGTHAll: '0', // 线路长度all

      SUBSNUM330: '0', // 变电站数量330
      TRANNUM330: '0', // 主变数量330
      TRANCAP330: '0', // 主变容量330
      LINENUM330: '0', // 线路条数条330
      LINELENGTH330: '0', // 线路长度330

      SUBSNUM110: '0', // 变电站数量110
      TRANNUM110: '0', // 主变数量110
      TRANCAP110: '0', // 主变容量110
      LINENUM110: '0', // 线路条数条110
      LINELENGTH110: '0', // 线路长度110

      SUBSNUM35: '0', // 变电站数量35
      TRANNUM35: '0', // 主变数量35
      TRANCAP35: '0', // 主变容量35
      LINENUM35: '0', // 线路条数条35
      LINELENGTH35: '0', // 线路长度35

    };
  },
  methods: {
    loadData(data) {
      this.SUBSNUMAll = data && data['all'] ? data['all'].SUBSNUM : '0'
      this.TRANNUMAll = data && data['all'] ? data['all'].TRANNUM : '0'
      this.TRANCAPAll = data && data['all'] ? data['all'].TRANCAP : '0'
      this.LINENUMAll = data && data['all'] ? data['all'].LINENUM : '0'
      this.LINELENGTHAll = data && data['all'] ? data['all'].LINELENGTH : '0'

      this.SUBSNUM330 = data && data['330'] ? data['330'].SUBSNUM : '0'
      this.TRANNUM330 = data && data['330'] ? data['330'].TRANNUM : '0'
      this.TRANCAP330 = data && data['330'] ? data['330'].TRANCAP : '0'
      this.LINENUM330 = data && data['330'] ? data['330'].LINENUM : '0'
      this.LINELENGTH330 = data && data['330'] ? data['330'].LINELENGTH : '0'

      this.SUBSNUM110 = data && data['110'] ? data['110'].SUBSNUM : '0'
      this.TRANNUM110 = data && data['110'] ? data['110'].TRANNUM : '0'
      this.TRANCAP110 = data && data['110'] ? data['110'].TRANCAP : '0'
      this.LINENUM110 = data && data['110'] ? data['110'].LINENUM : '0'
      this.LINELENGTH110 = data && data['110'] ? data['110'].LINELENGTH : '0'

      this.SUBSNUM35 = data && data['35'] ? data['35'].SUBSNUM : '0'
      this.TRANNUM35 = data && data['35'] ? data['35'].TRANNUM : '0'
      this.TRANCAP35 = data && data['35'] ? data['35'].TRANCAP : '0'
      this.LINENUM35 = data && data['35'] ? data['35'].LINENUM : '0'
      this.LINELENGTH35 = data && data['35'] ? data['35'].LINELENGTH : '0'
    },

    tabClick(value) {
      this.tabValue = value
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    position: relative;
    box-sizing: border-box;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    img {
      height: 16px;
    }
    .title-name {
      color: #20253A;
      font-size: 14px;
      margin-left: 5px;
    }
    .tabs {
      top: -5px;
      right: -5px;
      position: absolute;
      display: flex;
      justify-content: center;
      font-size: 12px;
      padding: 5px;
      li {
        cursor: pointer;
        padding: 5px 20px;
        box-sizing: border-box;
        color: #74798C;
        // background-color: #f1f1f1;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          left: auto;
          top: auto;
          bottom: 50%;
          transform: translateY(50%);
          right: 0;
          height: 50%;
          width: 1px;
          background-color: #d1d1d1;
        }
        &:nth-child(1) {
          border-radius: 10px 0px 0px 0px;
        }
        &:last-child {
          border-radius: 0px 10px 0px 0px;
          &:after {
            width: 0px;
          }
        }
      }
      .light {
        color: #fff;
        background-color: #62b5aa;
        &:after {
          width: 0px;
        }
      }
    }
  }
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
  margin: 0px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  li {
    height: 100%;
    // background-color: #f8fafa;
    width: 20%;
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
    &:nth-child(1) {
      border-radius: 10px 0px 0px 10px;
    }
    &:last-child {
      border-radius: 0px 10px 10px 0px;
      &:after {
        width: 0px;
      }
    }
  }
}
</style>
