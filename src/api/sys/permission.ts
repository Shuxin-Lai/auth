import type { AppRouteRecordRaw } from "@/types";

export class PermissionApi {
  static async getRoutes() {
    const routes: AppRouteRecordRaw[] = [
      {
        name: "Home",
        meta: {
          title: "Home",
        },
        path: "/",
      },
    ];
    return routes;
  }
}
