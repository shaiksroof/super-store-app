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
        <template v-for="(catogory, index) in catogories" :key="index">
          <router-link
            :to="{ name: 'category', params: { category: catogory.label } }"
          >
            <q-item clickable :active="catogory.label === 'Outbox'" v-ripple>
              <q-item-section class="text-primary" avatar>
                <q-icon :name="catogory.icon" />
              </q-item-section>
              <q-item-section class="text-capitalize text-secondary">
                <div class="text-subtitle2">{{ catogory.label }}</div>
                <div class="text-caption text-primary">{{ catogory.value }}</div>
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
              <q-icon :name="`add`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Product</q-item-section
            >
          </q-item>
        </router-link>
        <router-link :to="{ name: 'managecategory' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`add`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Category</q-item-section
            >
          </q-item>
        </router-link>

        <router-link :to="{ name: 'managediscount' }">
          <q-item clickable v-ripple>
            <q-item-section class="text-primary" avatar>
              <q-icon :name="`add`" />
            </q-item-section>
            <q-item-section class="text-capitalize text-secondary">
              Manage Discount</q-item-section
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
const catogories = ref([]);
onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
      catogories.value = response.data;
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
