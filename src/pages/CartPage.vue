<template>
  <q-page class="q-ma-md">
    <div v-if="cart.items.length">
      <q-card class="shadow-05">
        <q-list separator>
          <q-item>
            <q-item-section class="text-h6">Items in the cart</q-item-section>

            <q-item-section side>
              <q-item-label caption class="text-primary text-weight-bold">{{
                  amount
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(item, index) in cart.items" :key="index">
            <q-item-section avatar top>
              <q-skeleton type="QAvatar" animation="fade" v-if="!item.name.images" />
              <q-avatar rounded v-else>
                <router-link :to="{ name: 'product', params: { id: item.name.id } }">
                  <img :src="getProductImage(item.name.images)" :alt="item.name.title" />
                </router-link>
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-item-label lines="1" class="text-weight-medium">
                {{ item.name.title }}
              </q-item-label>
              <q-item-label caption lines="1">{{ item.name.description }}
              </q-item-label>
              <q-item-label>Qty: <span class="text-secondary qty">
                  <q-badge>{{ item.amount }}</q-badge>
                  <q-popup-edit v-model="item.amount" :cover="false" style="width:50px" :offset="[0, 4]" v-slot="scope">
                    <q-input color="accent" v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                  </q-popup-edit>
                  X {{ item.name.price }}
                </span>
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label>{{
                  item.amount * item.name.price
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-right">Total Price: </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption class="text-primary text-weight-bold">{{
                  amount
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <div class="q-mt-md text-right">
        <router-link :to="{ name: 'checkout' }">
          <q-btn color="primary">Continue to Checkout</q-btn>
        </router-link>
      </div>
    </div>
    <q-banner v-else rounded class="text-dark">
      Your cart is empty, please add items to cart and proceed further.
      <template v-slot:action>
        <router-link to="/">
          <q-btn flat label="Continue to Homepage" />
        </router-link>
      </template>
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "stores/cart";
import utility from "./../services/utility.service";

const { getProductImage } = utility();
const cart = useCartStore();
const amount = computed(() => {
  return cart.items.reduce((total, item) => {
    return total + item.name.price * item.amount;
  }, 0);
});
const itemPrice = computed((item) => {
  return item.amount * item.name.price;
});
</script>
