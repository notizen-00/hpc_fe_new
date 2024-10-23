<template>
  <v-container class="mt-28 ml-3 relative">
    <!-- Row for Flexbox -->
    <v-row class="d-flex justify-space-between">
      <!-- Three Cards in Flexbox -->
      <v-col cols="12" md="6">
        <div
          style="height: 220px; background-color: white"
          class="ml-5 rounded-xl shadow-xl d-flex align-center justify-center border-t-1"
        >
          <div class="d-flex justify-items-between w-full">
            <div class="w-3/4">
              <h2 class="text-red-400 ml-9 mt-2 font-bold">
                Welcome , {{ getUser.name }}
              </h2>
              <small
                class="text-medium-emphasis d-flex justify-space-between align-center"
              >
                <span class="text-slate-400 ml-9 mt-5">
                  <v-avatar
                    icon="fa-duotone fa-circle-check"
                    size="small"
                    variant="tonal"
                  ></v-avatar>

                  Selamat datang di Layanan HPC Universitas Jember
                </span>
              </small>
              <!-- <div class="text-h1 font-weight-black">
                <ip-check></ip-check>
              </div> -->
            </div>
            <div class="w-4/12 ml-44">
              <v-img
                class="text-right w-1/2"
                height="150"
                width="200"
                :src="PeopleMan"
              ></v-img>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="3" md="3">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <div
              v-bind="props"
              :style="{
                height: '220px',
                backgroundColor: isHovering ? 'white' : '#f6dece',
              }"
              class="ml-5 rounded-xl shadow-xl d-flex align-center justify-center cursor-pointer"
              :class="isHovering ? 'shadow-xl shadow-red-400' : 'shadow-xl '"
            >
              <v-img
                height="150"
                src="https://seeklogo.com/images/J/jupyter-logo-A91705F539-seeklogo.com.png"
                class="d-flex align-center justify-center"
                contain
              ></v-img>
            </div>
          </template>
        </v-hover>
      </v-col>

      <v-col cols="3" md="3">
        <div
          style="height: 220px; background-color: #cbddff"
          class="rounded-xl mx-5 shadow-xl d-flex align-center justify-center"
        >
          <v-img
            height="150"
            :src="DockerLogo"
            class="d-flex align-center justify-center"
            contain
          >
          </v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between mt-10">
      <!-- Three Cards in Flexbox -->
      <v-col cols="12" md="6">
        <div
          style="height: 400px; background-color: white"
          class="ml-5 rounded-xl shadow-xl d-flex align-start justify-center border-t-1"
        >
          <div class="d-flex justify-items-between w-full">
            <div class="w-3/4">
              <h2 class="text-red-400 ml-9 mt-9 font-bold">
                Development Progess
              </h2>
            </div>
          </div>
        </div>

        <!-- <v-card
          border="opacity-10 sm"
          class="mx-auto w-full shadow-md"
          color="white"
          height="400"
          rounded="xl"
          variant="tonal"
        >
          <template v-slot:title>
            <div class="font-medium text-primary text-lg mt-4">
              Development Progress
            </div>
          </template>

          <template v-slot:text> </template>
        </v-card> -->
      </v-col>
      <v-col cols="3" md="3">
        <div
          style="height: 220px; background-color: #e8e8e8"
          class="rounded-xl ml-5 shadow-xl d-flex align-center justify-center"
        >
          <v-img
            height="150"
            src="https://download.logo.wine/logo/R_(programming_language)/R_(programming_language)-Logo.wine.png"
            class="d-flex align-center justify-center"
            contain
          >
          </v-img>
        </div>
      </v-col>

      <v-col cols="3" md="3">
        <div
          style="height: 220px; background-color: #d8d0ff"
          class="rounded-xl mx-5 shadow-xl d-flex align-center justify-center"
        >
          <v-img
            height="150"
            :src="RapidLogo"
            class="d-flex align-center justify-center"
            contain
          >
          </v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="12" md="6" lg="6" class="-mt-40">
        <div
          class="bg-white h-32 rounded-xl d-flex justify-center w-/12 items-center"
        >
          <div class="text-red-400 font-bold text-center">
            Connection Status <br />
            <br /><IpCheck /> <br /><small>Check your vpn connection</small>
          </div>
          <br />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import IpCheck from "@/components/IpCheck.vue";
import { inject, onMounted, ref, nextTick } from "vue";
import LogoNvdia from "@/assets/logo-nvidia.png";
import RapidLogo from "@/assets/rapid.png";
import DockerLogo from "@/assets/docker.png";
import PeopleMan from "@/assets/people-man.png";

import { storeToRefs } from "pinia";
const ip = ref(null);
const ips = ref("");
const store = inject("store");
const { getSubscribe, getUser } = storeToRefs(store.authStore);
const { getInfo, getConnection } = storeToRefs(store.jupyterStore);
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString("id", options);
}

onMounted(async () => {
  await nextTick();

  ips.value = ip.value.innerText;
  store.jupyterStore.fetchInfo();
});
</script>
