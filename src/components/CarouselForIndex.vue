<template>
  <div class="full-width">
    <q-carousel animated v-model="slide" arrows navigation infinite>
      <q-carousel-slide
        v-for="slide in slides"
        :key="slide.name"
        :name="slide.name"
        :img-src="slide.src"
      >
        <div class="custom-caption q-pa-xl">
          <div class="text-h2 text-primary">First stop</div>
          <div class="text-subtitle1 text-secondary">Mountains</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
const slide = ref("1");
const slides = [
  {
    src: "https://cdn.quasar.dev/img/mountains.jpg",
    name: "1",
  },
  {
    src: "https://cdn.quasar.dev/img/parallax1.jpg",
    name: "2",
  },
  {
    src: "https://cdn.quasar.dev/img/parallax2.jpg",
    name: "3",
  },
  {
    src: "https://cdn.quasar.dev/img/quasar.jpg",
    name: "4",
  },
];
</script>
