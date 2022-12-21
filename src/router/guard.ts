import { projectSettings } from "@/settings/project_settings";
import { useUserStore } from "@/stores/user";
import { toBoolean } from "@/utils";
import { Modal } from "ant-design-vue";
import type { Router } from "vue-router";
import { ROUTE_NAME } from "./constant";

function createPageGuard(router: Router) {
  const map = new Map<string, boolean>();

  router.beforeEach((to) => {
    to.meta.loaded = toBoolean(map.get(to.path));
    return true;
  });

  router.afterEach((to) => {
    map.set(to.path, true);
  });
}

function createMessageGuard(router: Router) {
  const { removeMessageWhenChangeRoute } = projectSettings;
  router.beforeEach((to) => {
    if (removeMessageWhenChangeRoute) {
      Modal.destroyAll();
    }

    return true;
  });
}

function createStateGuard(router: Router) {
  router.afterEach((to) => {
    if (to.name == ROUTE_NAME.login) {
      const userStore = useUserStore();
      userStore.resetState();
    }
  });
}

export function setupRouteGuard(router: Router) {
  createPageGuard(router);
  createMessageGuard(router);
  createStateGuard(router);
}
