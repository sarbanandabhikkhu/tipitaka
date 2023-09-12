const getBreads = {};

getBreads.config = {
  breadcrumbs: [],
  fileCount: 0,
};

getBreads.items = ({ childNodes }) => {
  if (Array.from(childNodes).length > 1) {
    const items = [];
    Array.from(childNodes).map((child) => {
      const { nodeName, innerText } = child;
      if (nodeName === "A") {
        getBreads.config.fileCount++;
        items.push({
          id: getBreads.config.fileCount,
          type: "file",
          name: innerText,
          href: child.getAttribute("href"),
        });
      }
      if (nodeName === "BUTTON") {
        items.push({
          type: "folder",
          name: innerText,
        });
      }
    });
    return items;
  } else {
    const node = Array.from(childNodes)[0];
    if (node.nodeName === "A") {
      getBreads.config.fileCount++;
      return {
        id: getBreads.config.fileCount,
        type: "file",
        name: node.innerText,
        href: node.getAttribute("href"),
      };
    }
    if (node.nodeName === "BUTTON") {
      return {
        type: "folder",
        name: node.innerText,
      };
    }
  }
};

getBreads.breads = (itemName) => {
  const rootTarget = document.querySelector(".container__tree > button");
  const rootText = rootTarget.innerText;
  if (rootText === itemName) {
    return rootText;
  }

  const firstLayer = rootTarget.nextSibling.children;
  for (const first of firstLayer) {
    if (first.innerText === itemName) {
      return `${rootText}/${first.innerText}`;
    }
    if (first.tagName === "BUTTON") {
      const secondLayer = first.nextSibling.children;
      for (const second of secondLayer) {
        if (second.nodeName === "BUTTON") {
          if (second.innerText === itemName) {
            return `${rootText}/${first.innerText}/${second.innerText}`;
          }
        }
        if (second.tagName === "BUTTON") {
          const thirdLayer = second.nextSibling.children;
          for (const third of thirdLayer) {
            if (third.nodeName === "BUTTON") {
              if (third.innerText === itemName) {
                return `${rootText}/${first.innerText}/${second.innerText}/${third.innerText}`;
              }
            }
            if (third.tagName === "BUTTON") {
              const fourthLayer = third.nextSibling.children;
              for (const fourth of fourthLayer) {
                if (fourth.nodeName === "BUTTON") {
                  if (fourth.innerText === itemName) {
                    return `${rootText}/${first.innerText}/${second.innerText}/${third.innerText}/${fourth.innerText}`;
                  }
                }
                if (fourth.tagName === "BUTTON") {
                  const fifthLayer = fourth.nextSibling.children;
                  for (const fifth of fifthLayer) {
                    if (fifth.nodeName === "BUTTON") {
                      if (fifth.innerText === itemName) {
                        return `${rootText}/${first.innerText}/${second.innerText}/${third.innerText}/${fourth.innerText}/${fifth.innerText}`;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

getBreads.init = () => {
  const buttons = document.querySelectorAll(".container__tree button");
  Array.from(buttons).map(({ innerText, nextSibling }, i) => {
    getBreads.config.breadcrumbs.push({
      name: innerText,
      items: getBreads.items(nextSibling),
      breads: getBreads.breads(innerText),
    });
  });
  console.log(getBreads.config.breadcrumbs);
};

export default getBreads;
