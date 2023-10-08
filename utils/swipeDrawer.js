function swipeDrawer() {
  const drawerMenu = document.getElementById("drawer-menu");
  const drawerShadow = document.getElementById("drawer-shadow");
  const markup = `
    <style>
      html,
      body {
        overscroll-behavior-x: none;
      }
      #drawer-menu {
        position: fixed;
        top: 0;
        width: 300px;
        height: 100%;
        z-index: 100;
        transform: translate3d(-100%, 0, 0);
        background-color: rgb(255, 255, 255);
      }
      #drawer-menu::after {
        position: absolute;
        top: calc(50% - 50px);
        right: -5px;
        content: "";
        width: 10px;
        height: 100px;
        border-radius: 5px;
        background-color: rgb(200, 225, 245);
        backdrop-filter: blur(25px) saturate(2.5);
      }
      #drawer-shadow {
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
      }
    </style>
    <div id="drawer-menu"></div>
    <div id="drawer-shadow"></ddiv
 `;
  let drawerMenuWidth = drawerMenu.clientWidth;
  let screen = window.innerWidth / 4;
  let openStatus = false;
  let axisCords;

  function drawerClose() {
    drawerMenu.animate(
      [
        {
          transform: `translate3d(${
            axisCords ? `${axisCords}px` : `${0}px`
          }, 0, 0)`,
        },
        {
          transform: "translate3d(-100%, 0, 0)",
        },
      ],
      {
        duration: 300,
        easing: "ease-in-out",
      }
    );
    drawerMenu.style.transform = "translate3d(-100%, 0, 0)";
    openStatus = false;
  }

  function drawerOpen() {
    drawerMenu.animate(
      [
        {
          transform: `translate3d(${
            axisCords ? axisCords + "px" : -100 + "%"
          }, 0, 0)`,
        },
        {
          transform: "translate3d(0, 0, 0)",
        },
      ],
      {
        duration: 300,
        easing: "ease-in-out",
      }
    );
    drawerMenu.style.transform = "translate3d(0, 0, 0)";
    openStatus = true;
  }

  function listener() {
    drawerMenu.addEventListener("touchmove", (e) => {
      drawerMenu.style = `position: fixed; display: block`;
      axisCords = e.changedTouches[0].pageX - drawerMenuWidth;
      if (axisCords > 0) axisCords = 0;
      drawerMenu.style.transform = "translate3d(" + axisCords + "px, 0, 0)";
    });

    drawerMenu.addEventListener("touchend", (e) => {
      let endPoint = e.changedTouches[0].pageX;
      let isOverThreshold = endPoint > screen && endPoint < drawerMenuWidth;

      if (endPoint < screen) drawerClose();
      if (isOverThreshold) drawerOpen();

      openStatus = true;
      axisCords = null;
    });
  }

  drawerShadow.addEventListener("click", () => {
    if (openStatus) drawerClose();
  });

  listener();
}

export default swipeDrawer;
