// import filetree from "./lib/filetree.js";
import breadcrumbs from "./lib/breadcrumbs.js";
import content from "./lib/content.js";

// https://sarbanandabhikkhu.github.io/tipitaka-xml/lib/clickWord.js
import dictionaries from "./lib/dictionaries.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  const footer = document.createElement("footer");
  const navbar = document.createElement("nav");
  const aside = document.createElement("aside");
  const main = document.createElement("main");

  document.body.appendChild(aside);
  document.body.appendChild(main);

  // filetree.init();
  breadcrumbs.init();
  content.init();
  dictionaries.init();
});
