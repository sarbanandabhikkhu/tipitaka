/*
 * name: Data Picker from HTML and Convert to JSON
 * description: Pick up the data from tipitaka.org individual file and converted to json format then save uniqe json file.
 * author: SarbaNanada Bhikkhu
 */

const getContent = {};

getContent.fileName = () => {
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf("/") + 1);
  return filename.replace(/\.xml$/, ".json");
};

getContent.saveAsJSON = (dataObj) => {
  const dataStr = JSON.stringify(dataObj, null, 2);
  const blob = new Blob([dataStr], { fileType: "application/json" });
  const link = document.createElement("a");
  link.download = getContent.fileName();
  if (window.webkitURL !== null) {
    link.href = window.webkitURL.createObjectURL(blob);
  }
  link.href = window.URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
};

getContent.attributes = (attributes) => {
  const attrs = Array.from(attributes);
  if (attrs.length > 1) {
    const attrsArray = [];
    attrs.map((attr) => {
      attrsArray.push({
        name: attr.name,
        value: attr.value,
      });
    });
    return attrsArray;
  } else {
    return {
      name: attrs[0].name,
      value: attrs[0].value,
    };
  }
};

getContent.init = () => {
  const objData = [];
  Array.from(document.querySelectorAll("p")).map((parent) => {
    const { childNodes, tagName, attributes, innerText } = parent;
    if (Array.from(childNodes).length > 1) {
      const children = [];
      Array.from(childNodes).map((child) => {
        const { nodeType, tagName, attributes, innerText, wholeText } = child;
        if (nodeType === 1 && innerText !== "") {
          children.push({
            tagName: tagName.toLowerCase(),
            attributes: getContent.attributes(attributes),
            innerText,
          });
        }
        if (nodeType === 3) {
          children.push(wholeText);
        }
      });
      objData.push({
        tagName: tagName.toLowerCase(),
        attributes: getContent.attributes(attributes),
        children,
        innerText,
      });
    } else {
      objData.push({
        tagName: tagName.toLowerCase(),
        attributes: getContent.attributes(attributes),
        innerText,
      });
    }
  });
  getContent.saveAsJSON(objData);
};

getContent.init();
