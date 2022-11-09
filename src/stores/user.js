// @ts-check
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    data: {},
  }),
  actions: {
    async login(userData) {
      this.data = userData;
    },
    logout() {
      this.data = null;
    },
  },
});

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
function apiLogin(a, p) {
  if (a === "admin" && p === "admin")
    return Promise.resolve({ isAdmin: true, id: 1 });
  if (a === "user" && p === "user")
    return Promise.resolve({ isAdmin: false, id: 2 });
  return Promise.reject(new Error("invalid credentials"));
}
