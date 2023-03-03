// 纯柱状图
export function getBar1 () {
  const option = { // 配置图表信息
    title: {
      text: '线损率区间',
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
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;">线损率区间：' + params[0].axisValue + '</span><br/>'
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
      data: ['>1.0%', '0.5%~1.0%', '0.2%~0.5%', '≤0.2%'],
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
        // data: [70, 50, 30, 60]
        data: this.before
      },
      {
        name: '优化后数量',
        type: 'bar',
        barWidth: '10%',
        // data: [60, 40, 70, 50]
        data: this.after
      }
    ]
  }
  return option
}

// 纯折线图
export function getLine1 () {
  const option = { // 配置图表信息
    color: ['#ff9e32', '#13afa0'],
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        if (params.length > 1) {
          let returnData = '<div style="padding: 2px 10px;">'
          returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff;">电压等级：' + params[0].axisValue + '</span><br/>'
          for (let i = 0; i < params.length; i++) {
            if (params[i].seriesType === 'line') {
              returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>'
              returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + (params[i] && (params[i].value)) + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;">%</span><br/>'
            }
          }
          returnData += '</div>'
          return returnData
        }
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
      data: ['优化前电压合格率', '优化后电压合格率'],
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
      name: '电压合格率（%）',
      min: 0,
      max: 100,
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
        name: '优化前电压合格率',
        type: 'line',
        areaStyle: {
          opacity: 1,
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                  offset: 0,
                  color: `rgba(0, 165, 149, .1)`
              },
              {
                  offset: 0.8,
                  color: 'rgba(0, 0, 0, 0)'
              },
            ]
          },
          shadowColor: 'rgba(0, 0, 0, 0)',
          shadowBlur: 10
        },
        // data: [20, 40, 30]
        data: this.before
      },
      {
        name: '优化后电压合格率',
        type: 'line',
        areaStyle: {
          opacity: 1,
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                  offset: 0,
                  color: `rgba(242, 161, 75, .1)`
              },
              {
                  offset: 0.8,
                  color: 'rgba(0, 0, 0, 0)'
              }
            ]
          },
          shadowColor: 'rgba(0, 0, 0, 0)',
          shadowBlur: 10
        },
        // data: [50, 55, 70]
        data: this.after
      },
      {
        type: 'bar',
        barWidth: '20%',
        barGap: '-100%',
        data: [100, 100, 100],
        itemStyle: {
          normal: {
            color: 'rgba(0, 165, 149, .1)',
          }
        },
      },
    ]
  }
  return option
}

// 左右横向柱状图
export function getDoubleBar(leftData, rightData, company) {
  let xData = ['330kV', '110kV', '35kV']
  let legend = company
  let option = {
    // backgroundColor: '#0a142f',
    color: ['#ff9136', '#13afa0'],
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
            returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: #fff; ">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 12px; color: ' + params[i].color + '">' + ((params[i] && params[i].value) ? params[i].value : '0') + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: #fff;"></span><br/>'
        }
        returnData += '</div>'
        return returnData
      }
    },
    legend: {
      top: '5%',
      right: 'center',
      width: '100%',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 130,
      orient: 'horizontal',
      textStyle: {
        fontSize: 12,
        color: '#818181',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: legend,
    },
    grid: [
      {
        show: false,
        left: '10%',
        top: '15%',
        bottom: '11%',
        containLabel: true,
        width: '34%',
      },
      {
        show: false,
        left: '51%',
        top: '15%',
        bottom: '11%',
        width: '0%',
      },
      {
        show: false,
        right: '10%',
        top: '15%',
        bottom: '11%',
        containLabel: true,
        width: '34%',
      },
    ],
    xAxis: [
      {
        type: 'value',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: { show: false },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.15)',
          },
        },
      },
      {
        gridIndex: 1,
        show: false,
      },
      {
        gridIndex: 2,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: { show: false },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.15)',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'category',
        inverse: true,
        position: 'right',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitArea: { show: false },
        axisLabel: {
          show: false,
        },
        data: xData,
      },
      {
        gridIndex: 1,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: '#818181',
          fontSize: 12,
        },
        data: xData.map((value) => {
          let str = value.length > 6 ? value.substring(0, 6) + '...' : value
          return {
            value: str,
            textStyle: {
              align: 'center',
            },
          }
        }),
      },
      {
        gridIndex: 2,
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: xData,
      },
    ],
    series: [
      {
        name: legend[0],
        type: 'bar',
        barWidth: '30%',
        stack: '1',
        label: {
          normal: {
            show: true,
            position: 'left',
            color: '#818181',
            fontSize: 12,
            fontFamily: 'Bebas',
          },
        },
        // itemStyle: {
        //   normal: {
        //     barBorderRadius: [30, 0, 0, 30],
        //   },
        // },
        data: leftData,
        // data: [241, 100, 23],
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(242, 161, 75, .1)'
        },
        animationEasing: 'elasticOut',
      },
      {
        name: legend[1],
        type: 'bar',
        stack: '2',
        barWidth: '30%',
        xAxisIndex: 2,
        yAxisIndex: 2,
        label: {
          normal: {
            show: true,
            position: 'right',
            color: '#818181',
            fontSize: 12,
            fontFamily: 'Bebas',
          },
        },
        // itemStyle: {
        //   normal: {
        //     barBorderRadius: [0, 30, 30, 0],
        //   },
        // },
        data: rightData,
        // data: [255, 23, 145],
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(0, 165, 149, .1)'
        },
        animationEasing: 'elasticOut',
      }
    ],
  };
  return option
}
