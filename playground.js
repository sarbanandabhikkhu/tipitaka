// const w = window.innerWidth || document.documentElement.clientWidth;
// const h = window.innerHeight || document.documentElement.clientHeight;

// import swipeDrawer from "./utils/swipeDrawer.js";

const layout = {
  init() {
    document.body.classList.add("layout");
    document.body.innerHTML = `
      <header class="header">
      </header>
      <nav class="navigation">
      </nav>
      <aside class="drawer">
      </aside>
      <main class="container">
      </main>
      <footer class="footer">
      </footer>
    `;
  },
};

layout.init();

const navigation = document.querySelector(".navigation");
const drawer = document.querySelector(".drawer");
const container = document.querySelector(".container");
navigation.addEventListener("click", (e) => {
  navigation.style.width = "50px";
  drawer.style.width = "250px";
});
