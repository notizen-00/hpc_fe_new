<template>
  <div
    class="w-5/6 fixed top-5 right-7 rounded-xl z-10 bg-white border border-1 shadow-xl"
  >
    <div class="flex justify-between h-24 mx-10">
      <div class="text-h6 text-slate-700 mx-3 mt-3 flex justify-between">
        <v-avatar
          image="https://placehold.co/600x400/black/white?text=DI"
          size="69"
        ></v-avatar>
        <div class="text-slate-700 ml-3 align-middle items-center">
          <div class="pt-2">{{ getUser.name }}</div>
          <div class="text-muted text-sm text-slate-500">
            {{ getUser.department_number }}
          </div>
        </div>
      </div>
      <div class="flex justify-end w-1/2 items-center h-16 mt-3">
        <!-- <v-text-field
          :loading="loading"
          class="w-1/2 mr-3 mt-3"
          append-inner-icon="fa-duotone fa-search"
          density="compact"
          label="Search ..."
          variant="solo"
          rounded="xl"
          hide-details
          single-line
          @click:append-inner="onClick"
        ></v-text-field> -->

        <!-- Tambahkan h-16 atau sesuai tinggi yang diinginkan -->
        <!-- <v-btn
          @click="refreshPage"
          icon="fa-duotone fa-refresh"
          class="mt-3 mr-2"
          color="red"
          variant="tonal"
        ></v-btn> -->
        <notification class="mt-3"></notification>
      </div>
    </div>
  </div>
</template>
<script setup>
import Notification from "@/screen/Notification.vue";
import { storeToRefs } from "pinia";
import { inject, ref } from "vue";

const store = inject("store");

const loaded = ref(false);
const loading = ref(false);

const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};
const { getUser } = storeToRefs(store.authStore);
</script>