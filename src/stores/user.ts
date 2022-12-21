import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { createStorage, isNotNil } from "@/utils";
import { UserApi } from "@/api";
import type { User } from "@/types";
import { usePermissionStore } from "./permission";

const storage = createStorage({
  type: "local",
  prefix: "user",
  encrypt: true,
  alive: 60 * 60 * 24 * 1000,
});

export const useUserStore = defineStore("user", () => {
  const user = ref<Nullable<User>>(null);
  // const token =
  const hasLogined = computed(() => isNotNil(user.value));

  const login = async (params: any) => {
    const { token } = await UserApi.login(params);
    storage.set("token", token);

    await Promise.all([getUserInfo()]);
    return user.value;
  };

  const getUserInfo = async () => {
    const res = await UserApi.getUserInfo();
    user.value = res;
    return res;
  };

  const resetState = () => {
    user.value = null;
  };

  return { user, hasLogined, resetState, getUserInfo, login };
});
