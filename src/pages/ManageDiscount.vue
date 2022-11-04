<template>
  <q-page class="q-ma-md">
    <div class="q-pa-md">
      <q-card bordered>
        <q-list separator>
          <q-item>
            <q-item-section>Discounts</q-item-section>
            <q-item-section side>
              <q-icon name="add" @click="onAdd()"  class="cursor-pointer" color="primary" size="1.5em" />
            </q-item-section>
          </q-item>
          <q-item v-for="(item, index) in list_items" :key="index">
            <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{item.percent}}
          </q-avatar>
        </q-item-section>

            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
              <q-item-label caption>{{item.description}}</q-item-label>
            </q-item-section>

          <q-item-section side>
            <q-icon name="edit" @click="onEdit(item)" color="secondary" class="cursor-pointer" size="1.5em" />
          </q-item-section>
          <q-item-section side>
            <q-icon name="delete" @click="onDelete(item.id)" color="secondary" class="cursor-pointer" size="1.5em" />
          </q-item-section>
          </q-item>
      </q-list>
      </q-card>
      <q-dialog v-model="alert" >
        <q-card class="" style="width:400px; min-width:360px">
          <q-card-section class="row items-center q-pb-none">
              <q-item-label>New Discount</q-item-label>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
<div class="q-pa-lg q-pt-xs">
        <q-form
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            v-model="form_data.label"
            label="Add Label"
            hint="It can be the discount season/time"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="form_data.description"
            label="Desciption"
            hint="Add details about the discount"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="form_data.percent"
            type="number"
            label="Percentage"
            hint="Add Percent of discount"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          ><template v-slot:prepend>
          <q-icon name="percent" />
        </template>
          </q-input>

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
const list_items = ref([]);

onBeforeMount(() => {
  $axios()
    .get("discount")
    .then(function (response) {
        list_items.value = response.data
    })
});

function onSubmit() {
  $axios()
    .post("discount", form_data.value)
    .then(function (response) {
      alert.value = !alert.value;
      onReset();
    })
}
function onReset() {
  form_data.value = {};
}

function onAdd() {
  onReset();
  alert.value = !alert.value;
}
function onEdit(item) {
  form_data.value = item
  alert.value = !alert.value;
}
function onDelete(id) {
  $axios()
    .delete("discount", { data: { id } })
    .then(function (response) {
      list_items.value = list_items.value.filter((item) => {
        return item.id != id;
      })
    })
}
</script>
