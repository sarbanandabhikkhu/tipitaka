function saveFile(fileName, fileType, dataObj) {
  const blob = new Blob([dataObj], { fileType });
  const link = document.createElement("a");
  link.download = fileName;
  if (window.webkitURL !== null)
    link.href = window.webkitURL.createObjectURL(blob);
  link.href = window.URL.createObjectURL(blob);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
}

export default saveFile;

// saveFile("tipitaka_urls.json", "application/json", JSON.stringify(data, null, 2));
