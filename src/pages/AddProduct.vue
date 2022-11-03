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
            label="Product Title"
            hint="Add Title"
            lazy-rules
            dense
          />
          <q-input
            v-model="form_data.desc"
            label="Product Desciption"
            hint="Awesome Product"
            lazy-rules
            dense
          />

          <q-input
            v-model="form_data.sku"
            label="Product SKU"
            hint="xyz-12-sm-2"
            lazy-rules
            dense
          />
          <q-select
            v-model="form_data.category"
            :options="categories"
            label="Product Category"
            hint="Select Category from the  list"
            lazy-rules
            dense
          />
          <q-input
            v-model="form_data.url"
            label="Product Image Path"
            hint="http://***/imagename.jpg"
            lazy-rules
            dense
          />
          <q-input
            v-model="form_data.price"
            label="Product Price"
            hint="Ex. 200"
            lazy-rules
            dense
          />
          <q-select
            v-model="form_data.discount"
            :options="discount"
            label="Product Discount"
            hint="Discount on Product"
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
import { ref, onBeforeMount } from "vue";
import  $axios  from "./../services/axiosInterceptors.service";
const form_data = ref({});
let categories = ref([]);
let discount = ref([]);

function onSubmit() {
  form_data.value.discount_id = form_data.value.discount.value;
  form_data.value.category = form_data.value.category.label;
  $axios()
    .post("product", form_data.value)
    .then(function (response) {
      alert("Product Added!");
    })
}

function onReset() {
  form_data.value = null;
}
onBeforeMount(() => {
  $axios()
    .get("category")
    .then(function (response) {
      categories.value = response.data;
    })
    $axios()
    .get("discount")
    .then(function (response) {
      discount.value = response.data;
    })
})
</script>
