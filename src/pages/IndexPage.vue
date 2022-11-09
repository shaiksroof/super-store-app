<template>
  <CarouselForIndex />
  <q-page class="flex">
    <div class="q-pa-md full-width">
      <h5 class="text-center q-ma-none q-mt-lg q-mb-md">Top Categories</h5>
      <swiper :slides-per-view="2" effect="fade" :space-between="10" :breakpoints="{
        '640': {
          slidesPerView: 3,
        },
        '768': {
          slidesPerView: 4,
        },
        '1024': {
          slidesPerView: 5,
        },
      }">
        <template v-for="(catogory, index) in catogories" :key="index">
          <swiper-slide class="q-pb-sm">
            <router-link :to="{ name: 'category', params: { category: catogory.label } }">
              <q-card class="q-pa-md no-shadow">
                <div class="text-center text-primary">
                  <q-icon :name="catogory.icon" size="xl" />
                </div>
                <div class="text-h6 text-capitalize text-secondary text-center q-pt-sm">
                  {{ catogory.label }}
                </div>
              </q-card>
            </router-link>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import CarouselForIndex from "components/CarouselForIndex.vue";
import $axios from "./../services/axiosInterceptors.service";

const slide = ref(1)
const catogories = ref([]);

onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
      catogories.value = response.data;
    })
});
</script>
