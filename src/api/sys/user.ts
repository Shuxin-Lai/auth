import { sleep } from "@/utils";

const endpoints = {
  login: "/login",
};

export class UserApi {
  static async login(params: { username: string; password: string }) {
    await sleep(2 * 1000);
    return {
      token: "fake_token",
    };
  }
}
