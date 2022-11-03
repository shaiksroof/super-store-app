<template>
  <q-page class="q-ma-md">
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto">

      <q-card class="q-pa-md" bordered>
        <q-list>
          <q-item-section>List of Categories</q-item-section><q-space />
        <q-item-section side><q-icon name="add" @click="alert = true"  color="primary" size="1.5em" />
        </q-item-section></q-list>

        <q-list>
          <q-separator spaced />
        <q-item v-for="category in categories" :key="category.name">
          <q-item-section>
          <q-item-label>{{category.label}}</q-item-label>
          <q-item-label caption>{{category.value}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="edit" color="primary" size="1.5em" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="delete" color="primary" size="1.5em" />
        </q-item-section>
        </q-item>
      </q-list>
      </q-card>
      <q-dialog v-model="alert" >
        <q-card class="" style="max-width:400px">
          <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
<div class="q-pa-lg">
        <q-form
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            v-model="form_data.name"
            label="Category Title"
            hint="Add Title"
            lazy-rules
            dense
          />
          <q-input
            v-model="form_data.desc"
            label="Category Desciption"
            hint="Awesome Category"
            lazy-rules
            dense
          />

          <div class="text-right">
            <q-btn
              label="Submit"
              type="submit"
              dense
              color="primary q-pl-sm q-pr-sm"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              dense
              class="q-ml-sm"
            />
          </div>
        </q-form>
        </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import  $axios  from "./../services/axiosInterceptors.service";

const alert = ref(false);
const form_data = ref({});
const myForm = ref();
const categories = ref([]);

onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
        categories.value = response.data
    })
});

function onSubmit() {
  $axios()
    .post("category", form_data.value)
    .then(function (response) {

    })
}

function onReset() {
  form_data.value = null;
}
</script>
