<template>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useMeta, Notify, useQuasar } from 'quasar';
import eventBus from "./services/eventBus.service";
useMeta({ title: "Super Store" })
const $q = useQuasar()

eventBus.on("api-done", (arg1, arg2, arg3) => {
  $q.notify(arg1)
});

</script>
