import { createApp } from "vue";

import App from "./App.vue";
import { setupStore } from "./store";
import { setupRouter } from "./router";
import { notification } from "ant-design-vue";
import "ant-design-vue/es/notification/style/css";

function setupGlobalComponent(app: ReturnType<typeof createApp>) {
  app.component("DefaultLayout", () => import("@/layout/Default.vue"));
}

function main() {
  const app = createApp(App);

  setupStore(app);
  setupRouter(app);
  setupGlobalComponent(app);
  app.mount("#app");
}

main();
