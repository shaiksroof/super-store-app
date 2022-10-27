<template>
  <q-page style="max-width: 600px; margin-left:auto; margin-right: auto">
      <div  class="q-pa-md ">
        <q-banner rounded class="bg-purple-8 text-white" v-if="!cart.items.length">

          Your cart is empty, please add items to cart and proceed further..

<template v-slot:action>
  <router-link to="/">
  <q-btn flat color="white" label="Continue to Homepage" />
  </router-link>
</template>
</q-banner>

  <q-list bordered padding class="bg-white" v-if="cart.items.length">
<template v-for="item in cart.items" :key="item.name.id">
      <q-item>
        <q-item-section top thumbnail class="q-ml-none">
            <a :href="'#/product/' + item.name.id">
          <img 
            :src="item.name.image"
              :alt="item.name.title">
            </a>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{item.name.title}}</q-item-label>
          <q-item-label caption>{{item.name.description}}</q-item-label>
          <q-item-label>Qty: {{item.amount}} X {{item.name.price}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{(item.amount * item.name.price)}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced />
      
    </template>
    <q-item>

        <q-item-section>
          <q-item-label class="text-right">Total Price: </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption class="text-primary text-weight-bold">{{amount}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import CarouselForIndex from "components/CarouselForIndex.vue";
import ProductList from "components/ProductList.vue";
import { useCartStore } from "stores/cart";
const cart = useCartStore();
const amount = computed(() => {
  return cart.items.reduce((total, item) => {
    return total+(item.name.price * item.amount);
  }, 0)
});
const itemPrice = computed((item) => {
  return item.amount * item.name.price
});
</script>
