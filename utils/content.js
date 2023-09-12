import fetchData from "../helpers/fetchData.js";

const content = {};

content.config = {
  base: "./cscd/",
};

content.attributes = (element, attributes) => {
  if (Array.isArray(attributes)) {
    attributes.map(({ name, value }) => {
      element.setAttribute(name, value);
    });
  } else {
    const { name, value } = attributes;
    element.setAttribute(name, value);
  }
};

content.children = (append, children) => {
  children.map((child) => {
    if (typeof child === "string") {
      append.innerHTML += child;
    }

    if (typeof child === "object") {
      const { tagName, attributes, innerText } = child;
      const childElement = document.createElement(tagName);
      content.attributes(childElement, attributes);
      childElement.innerText = innerText;
      append.appendChild(childElement);
    }
  });
};

content.create = (item, append) => {
  const p = document.createElement("p");
  if (item.attributes) {
    content.attributes(p, item.attributes);
  }
  if (item.children) {
    content.children(p, item.children);
  } else {
    p.innerHTML = item.innerText;
  }
  append.appendChild(p);
};

content.open = (id, name) => {
  const url = `${content.config.base}${id}.json`;
  const button_container = document.querySelector(".tab__button_container");
  const content_container = document.querySelector(".tab__content_container");
  const tab_button = document.createElement("button");
  const tab_content = document.createElement("div");

  tab_button.innerHTML = name;
  button_container.appendChild(tab_button);
  tab_content.innerHTML = "Loading...";

  fetchData(url, (data) => {
    tab_content.innerHTML = "";
    data.map((item) => {
      content.create(item, tab_content);
    });
  });
  content_container.appendChild(tab_content);
};

content.init = () => {
  const container = document.querySelector("main");
  const buttons = document.createElement("div");
  const contents = document.createElement("div");
  buttons.setAttribute("class", "tab__button_container");
  contents.setAttribute("class", "tab__content_container");
  container.appendChild(buttons);
  container.appendChild(contents);

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const id = e.target.getAttribute("file");
      const name = e.target.innerText;
      content.open(id, name);
    }
  });
};

export default content;
