import type { AppRouteRecordRaw } from "@/types";
import { ROUTE_NAME } from "./constant";

export const views = {
  exception: () => import("@/views/sys/exception/Error.vue"),
  login: () => import("@/views/sys/login/Login.vue"),
};

export const layouts = {
  default: () => import("@/layout/Default.vue"),
};

export const pageNotFoundRoute: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: ROUTE_NAME.notFound,
  component: layouts.default,
  meta: {
    title: "ErrorPage",
    hideMenu: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      component: views.exception,
      name: ROUTE_NAME.notFound,
      meta: {
        title: "ErrorPage",
        hideMenu: true,
      },
    },
  ],
};

export const loginRoute: AppRouteRecordRaw = {
  name: ROUTE_NAME.login,
  path: "/login",
  component: views.login,
  meta: {
    title: "Login",
  },
};

export const homeRoute: AppRouteRecordRaw = {
  name: "Home",
  path: "/",
  component: () => import("@/views/HomeView.vue"),
  meta: {
    title: "Home",
  },
};

export const basicRoutes = [homeRoute, loginRoute, pageNotFoundRoute];
