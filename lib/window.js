import fetchData from "../helpers/fetchData.js";

const window = {};

window.history = JSON.parse(localStorage.getItem("tabData")) || {
  openTabs: [],
  activeTab: null,
};

window.config = {
  path: "./cscd/",
  openTabs: window.history.openTabs,
  activeTab: window.history.activeTab,
};

window.attributes = (element, attributes) => {
  if (Array.isArray(attributes)) {
    attributes.map(({ name, value }) => {
      element.setAttribute(name, value);
    });
  } else {
    const { name, value } = attributes;
    element.setAttribute(name, value);
  }
};

window.children = (append, children) => {
  children.map((child) => {
    if (typeof child === "string") {
      append.innerHTML += child;
    }
    if (typeof child === "object") {
      const { tagName, attributes, innerText } = child;
      const childElement = document.createElement(tagName);
      window.attributes(childElement, attributes);
      childElement.innerText = innerText;
      append.appendChild(childElement);
    }
  });
};

window.create = (item, append) => {
  const p = document.createElement("p");
  if (item.attributes) {
    window.attributes(p, item.attributes);
  }
  if (item.children) {
    window.children(p, item.children);
  } else {
    p.innerHTML = item.innerText;
  }
  append.appendChild(p);
};

window.openFile = (fileId, title) => {
  const url = `${window.config.path}${fileId}.json`;
  const tab_buttons = document.querySelector(".tab__buttons");
  const tab_windows = document.querySelector(".tab__windows");
  const tab_button = document.createElement("button");
  const tab_window = document.createElement("div");
  const tab_delete = document.createElement("span");

  tab_button.setAttribute("name", "tab_button");
  tab_button.setAttribute("tabId", fileId);
  tab_button.innerHTML = title;
  tab_buttons.appendChild(tab_button);

  tab_window.setAttribute("name", "tab_window");
  tab_window.setAttribute("tabId", fileId);
  tab_window.innerHTML = "Loading...";
  fetchData(url, (data) => {
    tab_window.innerHTML = "";
    data.map((item) => {
      window.create(item, tab_window);
    });
  });
  tab_windows.appendChild(tab_window);
  window.tab_handler(fileId, title);
};

window.tab_handler = (fileId, name) => {
  if (window.config.activeTab === null) {
    document.querySelector(`button[tabId="${fileId}"]`).classList.add("active");
    document.querySelector(`div[tabId="${fileId}"]`).classList.add("active");
    window.config.activeTab = fileId;
  } else {
    const tab = window.config.activeTab;
    document.querySelector(`button[tabId="${tab}"]`).classList.remove("active");
    document.querySelector(`div[tabId="${tab}"]`).classList.remove("active");
    document.querySelector(`button[tabId="${fileId}"]`).classList.add("active");
    document.querySelector(`div[tabId="${fileId}"]`).classList.add("active");
    window.config.activeTab = fileId;
  }

  let hasAlready;
  window.config.openTabs.map((tab) => {
    if (tab.fileId === fileId) hasAlready = true;
  });
  if (!hasAlready) window.config.openTabs.push({ fileId, name });

  const tabData = {
    openTabs: window.config.openTabs,
    activeTab: window.config.activeTab,
  };

  localStorage.setItem("tabData", JSON.stringify(tabData));
};

window.listener = () => {
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

      if (!hasAlready) window.openFile(fileId, name);
      if (hasAlready) window.tab_handler(fileId, name);
    }
    if (e.target.tagName === "BUTTON" && e.target.getAttribute("tabId")) {
      const fileId = e.target.getAttribute("tabId");
      const name = e.target.innerText;

      window.tab_handler(fileId, name);
    }
  });
};

window.init = () => {
  const container = document.querySelector("main");
  // const header = document.querySelector("header");
  const buttons = document.createElement("div");
  const windows = document.createElement("div");
  // buttons.setAttribute("class", "tab__buttons");
  windows.setAttribute("class", "tab__windows");
  // header.appendChild(buttons);
  container.appendChild(windows);

  window.listener();

  const { openTabs, activeTab } = window.config;
  let fire = 0;
  if (openTabs.length >= 0) {
    openTabs.map(({ fileId, name }, i) => {
      fire++;
      setTimeout(() => {
        window.openFile(fileId, name);
      }, i * 900);
    });
  }

  console.log(window.config.activeTab);
};

export default window;
