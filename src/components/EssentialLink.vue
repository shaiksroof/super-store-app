<template>
  <q-drawer v-model="open" bordered class="bg-accent">
    <q-scroll-area class="fit">
      <h6 class="text-h6 q-ma-md">
        <span style="text-shadow:0px 1px rgb(0 0 0 / 10%); font-size: 1.5rem;">APPS<span class="text-secondary"
            style="font-size:1.9rem; font-weight:100;">era</span></span> <span style="font-size:0.8rem"> Super
          Shop</span>
      </h6>
      <q-separator spaced />
      <q-list dense>
        <template v-for="(catogory, index) in catogories" :key="index">
          <router-link :to="{ name: 'category', params: { category: catogory.label } }">
            <q-item clickable :active="catogory.label === 'Outbox'" v-ripple>
              <q-item-section class="text-primary" avatar>
                <q-icon :name="catogory.icon" />
              </q-item-section>
              <q-item-section class="text-capitalize text-secondary">
                <div class="text-subtitle2">{{ catogory.label }}</div>
                <div class="text-caption text-primary">{{ catogory.description }}</div>
              </q-item-section>
            </q-item>
          </router-link>
        </template>
        <q-separator spaced />
        <q-item>
          <q-item-section>
            <q-item-label>Admin</q-item-label>
          </q-item-section>
        </q-item>
        <router-link :to="{ name: 'manageproduct' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`inventory_2`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Product</q-item-section>
          </q-item>
        </router-link>
        <router-link :to="{ name: 'managecategory' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`category`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Category</q-item-section>
          </q-item>
        </router-link>

        <router-link :to="{ name: 'managediscount' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`discount`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Discount</q-item-section>
          </q-item>
        </router-link>
        <q-separator spaced />
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon :name="`help`" />
          </q-item-section>
          <q-item-section class="text-capitalize"><a ref="lik" href="https://an-cart-app.herokuapp.com/">Help</a>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import $axios from "./../services/axiosInterceptors.service";
const catogories = ref([]);
onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
      catogories.value = response.data;
    })
});

const open = ref(false);
const props = defineProps({
  config: Boolean,
});

watch(
  () => props.config,
  () => {
    open.value = !open.value;
  }
);
</script>

<style lang="scss" scoped>
.q-item__section--avatar {
  min-width: auto
}
</style>
