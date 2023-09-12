const link_picker = {};

link_picker.config = {
  tipitaka_toc: "https://tipitaka.org/romn/tipitaka_toc.html",
};

link_picker.saveFile = (fileName, fileType, dataObj) => {
  const blob = new Blob([dataObj], { fileType });
  const link = document.createElement("a");
  link.download = fileName;
  if (window.webkitURL !== null)
    link.href = window.webkitURL.createObjectURL(blob);
  link.href = window.URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
};

link_picker.init = () => {
  const linksObj = [];
  const anchors = document.querySelectorAll('a[target="text"]');
  Array.from(anchors).map((anchor, i) => {
    linksObj.push({
      id: i + 1,
      href: anchor.href.replace(/^https\:\/\/tipitaka\.org\/romn\/cscd\//g, ""),
      text: anchor.innerText.trim().replace(/[,.;]$/g, ""),
    });
  });
  const json = JSON.stringify(linksObj, null, 2);
  link_picker.saveFile("links.json", "application/json", json);
};

link_picker.init();
