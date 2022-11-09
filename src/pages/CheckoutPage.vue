<template>
  <q-page class="q-ma-md">
    <q-card class="shadow-05">
      <div class="row">
        <div class="col-sm-7 col-xs-12">
          <q-list separator>
            <q-item>
              <q-item-section class="text-h6">
                <q-item-label>Addresses</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn round color="secondary" @click="alert = !alert" icon="add" class="shadow-0" size="sm" />
              </q-item-section>
            </q-item>
            <q-item v-if="!list_items.length">
              <q-item-section>
                <q-item-label>Seems you have't added any address. Please add to proceed further.</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-else v-for="(item, index) in list_items" :key="index">
              <q-item-section class="text-primary" avatar>
                <q-radio :name="false" />
              </q-item-section>
              <q-item-section class="text-capitalize text-secondary">
                <div class="text-subtitle2">
                  {{ item.label }}Label
                </div>
                <div class="text-caption text-primary">{{ item.address_a }}
                  {{ item.address_b }}
                  {{ item.city }}
                  {{ item.country }}{{ item.pincode }}</div>
              </q-item-section>
              <q-item-section side>
                <q-btn flat round color="primary" icon="edit" @click="onEdit(item)" size="sm" />
              </q-item-section>
              <q-item-section side>
                <q-btn flat round color="primary" icon="delete" @click="onDelete(item.id)" size="sm" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-sm-5 col-xs-12">
          <q-card class="my-card bg-accent q-ma-lg q-pa-sm shadow-0">
            <q-list>
              <q-item>
                <q-item-section>
                  <div class="text-subtitle2">Payment details</div>

                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section top class="text-caption text-primary">
                  <q-item-label>Total Amount : </q-item-label>
                </q-item-section>
                <q-item-section top side class="text-primary text-bold">
                  <q-item-label> {{ amount }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </q-card>
    <div class="q-mt-md text-right">
      <q-btn color="primary">Complete Payment</q-btn>
    </div>
  </q-page>
  <q-dialog v-model="alert">
    <q-card class="" style="width:400px; min-width:360px">
      <q-card-section class="row items-center q-pb-none">
        <q-item-label>New Address</q-item-label>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="q-pa-md">
        <q-form ref="myForm" @submit="onSubmit('address')" @reset="onReset" class="q-gutter-md">
          <q-input v-model="form_data.label" label="Add adderess label" hint="Home | Office" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add label']" />
          <q-input v-model="form_data.address_a" label="Adderess Line I" hint="House/Flat number" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add line I address']" />
          <q-input v-model="form_data.address_b" label="Addres Line II" hint="Enter area and near by" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add line I address']" />
          <q-input v-model="form_data.city" label="City" hint="Few lines about category" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add description']" />
          <q-input v-model="form_data.country" label="Country" hint="Few lines about category" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add description']" />
          <q-input v-model="form_data.pincode" label="Pincode" hint="Few lines about category" lazy-rules dense
            :rules="[val => val && val.length > 0 || 'Please add description']" />

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
import { ref, onBeforeMount, computed } from "vue";
import { useUserStore } from "stores/user";
import { useCartStore } from "stores/cart";
import utility from "./../services/utility.service";

const user = useUserStore();
const cart = useCartStore();
const {
  alert,
  form_data,
  list_items,
  submitted,
  onReset,
  getItemList
} = utility();
const amount = computed(() => {
  return cart.items.reduce((total, item) => {
    return total + item.name.price * item.amount;
  }, 0);
});
function pay() {

}
function onSubmit(path) {
  form_data.value.user_id = user.id;
  submitted(path);
}

function addAddress() {
  alert.value = !alert.value;
}
onBeforeMount(() => {
  getItemList("address/1");
});
</script>
