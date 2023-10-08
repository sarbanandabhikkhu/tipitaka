import fetchData from "../helpers/fetchData.js";
import icons from "../utils/icons.js";

const filetree = {};

filetree.config = {
  tree_data_url: "../cscd/tipitaka_tree.json",
  base_url: "https://tipitaka.org/romn/cscd/",
};

filetree._button = (item, append, callback) => {
  const button = document.createElement("button");
  const content = document.createElement("div");
  button.innerHTML = icons.angel_right + icons.folder + item.name;
  append.appendChild(button);
  append.appendChild(content);
  return callback(content);
};

filetree._anchor = (item, append) => {
  const anchor = document.createElement("a");
  const file = document.createElement("img");
  // anchor.setAttribute("href", `${filetree.config.base_url}${item.href}.xml`);
  anchor.setAttribute("href", item.href);
  anchor.setAttribute("file", item.href);
  anchor.innerHTML = icons.document + item.name;
  append.appendChild(anchor);
};

filetree.create = (data, append, callback) => {
  if (!Array.isArray(data)) {
    filetree._button(data, append, (content) => {
      return callback(data.items, content);
    });
  }
  if (Array.isArray(data)) {
    data.map((item) => {
      if ("href" in item) {
        filetree._anchor(item, append);
        return;
      }
      filetree._button(item, append, (content) => {
        return callback(item.items, content);
      });
    });
  }
};

filetree.accordion = () => {
  document.addEventListener("click", (e) => {
    const { tagName, nextSibling, innerText } = e.target;

    if (tagName === "BUTTON" && nextSibling.tagName === "DIV") {
      const isOpen = nextSibling.style.display === "block";
      const close = icons.angel_right + icons.folder;
      const open = icons.angel_down + icons.open_folder;
      const openCloseIcons = isOpen ? close : open;
      nextSibling.style.display = isOpen ? "none" : "block";
      e.target.innerHTML = openCloseIcons + innerText;
    }
  });
};

filetree.init = () => {
  const tree_data = filetree.config.tree_data_url;
  const container = document.createElement("div");
  container.setAttribute("class", "container__tree");

  fetchData(tree_data, (data) => {
    filetree.create(data.items, container, (categories, content) => {
      filetree.create(categories, content, (categories, content) => {
        filetree.create(categories, content, (categories, content) => {
          filetree.create(categories, content, (categories, content) => {
            filetree.create(categories, content, (categories, content) => {
              filetree.create(categories, content, (categories, content) => {
                // console.log(categories, content);
              });
            });
          });
        });
      });
    });
  });

  document.querySelector("nav").appendChild(container);

  filetree.accordion();

  // setTimeout(() => {
  //   document.querySelector(".container__tree > button").click();
  // }, 1000);
};

export default filetree;
