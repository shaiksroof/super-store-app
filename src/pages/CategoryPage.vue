<template>
  <q-page class="flex q-ma-md">
    <ProductList :products="products" />
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import ProductList from "components/ProductList.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import  $axios  from "./../services/axiosInterceptors.service";

const route = useRoute();
const products = ref([]);

onBeforeRouteUpdate((to, from) => {
  fetchCategory(to.params.category);
});
onBeforeMount(() => {
  fetchCategory(route.params.category);
});
function fetchCategory(category) {
  $axios()
    .get(`product/${category}`)
    .then(function (response) {
      products.value = response.data;
    })
}
</script>
