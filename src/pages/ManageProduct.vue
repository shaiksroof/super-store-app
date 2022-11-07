<template>
  <q-page class="q-ma-md">
    <q-card class="shadow-05">
      <q-list separator v-if="list_items?.length">
        <q-item>
          <q-item-section class="text-h6">Products</q-item-section>
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
          <q-skeleton type="QAvatar" animation="fade" v-if="!item.images" />
          <q-item-section avatar top v-else>
            <q-avatar rounded>
              <img :src="getProductImage(item.images)">
            </q-avatar>
          </q-item-section>
          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{item.title}}</q-item-label>
          </q-item-section>
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{item.title}}</span>
            </q-item-label>
            <q-item-label caption lines="1">{{item.description}}
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2">
              MRP: <span class="text-strike">{{item.price}}</span> <span class="text-weight-bold text-primary">{{getProductPerc(item)}}</span> Discount: {{item.percent}}%
            </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <q-btn flat round color="primary" icon="edit" @click="onEdit(item)" size="sm" />
          </q-item-section>
          <q-item-section top side>
            <q-btn flat round color="primary" icon="delete" @click="onDelete(item.id)" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-banner v-else rounded class="text-dark">
        No Products Found!
        <template v-slot:action>
          <q-btn flat label="Add Product" @click="onAdd()" />
        </template>
      </q-banner>
    </q-card>
  </q-page>
  <q-dialog v-model="alert" >
    <q-card class="" style="width:80%; min-width:360px">
      <q-card-section class="row items-center q-pb-none">
        <q-item-label>New Category</q-item-label>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
        <q-form
          ref="myForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <div class="q-pa-md">
            <div class="row q-col-gutter q-col-gutter-md">
          <div class="col">
              <q-input
                v-model="form_data.title"
                label="Product Title"
                hint="Add Title"
                lazy-rules
                dense
              />
              <q-input
                v-model="form_data.description"
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
                v-model="category"
                :options="categories"
                label="Product Category"
                hint="Select Category from the  list"
                lazy-rules

                dense
              />
          </div>
          <div class="col-6">
              <q-file v-model="form_data.files" label="Add images" hint=".png|.gif|.jpg/e are supported"
                multiple
                lazy-rules
                dense>
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>

              <q-input
                v-model="form_data.price"
                label="Product Price"
                hint="Ex. 200"
                lazy-rules
                dense
              />
              <q-select
                v-model="discount"
                :options="discounts"
                label="Product Discount"
                hint="Discount on Product"
                lazy-rules
                dense
              />
            </div>
            </div>
          </div>
          <div class="text-right q-pb-md q-pr-md q-ma-none">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
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
        <q-btn flat label="Delete" @click="deleteConfirmed('product')" color="danger" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
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
  fileSubmit,
  deleteConfirmed,
  getItemList,
  getProductPerc,
  getProductImage
} = utility();
let categories = ref([]);
let discounts = ref([]);
let category = ref("")
let discount = ref("")

function onSubmit() {
  form_data.value.category = category?.value.label
  form_data.value.discount_id = discount?.value.value
  fileSubmit("product");
}
onBeforeMount(() => {
  getItemList("product");
  getItemList("category", categories);
  getItemList("discount/percets", discounts);
});
watch(categories, (currentValue, oldValue) => {
  category.value = categories?.value[0]
});
watch(discounts, (currentValue, oldValue) => {
  discount.value = discounts?.value[0]
});

</script>
