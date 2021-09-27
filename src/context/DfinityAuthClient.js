import { AuthClient } from "@dfinity/auth-client";

/*
 * A simple wrapper for the official auth client to initialize it and wrap
 * some of the methods in promises
 */
class AuthClientWrapper {
  ready = false;
  constructor() {
    return this;
  }

  // Create a new auth client and update it's ready state
  async create() {
    this.authClient = await AuthClient.create();
    await this.authClient?.isAuthenticated();
    this.ready = true;
  }

  async login() {
    return new Promise(async (resolve) => {
      await this.authClient?.login({
        onSuccess: async () => {
          resolve(this.authClient?.getIdentity());
        },
      });
    });
  }

  async logout() {
    return this.authClient?.logout({ returnTo: "/" });
  }

  async getIdentity() {
    return this.authClient?.getIdentity();
  }

  async isAuthenticated() {
    return this.authClient?.isAuthenticated();
  }
}

export const authClient = new AuthClientWrapper();