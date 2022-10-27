<template>
  <q-page class="flex q-ma-md">
    <ProductList :products="products" />
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import ProductList from "components/ProductList.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const products = ref([]);

onBeforeRouteUpdate((to, from) => {
  fetchCategory(to.params.category);
});
onBeforeMount(() => {
  fetchCategory(route.params.category);
});
function fetchCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((r) => r.json())
    .then((data) => {
      products.value = data;
    });
}
</script>
