export const shallowMerge = Object.assign;
export { merge } from "lodash-es";
export const toBoolean = (v: unknown) => !!v;

export const sleep = (timeout = 16) => new Promise((resolve) => setTimeout(resolve, timeout));
