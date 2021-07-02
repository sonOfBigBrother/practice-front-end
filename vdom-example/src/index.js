import { h, patch } from "./vdom";
//  h函数返回虚拟节点
let vnode = h("ul#list", {}, [
  h("li.item", { style: { color: "red" } }, "itemA"),
  h(
    "li.item.c1",
    {
      className: ["c1", "c2"],
    },
    "itemB"
  ),
  h("input", {
    props: {
      type: "radio",
      name: "test",
      value: "0",
      className: "inputClass",
    },
  }),
]);
let container = document.getElementById("app");
patch(container, vnode);
