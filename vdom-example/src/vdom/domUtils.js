/**
 * DOM操作的方法
 * 元素/节点的创建、删除、判断等
 */

function createElement(tagName) {
  return document.createElement(tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function isElement(node) {
  return node.nodeType === 1;
}

function isText(node) {
  return node.nodeType === 3;
}

export const htmlApi = {
  createElement,
  createTextNode,
  appendChild,
};
export default htmlApi;
