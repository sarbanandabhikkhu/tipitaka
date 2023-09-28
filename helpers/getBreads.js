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
          file: getBreads.config.fileCount,
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
        file: getBreads.config.fileCount,
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
    return [rootText];
  }

  const firstLayer = rootTarget.nextSibling.children;
  for (const first of firstLayer) {
    if (first.innerText === itemName) {
      return [rootText, first.innerText];
    }
    if (first.tagName === "BUTTON") {
      const secondLayer = first.nextSibling.children;
      for (const second of secondLayer) {
        if (second.nodeName === "BUTTON") {
          if (second.innerText === itemName) {
            return [rootText, first.innerText, second.innerText];
          }
        }
        if (second.tagName === "BUTTON") {
          const thirdLayer = second.nextSibling.children;
          for (const third of thirdLayer) {
            if (third.nodeName === "BUTTON") {
              if (third.innerText === itemName) {
                return [
                  rootText,
                  first.innerText,
                  second.innerText,
                  third.innerText,
                ];
              }
            }
            if (third.tagName === "BUTTON") {
              const fourthLayer = third.nextSibling.children;
              for (const fourth of fourthLayer) {
                if (fourth.nodeName === "BUTTON") {
                  if (fourth.innerText === itemName) {
                    return [
                      rootText,
                      first.innerText,
                      second.innerText,
                      third.innerText,
                      fourth.innerText,
                    ];
                  }
                }
                if (fourth.tagName === "BUTTON") {
                  const fifthLayer = fourth.nextSibling.children;
                  for (const fifth of fifthLayer) {
                    if (fifth.nodeName === "BUTTON") {
                      if (fifth.innerText === itemName) {
                        return [
                          rootText,
                          first.innerText,
                          second.innerText,
                          third.innerText,
                          fourth.innerText,
                          fifth.innerText,
                        ];
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

getBreads.saveFile = (fileName, fileType, dataObj) => {
  const blob = new Blob([dataObj], { fileType });
  const link = document.createElement("a");
  link.download = fileName;
  if (window.webkitURL !== null) {
    link.href = window.webkitURL.createObjectURL(blob);
  }
  link.href = window.URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
};

getBreads.init = () => {
  const buttons = document.querySelectorAll(".container__tree button");
  Array.from(buttons).map(({ innerText, nextSibling }, i) => {
    const popBreads = getBreads.breads(innerText);
    popBreads.pop();

    getBreads.config.breadcrumbs.push({
      folder: ++i,
      name: innerText,
      breads: `/${popBreads.join("/")}`,
      items: getBreads.items(nextSibling),
    });
  });
  console.log(getBreads.config.breadcrumbs);

  // getBreads.saveFile(
  //   "breadcrumbs.json",
  //   "application/json",
  //   JSON.stringify(getBreads.config.breadcrumbs, null, 2)
  // );
};

getBreads.init();
