// 不考虑hook

import htmlApi from "./domUtils";
import { isArray, isPrimitive, isUndef } from "./utils";
import attr from './updateAttrUtils';

/**
 * 从虚拟节点中生成真实的dom节点
 * @param {Object} vnode 
 * @returns 
 */
function createElement(vnode) {
  let { sel, data, children, text, elm } = vnode;
  // 如果没有选择器/标签名，则说明这是一个文本节点
  if (isUndef(sel)) {
    elm = vnode.elm = htmlApi.createTextNode(text);
  } else {
    elm = vnode.elm = analysisSel(sel);
    attr.initCreateAttr(vnode);
    // 如果存在子元素节点，递归子元素插入到elm中引用
    if (isArray(children)) {
      // analysisChildrenFun(children, elm);
      children.forEach((c) => {
        htmlApi.appendChild(elm, createElement(c));
      });
    } else if (isPrimitive(text)) {
      // 子元素是文本节点直接插入当前到vnode节点
      htmlApi.appendChild(elm, htmlApi.createTextNode(text));
    }
  }

  return vnode.elm;
}

function patch(container, vnode) {
  console.log(container, vnode);
  let elm = createElement(vnode);
  console.log(elm);
  container.appendChild(elm);
}

/**
 * 解析sel 因为有可能是 div#divId.divClass - > id = "divId" class = "divClass"
 *
 * @param {String} sel
 * @returns {Element} 元素节点
 */
function analysisSel(sel) {
  if (isUndef(sel)) return;
  let elm;
  let idx = sel.indexOf("#");
  let selLength = sel.length;
  let classIdx = sel.indexOf(".", idx);
  let idIndex = idx > 0 ? idx : selLength;
  let classIndex = classIdx > 0 ? classIdx : selLength;
  let tag =
    idIndex != -1 || classIndex != -1
      ? sel.slice(0, Math.min(idIndex, classIndex))
      : sel;
  // 创建一个DOM节点，并且从虚拟dom上返回elm引用
  elm = htmlApi.createElement(tag);
  // 获取id #divId -> divId
  if (idIndex < classIndex) elm.id = sel.slice(idIndex + 1, classIndex);
  // 如果sel中有多个类名 如 .a.b.c -> a b c
  if (classIdx > 0)
    elm.className = sel.slice(classIndex + 1).replace(/\./g, " ");
  return elm;
}

// 如果存在子元素节点，递归子元素插入到elm中引用
function analysisChildrenFun(children, elm) {
  children.forEach((c) => {
    htmlApi.appendChild(elm, createElement(c));
  });
}

export default patch;
