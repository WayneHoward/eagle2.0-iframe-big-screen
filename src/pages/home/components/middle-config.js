// 纯柱状图
export function getBar1 () {
  const option = { // 配置图表信息
    color: ['#ff9e32', '#13afa0'],
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let returnData = '<div style="padding: 2px 10px;">'
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;">' + params[0].axisValue + '</span><br/>'
        for (let i = 0; i < params.length; i++) {
            returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>'
            returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + (params[i] && (params[i].value)) + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;">个</span><br/>'
        }
        returnData += '</div>'
        return returnData
      }
    },
    grid: {
      left: '6%',
      right: '2%',
      bottom: '5%',
      top: '17%',
      containLabel: true
    },
    legend: {
      data: ['优化前数量', '优化后数量'],
      right: '2%',
      // top: 20,
      textStyle: {
        color: '#74798C'
      },
      itemWidth: 16,
      itemHeight: 8
      // itemGap: 35
    },
    xAxis: {
      type: 'category',
      data: ['重载', '轻载', '经济运行', '空载', '其他'],
      axisLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        color: '#333333',
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        formatter: function (params) { // 超过五个字换行
          var newParamsName = ''
          var paramsNameNumber = params.length
          var provideNumber = 5 // 一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      }
    },

    yAxis: [{
      type: 'value',
      name: '设备数量（个）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 15]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    }
    ],
    series: [
      {
        name: '优化前数量',
        type: 'bar',
        barWidth: '10%',
        // data: [120, 120, 70, 110, 110, 110, 110, 50, 30, 30, 30, 110]
        data: this.COPPIRON_BEFORE
      },
      {
        name: '优化后数量',
        type: 'bar',
        barWidth: '10%',
        // data: [60, 130, 60, 60, 60, 60, 60, 60, 60, 70, 70, 50]
        data: this.COPPIRON_AFTER
      }
    ]
  }
  return option
}

// 纯柱状图
export function getBar2 () {
  const option = { // 配置图表信息
    title: {
      text: '负载率(%)',
      left: 'left',
      bottom: 'bottom',
      padding: [0, 0, 10, 20],
      textStyle: {
        fontSize: 12,
        color: '#A2A5AA',
      }
    },
    color: ['#ff9e32', '#13afa0'],
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let returnData = '<div style="padding: 2px 10px;">'
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;"> 负载率区间：' + params[0].axisValue + '</span><br/>'
        for (let i = 0; i < params.length; i++) {
            returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>'
            returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + (params[i] && (params[i].value)) + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;">个</span><br/>'
        }
        returnData += '</div>'
        return returnData
      }
    },
    grid: {
      left: '6%',
      right: '2%',
      bottom: '5%',
      top: '17%',
      containLabel: true
    },
    legend: {
      data: ['优化前数量', '优化后数量'],
      right: '2%',
      // top: 20,
      textStyle: {
        color: '#74798C'
      },
      itemWidth: 16,
      itemHeight: 8
      // itemGap: 35
    },
    xAxis: {
      type: 'category',
      data: ['<10%', '10%~30%', '30%~70%', '≥70%'],
      axisLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        color: '#333333',
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        formatter: function (params) { // 超过五个字换行
          var newParamsName = ''
          var paramsNameNumber = params.length
          var provideNumber = 8 // 一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      }
    },

    yAxis: [{
      type: 'value',
      name: '设备数量（个）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 15]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    }
    ],
    series: [
      {
        name: '优化前数量',
        type: 'bar',
        barWidth: '10%',
        // data: [60, 130, 60, 60, 60, 60, 60, 60, 60, 70, 70, 50]
        data: this.LOADRATE_BEFORE
      },
      {
        name: '优化后数量',
        type: 'bar',
        barWidth: '10%',
        // data: [120, 120, 70, 110, 110, 110, 110, 50, 30, 30, 30, 110]
        data: this.LOADRATE_AFTER
      }
    ]
  }
  return option
}

// 折线柱状图
export function getLineBar1 () {
  const option = { // 配置图表信息
    color: ['#ff9e32', '#13afa0', '#ff9e32', '#13afa0'],
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let returnData = '<div style="padding: 2px 10px;">'
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;"> 电压等级：' + params[0].axisValue + '</span><br/>'
        for (let i = 0; i < params.length; i++) {
            returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>'
            returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + (params[i] && (params[i].value)) + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;"></span><br/>'
        }
        returnData += '</div>'
        return returnData
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '5%',
      top: '17%',
      containLabel: true
    },
    legend: {
      data: ['优化前损耗电量', '优化后损耗电量', '优化前线损率', '优化后线损率'],
      right: '2%',
      // top: 20,
      textStyle: {
        color: '#74798C'
      },
      itemWidth: 16,
      itemHeight: 8
      // itemGap: 35
    },
    xAxis: {
      type: 'category',
      data: ['330kV', '110kV', '35kV'],
      axisLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        color: '#333333',
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        formatter: function (params) { // 超过五个字换行
          var newParamsName = ''
          var paramsNameNumber = params.length
          var provideNumber = 8 // 一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      }
    },

    yAxis: [{
      type: 'value',
      name: '损耗电量（MWh）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 15]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    },
    {
      type: 'value',
      name: '线损率（%）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 5]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    }
    ],
    series: [
      {
        name: '优化前损耗电量',
        type: 'bar',
        barWidth: '10%',
        yAxisIndex: 0,
        // data: [60, 130, 60]
        data: this.TOTALLOSSBEFORE
      },
      {
        name: '优化后损耗电量',
        type: 'bar',
        barWidth: '10%',
        yAxisIndex: 0,
        // data: [120, 120, 70]
        data: this.TOTALLOSS
      },
      {
        name: '优化前线损率',
        type: 'line',
        yAxisIndex: 1,
        // data: [1, 4, 3]
        data: this.TOTALLOSSRATEBEFORE
      },
      {
        name: '优化后线损率',
        type: 'line',
        yAxisIndex: 1,
        // data: [2, 7, 5]
        data: this.TOTALLOSSRATE
      },
    ]
  }
  return option
}

// 折线柱状图
export function getLineBar2 () {
  const option = { // 配置图表信息
    color: ['#13afa0', '#ff9e32', '#13afa0'],
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        let returnData = '<div style="padding: 2px 10px;">'
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;">' + params[0].axisValue + '</span><br/>'
        for (let i = 0; i < params.length; i++) {
            returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>'
            returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + (params[i] && (params[i].value)) + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;"></span><br/>'
        }
        returnData += '</div>'
        return returnData
      }
    },
    grid: {
      left: '6%',
      right: '6%',
      bottom: '5%',
      top: '17%',
      containLabel: true
    },
    legend: {
      data: ['供电量', '优化前线损率', '优化后线损率'],
      right: '2%',
      // top: 20,
      textStyle: {
        color: '#74798C'
      },
      itemWidth: 16,
      itemHeight: 8
      // itemGap: 35
    },
    xAxis: {
      type: 'category',
      data: this.dateTimeList,
      axisLine: {
        lineStyle: {
          color: '#CCCCCC',
          type: 'dashed'
        }
      },
      axisLabel: {
        // interval: 0,
        rotate: 45,
        color: '#333333',
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        formatter: function (params) { // 超过五个字换行
          var newParamsName = ''
          var paramsNameNumber = params.length
          var provideNumber = 10 // 一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      }
    },

    yAxis: [{
      type: 'value',
      name: '供电量（MWh）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 15]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    },
    {
      type: 'value',
      name: '线损率（%）',
      min: 0,
      max: function (value) {
        if (value.max > 10) return (parseInt(value.max) / 0.75).toFixed(0)
        else return (parseInt(value.max) / 0.75).toFixed(1)
      },
      // interval: 50,
      nameTextStyle: {
        color: '#A2A5AA',
        fontSize: 12,
        padding: [0, 0, 0, 5]
      },
      splitLine: {
        lineStyle: {
          color: '#CCCCCC', // 改轴颜色
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        formatter: '{value}',
        textStyle: {
          color: '#333333', // 改轴数值颜色
          fontSize: 12
        }
      }
    }
    ],
    series: [
      {
        name: '供电量',
        type: 'bar',
        barWidth: '5%',
        yAxisIndex: 0,
        // data: [1200, 1100, 700, 600, 1500, 2000, 1500, 1000]
        data: this.ACTIVE_POWER
      },
      {
        name: '优化前线损率',
        type: 'line',
        yAxisIndex: 1,
        // data: [1, 4, 3, 2, 5, 7, 8, 9]
        data: this.TOTAL_LOSS_RATE_BEFORE
      },
      {
        name: '优化后线损率',
        type: 'line',
        yAxisIndex: 1,
        // data: [2, 7, 5, 4, 3, 6, 9, 8]
        data: this.TOTAL_LOSS_RATE
      },
    ]
  }
  return option
}
