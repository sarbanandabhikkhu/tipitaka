function longPress(element, callback) {
  let timer;
  element.addEventListener("touchstart", (e) => {
    timer = setTimeout(() => {
      timer = null;
      e.stopPropagation();
      callback(e.target);
    }, 500);
  });
  element.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  element.addEventListener("touchend", () => {
    if (timer) clearTimeout(timer);
  });
  element.addEventListener("touchmove", () => {
    if (timer) clearTimeout(timer);
  });
}

export default longPress;
