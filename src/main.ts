import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { setupStore } from "./store";
import { setupRouter } from "./router";

function main() {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);

  app.mount("#app");
}

main();
