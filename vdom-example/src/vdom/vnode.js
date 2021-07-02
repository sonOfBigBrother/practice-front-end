// 通过symbol保证唯一性，用于检测是不是vnode对象
const VNODE_TYPE = Symbol("virtual-node");

/**
 * @param {String} sel 'div' 标签名;可以是元素的选择器 可参考jq
 * @param {Object} data {'style': {background:'red'}} 对应的Vnode绑定的数据属性集
 * 包括attribute、 eventlistener、 props， style、hook等等
 * @param {Array} children [ h(), 'text'] 子元素集
 * @param {String} text当前的text 文本 itemA
 * @param {Element} elm 对应的真实的dom元素的引用
 * @param {String} key  唯一 用于不同vnode之前的比对
 * @return {Object}  vnode
 */

function vnode(sel, data = {}, children, key, text, elm) {
  return {
    _type: VNODE_TYPE,
    sel,
    data,
    children,
    key,
    text,
    elm,
  };
}
export default vnode;
