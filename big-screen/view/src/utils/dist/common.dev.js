'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.sortByFirstLetter = sortByFirstLetter
exports.RECArray = RECArray

var _jsPinyin = _interopRequireDefault(require('js-pinyin'))

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread() { throw new TypeError('Invalid attempt to spread non-iterable instance') }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]') return Array.from(iter) }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i] } return arr2 } }

function sortByFirstLetter(origin, arg) {
  var originData = RECArray(origin, arg) // 将目标数据进行排序

  originData = originData.sort(function(pre, next) {
    console.log(_jsPinyin['default'].getFullChars(next), _jsPinyin['default'].getFullChars(pre).localeCompare(_jsPinyin['default'].getFullChars(next)), pre, next)

    _jsPinyin['default'].getFullChars(pre).localeCompare(_jsPinyin['default'].getFullChars(next))
  })
  var newArr = []
  var keyArr = []
  originData.map(function(item) {
    // 取首字母
    var key = _jsPinyin['default'].getFullChars(item).charAt(0).toUpperCase()

    if (!/^[A-Za-z]+$/.test(key)) {
      key = '#'
    }

    item = origin.find(function(subItem) {
      return subItem.userName === item
    })
    item.src = item.sex ? require('@/assets/female.png') : require('@/assets/male.png')
    var index = newArr.findIndex(function(subItem) {
      return subItem.key === key
    })

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
/**
 * 数组降维
 * @param arr 目标数组
 * @param arg 键名
 * @returns {Array|*} 简单数组
 * @example arr: []
 */

function RECArray(arr, arg) {
  return arr.reduce(function(item, next) {
    if (next[arg]) {
      item.push(next[arg])
    }

    return _toConsumableArray(new Set(item))
  }, [])
}
