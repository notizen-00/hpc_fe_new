<template>
  <v-navigation-drawer color="#d9083c" class="flex">
    <v-list style="background-color: black" class="bg-black">
      <!-- <v-list-item
        :prepend-avatar="`https://placehold.co/600x400/000000/FFF/?text=${getUser.name
          .slice(0, 2)
          .toUpperCase()}`"
        :subtitle="getUser.uid"
        :title="getUser.name"
      ></v-list-item> -->
      <v-img :src="Logo" cover class="mx-7"> </v-img>
    </v-list>

    <v-divider
      :thickness="3"
      class="border-opacity-100 border-white"
      color="success"
    ></v-divider>

    <v-list density="compact" nav class="m-2 mt-12">
      <v-list-item value="inbox" active>
        <template #prepend>
          <i class="fa-light fa-house text-white fa-1x ml-3 mr-3 text-xl"></i>
        </template>
        <template #title>
          <span class="text-xl font-medium">Dashboard</span>
        </template>
      </v-list-item>
      <v-list-item value="layanan" class="mt-3">
        <template #prepend>
          <i class="fa-light fa-grid-2 text-white fa-1x ml-3 mr-3 text-xl"></i>
        </template>
        <template #title>
          <span class="text-xl font-medium">PlayGround</span>
        </template>
      </v-list-item>
      <v-list-item value="Dataset" class="mt-3">
        <template #prepend>
          <i class="fa-light fa-table text-white fa-1x ml-3 mr-3 text-xl"></i>
        </template>
        <template #title>
          <span class="text-xl font-medium">Datasets</span>
        </template>
      </v-list-item>
      <v-list-item value="Model" class="mt-3">
        <template #prepend>
          <i
            class="fa-light fa-chart-network text-white fa-1x ml-3 mr-3 text-xl"
          ></i>
        </template>
        <template #title>
          <span class="text-xl font-medium">Models</span>
        </template>
      </v-list-item>

      <v-list-item value="Services" class="mt-3">
        <template #prepend>
          <i class="fa-light fa-user text-white fa-1x ml-3 mr-3 text-xl"></i>
        </template>
        <template #title>
          <span class="text-xl font-medium">Account</span>
        </template>
      </v-list-item>
    </v-list>
    <!-- <div class="position-relative"> -->
    <div
      class="d-flex w-full justify-contents-center flex-column mb-6 absolute bottom-10"
    >
      <div class="text-center">
        <v-btn
          icon="fa-light fa-right-from-bracket"
          variant="tonal"
          color="white"
          @click="store.authStore.doLogout()"
        ></v-btn>
      </div>
    </div>

    <div
      class="d-flex w-full justify-contents-center flex-column absolute bottom-0"
    >
      <div class="text-center">InovAi.</div>
    </div>
    <!-- </div> -->
  </v-navigation-drawer>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Logo from "@/assets/logo.png";

const store = inject("store");

const { getUser, getSubscribe } = storeToRefs(store.authStore);

onMounted(() => {
  store.planStore.fetchPlan();
});
</script>
