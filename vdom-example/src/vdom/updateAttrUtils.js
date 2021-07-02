import { isArray } from "./utils";

/**
 *更新style属性
 *
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {Object} oldStyle
 * @returns
 */
function undateStyle(vnode, oldStyle = {}) {
  let doElement = vnode.elm;
  let newStyle = vnode.data.style || {};

  // 删除style
  for (let oldAttr in oldStyle) {
    if (!newStyle[oldAttr]) {
      doElement.style[oldAttr] = "";
    }
  }

  // 更新style
  for (let newAttr in newStyle) {
    doElement.style[newAttr] = newStyle[newAttr];
  }
}

function filterKeys(obj) {
  return Object.keys(obj).filter((k) => {
    return k !== "style" && k !== "id" && k !== "class";
  });
}

/**
 * 更新props属性
 * 支持vnode使用props来操作其它属性。
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {Object} oldProps
 * @returns
 */
function undateProps(vnode, oldProps = {}) {
  let doElement = vnode.elm;
  let props = vnode.data.props || {};

  //刪除props中的屬性
  filterKeys(oldProps).forEach((key) => {
    if (!props[key]) {
      delete doElement[key];
    }
  });

  filterKeys(props).forEach((key) => {
    let old = oldProps[key];
    let cur = props[key];
    if (old !== cur && (key !== "value" || doElement[key] !== cur)) {
      doElement[key] = cur;
    }
  });
}

/**
 *更新className属性 html 中的class
 * 支持 vnode 使用 props 来操作其它属性。
 * @param {Object} vnode 新的虚拟dom节点对象
 * @param {*} oldName
 * @returns
 */
function updateClassName(vnode, oldName) {
  let doElement = vnode.elm;
  const newName = vnode.data.className;

  if (!oldName && !newName) return;
  if (oldName === newName) return;

  if (typeof newName === "string" && newName) {
    doElement.className = newName.toString(); //为什么要toString?
  } else if (isArray(newName)) {
    let oldList = [...doElement.classList];
    oldList.forEach((c) => {
      //旧class不在新的class列表中就从元素的classList中移除
      if (newName.indexOf(c) == -1) {
        doElement.classList.remove(c);
      }
    });
    newName.forEach((v) => {
      doElement.classList.add(v);
    });
  } else {
    // 所有不合法的值或者空值，都把 className 设为 ''
    doElement.className = "";
  }
}

function initCreateAttr(vnode) {
  updateClassName(vnode);
  undateProps(vnode);
  undateStyle(vnode);
}

function updateAttrs(oldVnode, vnode) {
  updateClassName(vnode, oldVnode.data.className);
  undateProps(vnode, oldVnode.data.props);
  undateStyle(vnode, oldVnode.data.style);
}

export const styleApis = {
  undateStyle,
  undateProps,
  updateClassName,
  initCreateAttr,
  updateAttrs
};
export default styleApis;
