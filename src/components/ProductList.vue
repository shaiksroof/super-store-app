<template>
  <div class="full-width">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="full-width row wrap">
        <q-intersection
          v-for="product in products"
          :key="product.name"
          once
          transition="scale"
          class="col col-md-4 col-sm-6 col-xs-12"
        >
          <q-card class="q-ma-sm">
            <q-img
              :src="product.thumb"
              :alt="product.name"
              spinner-color="primary"
            />
            <q-card-section>
              <h5 class="q-mt-xs q-mb-xs">
                {{ product.name }}
              </h5>
              <div class="price">
                {{ product.price }} {{ product.currency }}
              </div>
              <div class="desc">{{ product.description }}</div>
            </q-card-section></q-card
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
import { ref } from "vue";
function onLoad(index, done) {
  setTimeout(() => {
    // products.push({});
    done();
  }, 1000);
}
const products = [
  {
    thumb: "https://cdn.quasar.dev/img/mountains.jpg",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
    name: "product name",
    description: "Product Description",
    price: "220",
    currency: "INR",
  },
  {
    thumb: "https://cdn.quasar.dev/img/mountains.jpg",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
    name: "product name",
    description: "Product Description",
    price: "220",
    currency: "INR",
  },
  {
    thumb: "https://cdn.quasar.dev/img/mountains.jpg",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
    name: "product name",
    description: "Product Description",
    price: "220",
    currency: "INR",
  },
  {
    thumb: "https://cdn.quasar.dev/img/mountains.jpg",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
    name: "product name",
    description: "Product Description",
    price: "220",
    currency: "INR",
  },
];
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
  .desc {
  }
}
</style>
