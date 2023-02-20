import request from '@/utils/request'

// 输电网规模
export function getFindTransQuantityAction(params) {
  return request.get('/eagle2/dac/application/controller/transmission/panoramic/FindTransQuantity.action', { params })
}

// 输电网基本情况、输电网优化措施
export function getFindTranRpoBaseInfoAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindTranRpoBaseInfo.action', { params })
}

// 主变运行情况对比
export function getFindRpoPowerTransformerEconomicAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoPowerTransformerEconomic.action', { params })
}

// 全网分压对比、近7日全网线损率对比
export function getFindRpoWholeLossVoltageAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoWholeLossVoltage.action', { params })
}

//
export function getFindRpoWholeLossListAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoWholeLossList.action', { params })
}

// 线路运行情况对比
export function getFindRpoACLineSegmentListAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoACLineSegmentList.action', { params })
}

// 电压合格率对比
export function getFindRpoStandardRateListAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoStandardRateList.action', { params })
}

// 无功补偿装置容量对比
export function getFindRpoOptimOutListAction(params) {
  return request.get('/eagle2/llt/application/controller/tranrpo/panoramic/FindRpoOptimOutList.action', { params })
}
