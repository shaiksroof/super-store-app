<template>
  <q-drawer v-model="open" show-if-above bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>
      <q-item
        clickable
        tag="a"
        target="_blank"
        :href="link.link"
        v-for="link in essentialLinks"
        :key="link.title"
        class="rounded-borders h-nav"
      >
        <q-item-section v-if="link.icon" avatar>
          <q-icon :name="link.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
          <q-item-label link.caption>{{ link.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, watch } from "vue";

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

const essentialLinks = [
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
  {
    title: "Login",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "#login",
  },
];
</script>
