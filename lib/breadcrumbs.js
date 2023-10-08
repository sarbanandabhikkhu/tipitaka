import fetchData from "../helpers/fetchData.js";
import icons from "../utils/icons.js";

const breadcrumbs = {};

breadcrumbs.config = {
  breadcrumbs_url: "../cscd/breadcrumbs.json",
  base_url: "../cscd/",
  data: [],
};

breadcrumbs.breads__buttons = (breads, name) => {
  const _breads = [];
  breads.split("/").map((item) => {
    if (item !== "") _breads.push(item);
  });
  _breads.push(name);
  const s = `<button>❱</button>`;
  return _breads.map((i) => `${s}<button dir="${i}">${i}</button>`).join("");
};

breadcrumbs.create = ({ name, items, breads }, container) => {
  const base_url = breadcrumbs.config.base_url;
  const buttons = document.createElement("div");
  const content = document.createElement("div");
  buttons.setAttribute("class", "breadcrumbs");
  content.setAttribute("class", "breads__content");
  buttons.innerHTML = breadcrumbs.breads__buttons(breads, name);
  if (Array.isArray(items)) {
    items.map((item) => {
      if (item.type === "folder") {
        const button = document.createElement("button");
        button.setAttribute("dir", item.name);
        button.setAttribute("class", "folder");
        button.innerHTML = icons.folder + item.name;
        content.appendChild(button);
      }
      if (item.type === "file") {
        const a = document.createElement("a");
        a.setAttribute("class", "file");
        a.setAttribute("file", item.href);
        a.setAttribute("href", base_url + item.href);
        a.innerHTML = icons.document + item.name;
        content.appendChild(a);
      }
    });
  } else {
    if (items.type === "folder") {
      console.log(items.type);
    }
    if (items.type === "file") {
      const a = document.createElement("a");
      a.setAttribute("file", items.href);
      a.setAttribute("href", base_url + items.href);
      a.innerHTML = icons.document + items.name;
      content.appendChild(a);
    }
  }
  container.innerHTML = "";
  container.appendChild(buttons);
  container.appendChild(content);
};

breadcrumbs.listener = () => {
  document.addEventListener("click", ({ target }) => {
    if (target.getAttribute("dir")) {
      const data = breadcrumbs.config.data;
      data.map((item) => {
        if (target.getAttribute("dir") === item.name) {
          const container = document.querySelector(".container__breadcrumbs");
          breadcrumbs.create(item, container);
        }
      });
    }
  });
};

breadcrumbs.init = () => {
  const url = breadcrumbs.config.breadcrumbs_url;
  const container = document.createElement("div");
  container.setAttribute("class", "container__breadcrumbs");
  fetchData(url, (data) => {
    breadcrumbs.create(data[0], container);
    breadcrumbs.config.data = data;
  });
  document.querySelector("nav").appendChild(container);
  breadcrumbs.listener();
};

export default breadcrumbs;
