import type { AppRouteRecordRaw } from "@/types";
import { ROUTE_NAME } from "./constant";

const defaultLayout = () => import("@/layout/Default.vue");

export const pageNotFoundRoute: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: ROUTE_NAME.notFound,
  component: defaultLayout,
  meta: {
    title: "ErrorPage",
    hideMenu: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      component: () => import("@/views/sys/exception/Error.vue"),
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
  component: () => import("@/views/sys/login/Login.vue"),
  meta: {
    title: "Login",
    layout: false,
  },
};

export const authRoutes: AppRouteRecordRaw[] = [
  {
    name: ROUTE_NAME.home,
    path: "/",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Home",
      roles: ["user", "admin"],
    },
  },

  {
    name: ROUTE_NAME.profile,
    path: "/profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: {
      title: "Profile",
      roles: ["user"],
    },
  },
];

export const basicRoutes = [...authRoutes, loginRoute, pageNotFoundRoute];
