<template>
  <q-page class="flex q-pl-lg q-pr-lg">
    <CarouselForIndex />
    <h2 class="text-h6">Available Products</h2>
    <ProductList />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CarouselForIndex from "components/CarouselForIndex.vue";
import ProductList from "components/ProductList.vue";
</script>
