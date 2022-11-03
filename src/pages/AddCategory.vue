<template>
  <q-page class="q-ma-md">
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto">
      <q-card class="q-pa-md" bordered>
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
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import  $axios  from "./../services/axiosInterceptors.service";

const form_data = ref({});
const myForm = ref();


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
