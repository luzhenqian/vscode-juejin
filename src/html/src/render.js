(function (global) {
  const utils = {
    isElement(target) {
      return (
        typeof HTMLElement === "object" &&
        typeof target.nodeName === "string" &&
        target instanceof HTMLElement
      );
    },
  };

  class Render {
    constructor({ target, data, generator, effect }) {
      this.afterEffect;
      this.target = target;
      this.data = data;
      this.generator = generator;
      this.effect = effect;
      this.execEffect = true;
      this.rendering = false; // 防止重复 render 进入无限递归
      this.update = this.update.bind(this);
      this.render();
    }
    render() {
      if (this.rendering) {
        throw Error("不能在rendering过程中执行render");
      }
      this.rendering = true;
      this.execEffect &&
        typeof this.effect === "function" &&
        (this.afterEffect = this.effect(this.data, this.target));

      let child = this.generator(this.data, this.target);
      if (utils.isElement(child)) {
        this.target.append(child);
      } else if (Array.isArray(child)) {
        for (let i = 0; i < child.length; i++) {
          if (utils.isElement(child[i])) {
            this.target.append(child[i]);
          }
        }
      } else if (typeof child === "string") {
        this.target.innerHTML += child;
      }
      this.execEffect &&
        typeof this.afterEffect === "function" &&
        this.afterEffect();
      this.rendering = false;
    }
    update(newData, execEffect) {
      this.data = newData;
      typeof execEffect === "boolean" && (this.execEffect = execEffect);
      this.render();
      this.execEffect = true;
    }
  }

  /**
   * @param {object} config
   * @param {Element} config.target - warp el
   * @param {object} config.data - view model
   * @param {Function} config.generator - logic
   * @param {Function} config.effect - render effect
   */
  function render({ target, data, generator, effect }) {
    if (!target) throw Error("没有根元素");
    if (!data) throw Error("没有数据");
    if (!generator) throw Error("没有生成器");
    return new Render({ target, data, generator, effect });
  }

  global["VR"] = { render };
})(window);

// function renderTest() {
//   let { update } = render({
//     target: document.createElement("div"),
//     data: [1, 2, 4, 5, 7, 8],
//     generator(data) {
//       return `<div>${data.map((d) => `<span>${d}</span>`)}</div>`;
//     },
//     effect() {
//       console.log("渲染dom前");
//       return () => {
//         console.log("渲染dom后");
//       };
//     },
//   });
// }
