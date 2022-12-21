import type { defineComponent } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta" | "children"> {
  meta?: RouteMeta;
  children?: AppRouteRecordRaw[];
}

export interface User {
  username: string;
  role: Role;
}
