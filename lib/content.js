import fetchData from "../helpers/fetchData.js";
import longPress from "../helpers/longPress.js";

const content = {};

content.config = {
  path: "./cscd/",
  openTabs: [],
  activeTab: null,
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

content.openFile = (fileId, title) => {
  const url = `${content.config.path}${fileId}.json`;
  const tab_buttons = document.querySelector(".tab__buttons");
  const tab_contents = document.querySelector(".tab__contents");
  const tab_button = document.createElement("button");
  const tab_content = document.createElement("div");
  const tab_delete = document.createElement("span");

  tab_button.setAttribute("tabId", fileId);
  tab_button.innerHTML = title;
  tab_buttons.appendChild(tab_button);

  tab_content.setAttribute("tabId", fileId);
  tab_content.innerHTML = "Loading...";
  fetchData(url, (data) => {
    tab_content.innerHTML = "";
    data.map((item) => {
      content.create(item, tab_content);
    });
  });
  tab_contents.appendChild(tab_content);
  content.tab_handler(fileId, title);
};

content.tab_handler = (fileId, name) => {
  if (content.config.activeTab === null) {
    document.querySelector(`button[tabId="${fileId}"]`).classList.add("active");
    document.querySelector(`div[tabId="${fileId}"]`).classList.add("active");
    content.config.activeTab = fileId;
  } else {
    const tab = content.config.activeTab;
    document.querySelector(`button[tabId="${tab}"]`).classList.remove("active");
    document.querySelector(`div[tabId="${tab}"]`).classList.remove("active");
    document.querySelector(`button[tabId="${fileId}"]`).classList.add("active");
    document.querySelector(`div[tabId="${fileId}"]`).classList.add("active");
    content.config.activeTab = fileId;
  }

  let hasAlready;
  content.config.openTabs.map((tab) => {
    if (tab.fileId === fileId) hasAlready = true;
  });
  if (!hasAlready) content.config.openTabs.push({ fileId, name });

  console.log(content.config.openTabs);
};

content.listener = () => {
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("file")) {
      e.preventDefault();
      const fileId = e.target.getAttribute("file");
      const name = e.target.innerText;
      let hasAlready;

      const buttons = document.querySelectorAll(".tab__buttons button");
      Array.from(buttons).map((button) => {
        if (button.getAttribute("tabId") === fileId) hasAlready = true;
      });

      if (!hasAlready) content.openFile(fileId, name);
      if (hasAlready) content.tab_handler(fileId, name);
    }
    if (e.target.tagName === "BUTTON" && e.target.getAttribute("tabId")) {
      const fileId = e.target.getAttribute("tabId");
      const name = e.target.innerText;

      content.tab_handler(fileId, name);

      longPress(e.target, (element) => {
        alert("Hold from " + element.outerHTML);
      });
    }
  });
};

content.init = () => {
  const container = document.querySelector("main");
  const buttons = document.createElement("div");
  const contents = document.createElement("div");
  buttons.setAttribute("class", "tab__buttons");
  contents.setAttribute("class", "tab__contents");
  container.appendChild(buttons);
  container.appendChild(contents);

  content.listener();
};

export default content;
