import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { isNotNil } from "@/utils";
import { UserApi } from "@/api";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  // const token =
  const hasLogined = computed(() => isNotNil(user.value));

  const login = async (params: any) => {
    const { token } = await UserApi.login(params);
  };

  const getUserInfo = () => {};

  const resetState = () => {
    user.value = null;
  };

  return { user, hasLogined, resetState };
});
