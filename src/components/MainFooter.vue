<template>
  <q-footer reveal :model-value="footerEnabled">
    <q-toolbar>
      <q-toolbar-title>Footer</q-toolbar-title>
    </q-toolbar>
  </q-footer>
  <!--
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
  <EssentialLink :config="leftDrawerOpen" /> -->
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "stores/cart";
const footerEnabled = ref(false)
const cart = useCartStore();
</script>
