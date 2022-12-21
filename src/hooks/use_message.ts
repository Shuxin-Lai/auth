import { notification } from "ant-design-vue";

notification.config({
  placement: "topRight",
  duration: 3,
});

export const useMessage = () => {
  return {
    notification,
  };
};
