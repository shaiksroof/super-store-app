<template>
  <CarouselForIndex />
  <q-page class="flex q-ma-md">
    <h2 class="text-h6">Available Products</h2>
    <ProductList :products="products" />
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import CarouselForIndex from "components/CarouselForIndex.vue";
import ProductList from "components/ProductList.vue";
const products = ref([]);
onBeforeMount(() => {
  fetch(`${process.env.API}/products.json`)
    .then((r) => r.json())
    .then((data) => {
      products.value = data;
    });
});
</script>
