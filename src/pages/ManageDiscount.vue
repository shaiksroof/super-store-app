<template>
  <q-page class="q-ma-md">
    <q-card class="shadow-05">
      <q-list separator v-if="list_items.length">
        <q-item>
          <q-item-section class="text-h6">Discounts</q-item-section>
          <q-item-section side>
            <q-btn
              round
              color="secondary"
              @click="onAdd()"
              icon="add"
              class="shadow-0"
              size="sm"
            />
          </q-item-section>
        </q-item>
        <q-item v-for="(item, index) in list_items" :key="index">
          <q-item-section side>
            <q-item-label class="text-h6 text-primary">{{item.percent}} %</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.label}}</q-item-label>
            <q-item-label caption>{{item.description}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round color="primary" icon="edit" @click="onEdit(item)" size="sm" />
          </q-item-section>
          <q-item-section side>
            <q-btn flat round color="primary" icon="delete" @click="onDelete(item.id)" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-banner v-else rounded class="text-dark">
        No Discounts Listed!
        <template v-slot:action>
          <q-btn flat label="Add Discount" @click="onAdd()" />
        </template>
      </q-banner>
    </q-card>
  </q-page>
  <q-dialog v-model="alert" >
    <q-card class="" style="width:400px; min-width:360px">
      <q-card-section class="row items-center q-pb-none">
        <q-item-label>New Discount</q-item-label>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          ref="myForm"
          @submit="onSubmit('discount')"
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
          >
            <template v-slot:prepend>
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
  <q-dialog v-model="confirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="warning" text-color="white" />
        <span class="q-ml-sm">You are about to delete a category. Please confirm.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" @click="deleteConfirmed('discount')" color="danger" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onBeforeMount } from "vue";
import utility from "./../services/utility.service";

const {
  alert,
  confirmDelete,
  form_data,
  list_items,
  itemToBeDeleted,
  onReset,
  onAdd,
  onEdit,
  onDelete,
  submitted,
  deleteConfirmed,
  getItemList
} = utility();

function onSubmit(path) {
  // any path or data changes
  submitted(path);
}

onBeforeMount(() => {
  getItemList("discount");
});
</script>
