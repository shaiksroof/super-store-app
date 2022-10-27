<template>
  <q-page class="q-ma-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{product.category}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{product.title}}</div>
          <div class="text-caption text-grey q-mt-lg">
            {{product.description}}</div>

            <div class="text-subtitle1 text-secondary q-mt-lg">
                {{ product.price }}
              </div>
            <q-separator class="q-mt-lg" />

      <q-card-actions>
              <q-btn flat round icon="shopping_cart" />
              <q-btn flat color="primary" @click="ATC(product)"> Add to Cart </q-btn>
            </q-card-actions>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="product.image"
              :alt="product.title"
          />
        </q-card-section>

      </q-card-section>


    </q-card>

  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from 'vue-router';

import { useCartStore } from "stores/cart";
const cart = useCartStore();

const route = useRoute()
const product = ref({});

onBeforeMount(() => {
  fetch(`https://fakestoreapi.com/products/${route.params.id}`).then((r) => r.json()).then(data => {
      product.value = data;
  })
});

function ATC(product){
  cart.addItem(product);
}
</script>
