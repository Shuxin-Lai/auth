import { isNil } from "lodash-es";

export { isNil } from "lodash-es";
export { isFunction, isArray, isObject, isString } from "@vue/shared";

export const isNotNil = (v: unknown) => !isNil(v);
