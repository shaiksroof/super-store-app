// @ts-check
import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { useUserStore } from "./user";

const getCartFrmLocalStore = () => {
  return JSON.parse(useQuasar().localStorage.getItem("cart")) || [];
};

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    /** @type {string[]} */
    rawItems: getCartFrmLocalStore(),
    $q: useQuasar(),
  }),
  getters: {
    /**
     * @returns {Array<{ name: string; amount: number }>}
     */
    items: (state) => {
      return state.rawItems.reduce((items, item) => {
        const existingItem = items.find((it) => {
          return it.name.id === item.id;
        });
        if (!existingItem) {
          items.push({ name: item, amount: 1 });
        } else {
          existingItem.amount++;
        }
        return items;
      }, []);
    },
    // state.rawItems.reduce((items, item) => {
    //   const existingItem = items.find((it) => {
    //     it.id === item.id
    //   });

    //   if (!existingItem) {
    //     items.push({ name: item, amount: 1 });
    //   } else {
    //     existingItem.amount++;
    //   }

    //   return items;
    // }, [])
  },
  actions: {
    /**
     * Add item to the cart
     * @param {string} name
     */
    addItem(name) {
      this.rawItems.push(name);
      this.updateSession();
    },

    /**
     * Remove item from the cart
     * @param {string} name
     */
    removeItem(item) {
      const i = this.rawItems.findIndex((rawItem) => {
        return rawItem.id === item.id;
      });
      this.rawItems.splice(i, 1);
      this.updateSession();
    },
    async purchaseItems() {
      const user = useUserStore();
      if (!user.name) return;

      const n = this.items.length;
      this.rawItems = [];
      this.updateSession();

      return n;
    },
    updateSession() {
      this.$q.localStorage.set("cart", JSON.stringify(this.rawItems));
    },
  },
});
