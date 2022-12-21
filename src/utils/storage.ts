import { merge } from "@/utils/core";
import { decrypt, encrypt } from "./crypt";
import { isNil } from "./is";

export interface StorageConfig {
  type: "local" | "session";
  encrypt?: boolean;
  prefix: string;
  suffix?: string;
  alive?: number;
}

export type StorageItem<T> = {
  value: T | null;
  alive: number;
  timeout: number;
  isTimeout: boolean;
  // timer: ReturnType<typeof setTimeout> | null;
};

type Item = {
  value: any;
  timeout?: number;
  alive: number;
};

class Persistent {
  private config: StorageConfig;
  private storage: Storage;
  constructor(options: StorageConfig) {
    this.config = merge(
      {
        encrypt: true,
        suffix: "",
        alive: 0,
      },
      options
    );

    const { type } = this.config;
    this.storage = type == "session" ? window.sessionStorage : window.localStorage;
  }

  private normalizeKey(key: string) {
    let { prefix, suffix } = this.config;
    prefix = prefix;
    suffix = suffix || "";
    return `${prefix}${key}${suffix}`;
  }

  private normalizeItem(item: string | null) {
    const res: StorageItem<any> = {
      value: null,
      alive: -1,
      timeout: -1,
      isTimeout: false,
      // timer: null,
    };

    if (!item) {
      return res;
    }

    if (this.config.encrypt) {
      item = decrypt(item);
    }

    const itemObj: Item = JSON.parse(item);
    res.timeout = itemObj.timeout || -1;
    res.alive = itemObj.alive;
    res.isTimeout = res.timeout == -1 ? false : res.timeout < Date.now();
    res.value = res.isTimeout ? null : itemObj.value;

    return res;
  }

  private normalizeValue(value: any, alive?: number): string {
    const { alive: globalAlive, encrypt: _encrypt } = this.config;
    let _alive = 0;
    if (!isNil(alive)) {
      _alive = alive;
    } else if (!isNil(globalAlive)) {
      _alive = globalAlive;
    }
    _alive = _alive >= 0 ? _alive : 0;

    let item: Item = {
      value: value,
      alive: _alive,
    };

    if (_alive) {
      item.timeout = Date.now() + _alive;
    }

    const stringValue = JSON.stringify(item);
    return _encrypt ? encrypt(stringValue) : stringValue;
  }

  private isKey(key: string) {
    if (this.config.suffix) {
      return key.startsWith(this.config.prefix) && key.endsWith(this.config.suffix);
    }
    return key.startsWith(this.config.prefix);
  }

  set<T = any>(key: string, value: T, alive?: number) {
    const normalizedKey = this.normalizeKey(key);
    const normalizedValue = this.normalizeValue(value, alive);
    this.storage.setItem(normalizedKey, normalizedValue);

    return this.normalizeItem(normalizedValue);
  }

  get<T = any>(key: string): StorageItem<T> {
    const normalizedKey = this.normalizeKey(key);
    let item = this.storage.getItem(normalizedKey);
    if (!item) return this.normalizeItem(item);

    const normalizedItem = this.normalizeItem(item);

    if (normalizedItem.isTimeout) {
      this.storage.removeItem(normalizedKey);
    }

    return normalizedItem;
  }

  remove(key: string) {
    this.storage.removeItem(this.normalizeKey(key));
  }

  clear() {
    let keys = Object.keys(this.storage);
    keys = keys.filter((k) => this.isKey(k));

    keys.forEach((k) => {
      this.remove(k);
    });
  }
}

export const createStorage = (config: StorageConfig) => {
  return new Persistent(config);
};
