<template>
  <q-drawer v-model="open" bordered class="bg-grey-3">
    <q-scroll-area class="fit">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Categories</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <template v-for="(menuItem, index) in essentialLinks" :key="index">
          <router-link
            :to="{ name: 'category', params: { category: menuItem.category } }"
          >
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section class="text-primary" avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section class="text-capitalize text-secondary">
                {{ menuItem.category }}
              </q-item-section>
            </q-item>
          </router-link>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
        <q-separator spaced />
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon :name="`help`" />
          </q-item-section>
          <q-item-section class="text-capitalize">Help </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
const essentialLinks = ref([]);
onBeforeMount(() => {
  fetch("./src/assets/data/categories.json")
    .then((res) => res.json())
    .then((json) => (essentialLinks.value = json));
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
