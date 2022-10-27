<template>
  <q-header bordered class="header bg-transparent text-primary q-pt-sm q-pb-sm">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        size="lg"
        icon="menu"
        color="secondary"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> 
      <router-link to="/">Sample Cart App 
    </router-link></q-toolbar-title>
      <router-link to="/cart">

      <q-btn dense color="secondary" round icon="shopping_cart" class="q-ml-md">
        <q-badge color="primary" floating>{{cart.items.length}}</q-badge>
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
  .header {
    background-color: #0000001a;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
  }
}

@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .header {
    background-color: #e0e0e0;
  }
}
</style>
