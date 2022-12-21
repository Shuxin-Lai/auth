import type { defineComponent } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta" | "children"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}
