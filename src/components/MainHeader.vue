<template>
  <q-header class="bg-transparent text-primary q-pt-lg q-pb-lg">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> {{ title }} </q-toolbar-title>

      <ul class="secondary-menu">
        <li>
          <a href="#"><q-icon :size="'xs'" name="search" /></a>
        </li>
        <li>
          <a href="#"><q-icon :size="'xs'" name="thumb_up" /></a>
        </li>
        <li>
          <a href="#"><q-icon :size="'xs'" name="thumb_up" /></a>
        </li>
      </ul>
    </q-toolbar>
  </q-header>
  <EssentialLink :config="leftDrawerOpen" />
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const leftDrawerOpen = ref(false);
const title = ref("Mobile App");

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
