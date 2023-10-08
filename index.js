import registerServiceWorker from "./registerServiceWorker.js";

import filetree from "./lib/filetree.js";
// import breadcrumbs from "./lib/breadcrumbs.js";
import window from "./lib/window.js";

// https://sarbanandabhikkhu.github.io/tipitaka-xml/lib/clickWord.js
import dictionaries from "./lib/dictionaries.js";

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  const navOpener = document.querySelector(".nav-opener");
  const navCloser = document.querySelector(".nav-closer");

  function openNavigation(navigation) {
    navigation.style.left = "0";
    navCloser.style.width = "calc(100vw - 300px)";
    setTimeout(() => (navCloser.style.opacity = "1"), 100);
  }
  function closeNavigation(navigation) {
    navigation.style.left = "-300px";
    navCloser.style.width = "0";
    navCloser.style.opacity = "0";
  }

  navOpener.addEventListener("click", (e) => {
    openNavigation(navigation);
  });
  navCloser.addEventListener("click", (e) => {
    closeNavigation(navigation);
  });

  filetree.init();
  // breadcrumbs.init();
  window.init();
  dictionaries.init();

  registerServiceWorker();
});
