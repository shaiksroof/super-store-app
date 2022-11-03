<template>
  <q-drawer v-model="open" bordered class="bg-grey-3">
    <q-scroll-area class="fit">
      <div class="text-overline q-ml-md">Logged in as:</div>
      <h6 class="text-h6 q-ma-none q-ml-md">Shaik Nayeem</h6>
      <a class="text-caption q-ml-md" @click="() => alert('logout')">Logout</a>
      <q-list>
        <q-separator spaced />
        <q-item>
          <q-item-section>
            <q-item-label>Categories</q-item-label>
          </q-item-section>
        </q-item>
        <template v-for="(link, index) in essentialLinks" :key="index">
          <router-link
            :to="{ name: 'category', params: { category: link.label } }"
          >
            <q-item clickable :active="link.label === 'Outbox'" v-ripple>
              <q-item-section class="text-primary" avatar>
                <q-icon :name="'help'" />
              </q-item-section>
              <q-item-section class="text-capitalize text-secondary">
                <div class="text-subtitle2">{{ link.label }}</div>
                <div class="text-caption text-primary">{{ link.value }}</div>
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
        <router-link :to="{ name: 'addproduct' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`add`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Add Product</q-item-section
            >
          </q-item>
        </router-link>
        <router-link :to="{ name: 'addcategory' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`add`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Add Category</q-item-section
            >
          </q-item>
        </router-link>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon :name="`help`" />
          </q-item-section>
          <q-item-section class="text-capitalize"
            ><a ref="lik" href="https://an-cart-app.herokuapp.com/"
              >Help</a
            ></q-item-section
          >
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import  $axios  from "./../services/axiosInterceptors.service";
const essentialLinks = ref([]);
onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
      essentialLinks.value = response.data;
    })
});

const lik = ref(null);
onBeforeMount(() => {
  //console.log(lik);
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
.q-item__section--avatar{
  min-width:auto
}
</style>
