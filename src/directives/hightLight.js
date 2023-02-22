/**
 * @Description: 搜索关键字高亮
 *
 */
const highlight = (el, binding, vnode) => {
  const match = binding.value.trim()
  const reg = new RegExp(match, 'g')
  const txt = el.innerText || binding.arg
  let str = ''
  if (txt) {
    str = txt.replace(reg, `<span class="highlight">${match}</span>`)
  } else {
    str = ''
  }
  el.innerHTML = str
}
export default {
  'highlight': {
    // 初始化（只调用一次）
    bind(el, binding, vnode) {
      highlight(el, binding, vnode)
    },
    // 更新节点
    update(el, binding, vnode) {
      highlight(el, binding, vnode)
    }
  }
}
