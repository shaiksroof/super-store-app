<template>
  <q-header reveal height-hint="0">
    <q-toolbar>
      <q-btn flat dense round size="md" icon="more_vert" aria-label="Menu" @click="toggleLeftDrawer"
        class="text-bright" />
      <q-toolbar-title>
        <router-link to="/">Super Store
        </router-link>
      </q-toolbar-title>
      <q-btn flat dense label="Login" v-if="!user?.data[0]?.id" @click="alert = !alert" class="q-mr-xs text-bright" />
      <router-link to="/cart">
        <q-btn dense round size="md" icon="shopping_cart" class="q-ml-md bg-secondary">
          <q-badge floating class="bg-accent text-primary">{{ cart.items.length }}</q-badge>
        </q-btn>
      </router-link>
    </q-toolbar>
  </q-header>
  <EssentialLink :config="leftDrawerOpen" />

  <q-dialog v-model="alert">
    <q-card class="" style="width:400px; min-width:360px">
      <q-card-section class="row items-center q-pb-none">
        <q-item-label>Login</q-item-label>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="q-pa-md">
        <q-form ref="myForm" @submit="onSubmit('login')" @reset="onReset" class="q-gutter-md">
          <q-input v-model="form_data.email" autocomplete="email" label="Email" hint="Ex. email@xyz.com" lazy-rules
            dense :rules="[val => val && val.length > 0 || 'Ex. email@xyz.com']" />
          <q-input v-model="form_data.password" type="password" autocomplete="current-password" label="Password"
            hint="Password" lazy-rules dense :rules="[val => val && val.length > 0 || 'Please type something']" />
          <div class="text-right">
            <q-btn label="Submit" type="submit" dense color="primary q-pl-sm q-pr-sm" />
            <q-btn label="Reset" type="reset" color="primary" flat dense class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "stores/cart";
import { useUserStore } from "stores/user";
import EssentialLink from "components/EssentialLink.vue";
import utility from "./../services/utility.service";

const { onReset, alert, form_data, submitted } = utility();
const cart = useCartStore();
const user = useUserStore();

const leftDrawerOpen = ref(false);

function onSubmit(path) {
  submitted(path, (result) => {
    user.login(result);
  })
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
