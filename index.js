// import registerServiceWorker from "./registerServiceWorker.js";

import filetree from "./lib/filetree.js";
// import breadcrumbs from "./lib/breadcrumbs.js";
import window from "./lib/window.js";
import icons from "./utils/icons.js";

// https://sarbanandabhikkhu.github.io/tipitaka-xml/lib/clickWord.js
import dictionaries from "./lib/dictionaries.js";

document.addEventListener("DOMContentLoaded", () => {
  const markup = `
    <section class="layout__container">
      <header>
        <div class="nav-opener">${icons.menu_burger}</div>
        <div class="tab__buttons"></div>
        <div class="nav-items">${icons.menu_dots}</div>
      </header>
      <nav class="navigation">
        <div class="nav-closer"></div>
        <div class="nav-header">Navigation</div>
      </nav>
      <main></main>
      <footer></footer>
    </section>
  `;

  document.body.innerHTML = markup;

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
