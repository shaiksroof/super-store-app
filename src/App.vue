<template>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from 'quasar';
useMeta({title: "My Super Store"})
</script>
