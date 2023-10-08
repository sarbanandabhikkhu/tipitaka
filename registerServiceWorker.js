async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("serviceWorker.js", {
        scope: "./",
      });
      // alert(`SW registration working`);
    } catch (e) {
      // alert(`SW registration failed`);
    }
  }
}

export default registerServiceWorker;

// Registering our Service worker
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("serviceWorker.js", { scope: "./" });
// }
