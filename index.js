import filetree from "./utils/filetree.js";
import content from "./utils/content.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  const footer = document.createElement("footer");
  const navbar = document.createElement("nav");
  const aside = document.createElement("aside");
  const main = document.createElement("main");

  document.body.appendChild(aside);
  document.body.appendChild(main);

  filetree.init();
  content.init();
});
