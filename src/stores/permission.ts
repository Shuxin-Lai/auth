import { PermissionApi } from "@/api";
import type { AppRouteRecordRaw } from "@/types";
import { arrayable, isNil, isNotNil } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, type RouteRecordRaw } from "vue-router";
import { useUserStore } from "./user";

export const usePermissionStore = defineStore("permission", () => {
  const userStore = useUserStore();
  const checkPermission = (role: Role | Role[]) => {
    role = arrayable(role);
    return !isNil(userStore.user) && role.includes(userStore.user.role);
  };
  return {
    checkPermission,
  };
});
