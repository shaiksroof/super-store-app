<template>
  <q-page class="q-ma-md">
    <q-card class="shadow-05">
      <q-list separator v-if="list_items.length">
        <q-item>
          <q-item-section class="text-h6">Categories</q-item-section>
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
          <q-item-section class="text-primary" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section class="text-capitalize text-secondary">
            <div class="text-subtitle2">{{ item.label }}</div>
            <div class="text-caption text-primary">{{ item.description }}</div>
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
        No Category Listed!
        <template v-slot:action>
          <q-btn flat label="Add Category" @click="onAdd()" />
        </template>
      </q-banner>
    </q-card>
  </q-page>
  <q-dialog v-model="alert" >
    <q-card class="" style="width:400px; min-width:360px">
      <q-card-section class="row items-center q-pb-none">
        <q-item-label>New Category</q-item-label>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="q-pa-md">
        <q-form
          ref="myForm"
          @submit="onSubmit('category')"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            v-model="form_data.label"
            label="Category"
            hint="Needed for categorizing the products"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please add category']"
          />
          <q-input
            v-model="form_data.icon"
            label="Category icon"
            hint="Representing icon"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please add category icon']"
          />
          <q-input
            v-model="form_data.description"
            label="Category Desciption"
            hint="Few lines about category"
            lazy-rules
            dense
            :rules="[ val => val && val.length > 0 || 'Please add description']"
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
  <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">You are about to delete a category. Please confirm.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" @click="deleteConfirmed('category')" color="danger" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import {onBeforeMount } from "vue";
import  utility  from "./../services/utility.service";

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
  getItemList("category");
});
</script>
