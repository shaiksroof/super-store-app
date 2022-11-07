import { ref } from "vue";
import axios from "axios";
import { EventBus } from "quasar";
import $axios from "./axiosInterceptors.service";

export default function utility() {
  const promised = new EventBus();
  const alert = ref(false);
  const confirmDelete = ref(false);
  const form_data = ref({});
  const list_items = ref([]);
  const itemToBeDeleted = ref(null);

  function onReset() {
    form_data.value = {};
  }

  function onAdd() {
    onReset();
    alert.value = !alert.value;
  }

  function onEdit(item) {
    form_data.value = { ...item };
    alert.value = !alert.value;
  }

  function onDelete(id) {
    confirmDelete.value = !confirmDelete.value;
    itemToBeDeleted.value = id;
  }

  async function submitted(path) {
    list_items.value = (await $axios().post(path, form_data.value)).data;
    alert.value = !alert.value;
    onReset();
  }

  async function fileSubmit(path) {
    const formData = new FormData();

    if (form_data.value.files && form_data.value.files.length > 0) {
      for (let i = 0; i < form_data.value.files.length; i++) {
        formData.append("files[" + i + "]", form_data.value.files[i]);
      }
    }
    for (const [key, value] of Object.entries(form_data.value)) {
      formData.append(key, value);
    }

    const data = await axios({
      method: "post",
      url: path,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    list_items.value = data?.data;
    alert.value = !alert.value;
    onReset();
  }

  async function deleteConfirmed(path) {
    await $axios().delete(path, { data: { id: itemToBeDeleted.value } });
    list_items.value = list_items.value.filter((item) => {
      return item.id != itemToBeDeleted.value;
    });
    itemToBeDeleted.value = null;
  }

  async function getItemList(path, assignTo) {
    (assignTo ? assignTo : list_items).value = (await $axios().get(path)).data;
  }

  function getProductPerc(product) {
    return product.price - (product.price * product.percent) / 100;
  }

  function getProductImage(images) {
    const arr = images.split(",");
    return `${process.env.API}/images/${arr[0]}`;
  }

  return {
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
    fileSubmit,
    deleteConfirmed,
    getItemList,
    getProductPerc,
    promised,
    getProductImage,
  };
}
