import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { basicRoutes } from "./basic";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: basicRoutes as RouteRecordRaw[],
});

export function setupRouter(app: App) {
  app.use(router);
}
