<template>
  <div class="full-width">
    <q-infinite-scroll @load="onLoad" :offset="300">
      <div class="row q-col-gutter-md">
        <q-intersection
          v-for="product in products"
          :key="product.id"
          once
          transition="scale"
          class="col col-md-3 col-sm-4 col-xs-6"
        >
          <q-card rounded>
            <router-link :to="{ name: 'product', params: { id: product.id } }">
              <q-img
                :src="product.url"
                :alt="product.title"
                spinner-color="primary"
                style="max-height: 150px"
              />
            </router-link>
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">{{ product.title }}</div>
              </div>
              <div class="text-subtitle1 text-positive">
                <span class="text-strike text-secondary"> {{ product.price }} </span> <small class="text-primary">{{product.percent}}% Discount</small><br />{{ percentage(product) }}

              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="shopping_cart" />
              <q-btn flat color="primary" @click="ATC(product)">
                Add to Cart
              </q-btn>
            </q-card-actions></q-card
          >
        </q-intersection>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "stores/cart";

const cart = useCartStore();

const props = defineProps({
  products: Array,
});

function percentage(product) {
  return product.price - (product.price * product.percent) / 100
};


function ATC(product) {
  cart.addItem(product);
}
function onLoad(index, done) {
  //     fetch(`https://fakestoreapi.com/products`).then((r) => r.json()).then(data => {
  //     products.value.push(data);
  //  })
  done();
}
</script>
<style lang="scss" scoped>
.product-tile {
  img {
    width: 100%;
  }
  h5 {
    font-size: 1rem;
  }
  .price {
    color: $secondary;
  }
}
</style>
