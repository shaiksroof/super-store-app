<template>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useMeta, Notify, useQuasar } from 'quasar';
import utility from "./services/utility.service";
const { promised } = utility();
useMeta({ title: "Super Store" })
const $q = useQuasar()

promised.on('api-done', (arg1, arg2, arg3) => {
 $q.notify('Message')
})

</script>
