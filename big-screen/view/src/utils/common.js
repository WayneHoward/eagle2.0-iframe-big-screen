import Pinyin from 'js-pinyin'

/**
 * 数组排序
 * @param arr 传入数组
 * @param name 排序字段
 * @param sort 排序方式 desc: 降序，asc：升序
 * @returns {*}
 */
const sequence = (arr, name) => {
  return arr.sort(compare(name))
}
// 对比
const compare = (property) => {
  return function(b, a) {
    const value1 = a[property]
    const value2 = b[property]
    return Pinyin.getFullChars(value2).localeCompare(Pinyin.getFullChars(value1))
  }
}
export function sortByFirstLetter(origin, arg) {
  origin = sequence(origin, arg)
  // 将目标数据进行排序
  const newArr = []
  const keyArr = []
  origin.map((item, itemIndex) => {
    // 取首字母
    let key = Pinyin.getFullChars(item[arg]).charAt(0).toUpperCase()
    if (!/^[A-Za-z]+$/.test(key)) {
      key = '#'
    }
    item.src = item.sex ? require(`@/assets/female.png`) : require(`@/assets/male.png`)
    const index = newArr.findIndex(subItem => subItem.key === key)
    if (index < 0) {
      newArr.push({
        key: key,
        list: [item]
      })
      keyArr.push(key)
    } else {
      newArr[index].list.push(item)
    }
  })
  if (newArr[0].key === '#') {
    newArr.push(newArr.shift())
  }
  return {
    data: newArr,
    key: keyArr
  }
}
