<template>
  <q-header reveal>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        size="md"
        icon="more_vert"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        class="text-bright"
      />
      <q-toolbar-title>
      <router-link to="/">Super Store
    </router-link></q-toolbar-title>
      <q-btn flat round dense icon="apps" class="q-mr-xs text-bright" />

      <router-link to="/cart">

      <q-btn dense round size="md" icon="shopping_cart" class="q-ml-md bg-secondary">
        <q-badge floating class="bg-accent text-primary">{{cart.items.length}}</q-badge>
      </q-btn>
    </router-link>
    </q-toolbar>
  </q-header>
  <EssentialLink :config="leftDrawerOpen" />
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useCartStore } from "stores/cart";
const cart = useCartStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style lang="scss" scoped>
@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  // .header {
  //   background-color: #0000001a;
  //   -webkit-backdrop-filter: blur(12px);
  //   backdrop-filter: blur(12px);
  // }
}

@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  // .header {
  //   background-color: #e0e0e0;
  // }
}
</style>
