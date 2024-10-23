<template>
  <div class="d-flex flex-column align-center bg-gray-700 pa-1">
    <span class="text-h6 text-slate-100 font-bold"
      ><i class="fa-duotone fa-solid fa-screwdriver-wrench mr-1"></i> HPC
      Services</span
    >
    <!-- <v-divider class="my-3"></v-divider> -->
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      class="mt-2 mb-4"
      mandatory
      divided
    >
      <v-btn append-icon="fas fa-server" text="Jupyter" value="jupyter"></v-btn>
      <v-btn append-icon="fas fa-server" text="Docker" value="Docker"></v-btn>
      <v-btn append-icon="fas fa-server" text="R" value="R"></v-btn>
    </v-btn-toggle>
  </div>
  <div
    class="container mx-auto"
    v-if="toggle === 'jupyter'"
    ref="bottomElement"
  >
    <Jupyter />

    <!-- <JupyterError v-else> </JupyterError> -->
  </div>
  <div class="container mx-auto" v-if="toggle === 'Docker'" ref="bottomElement">
    <Docker />
  </div>
  <div class="container mx-auto" v-if="toggle === 'R'" ref="bottomElement">
    <R />
  </div>

  <div class="container h-full mx-auto" v-if="toggle === ''">
    <SupportLayout></SupportLayout>
  </div>
</template>

<script setup>
import { ref, inject, watch, nextTick } from "vue";
import Jupyter from "@/components/Services/Jupyter.vue";
import Docker from "@/components/Services/Docker.vue";
import JupyterError from "@/components/Services/error/JupyterError.vue";
import R from "@/components/Services/R.vue";
import { storeToRefs } from "pinia";
import SupportLayout from "@/containers/Support/SupportLayout.vue";
import JupyterErrorVue from "./Services/error/JupyterError.vue";
// Toggle state
const toggle = ref("");
const store = inject("store");

const { getConnection } = storeToRefs(store.JupyterStore);
const { getUserOnline } = storeToRefs(store.groupStore);
const bottomElement = ref(null);

watch(toggle, async (newVal) => {
  await nextTick();
  if (bottomElement.value) {
    bottomElement.value.scrollIntoView({ behavior: "smooth" });
  }
});
</script>
