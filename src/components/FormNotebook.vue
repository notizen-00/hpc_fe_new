<template>
  <v-sheet class="mx-auto relative" width="300">
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="name"
        :rules="rules"
        variant="outlined"
        label="Nama Notebook"
      ></v-text-field>
      <v-btn
        absolute
        :loading="isLoading"
        color="primary"
        variant="outlined"
        class="mt-2 -bottom-10"
        type="submit"
        prependIcon="fa-duotone fa-circle-play"
        block
        >Deploy</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = inject("store");

const { isLoading, getNotebook } = storeToRefs(store.notebookStore);

const name = ref("");
const loading = ref(false);
const rules = [
  (value) => {
    if (value) return true;
    return "form name is required !";
  },
];
const createSlug = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with a dash
    .replace(/^-|-$/g, ""); // Remove leading and trailing dashes
};
const showNotif = (status, message) => {
  loading.value = true;
  setTimeout(() => {
    store.overlayStore.toggleOverlay(status, message);
    loading.value = false;
  }, 2000);
};
const handleSubmit = () => {
  console.log(name.value);
  const nama = createSlug(name.value);
  loading.value = true;
  if (nama == "") {
    loading.value = false;
    const option = { timeout: 2000, position: "top-center" };
    toast.error("Isikan Nama Server Notebook !", option);
  } else {
    loading.value = true;

    const response = store.notebookStore.createNotebook(nama);
    console.log(response);
    if (response == true) {
      loading.value = false;
      toast.success("Notebook server has been deployed !");
    } else if (response == 409) {
      loading.value = false;
      toast.warning('Server Notebook "' + name.value + '" already exists !');
    } else {
      loading.value = false;
      console.log("gagal");
      name.value = "";
      //   showNotif(500, "Server Notebook Gagal di Deploy");
    }
  }
};

onMounted(async () => {
  store.notebookStore.fetchNotebook();
  await store.notebookStore.closeLoading();
});

onUnmounted(() => {
  store.notebookStore.fetchNotebook();
});
</script>
