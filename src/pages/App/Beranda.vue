<template>
  <div class="container w-full mx-10 my-10"></div>
  <MobileLayout v-if="mobile" :key="refreshKey">
    <template #default>
      <CardDashboard></CardDashboard>
    </template>
  </MobileLayout>
  <DesktopLayout v-else :key="refreshDesktopKey">
    <template #default>
      <TopBar></TopBar>

      <CardDashboard></CardDashboard>
      <!-- <ToggleButton></ToggleButton> -->
      <!-- <BottomAlert></BottomAlert>
        <div class="absolute bottom-5 right-5">
          <v-btn @click="scrollToTop" icon="fa-duotone fa-up-to-line"></v-btn>
        </div> -->
    </template>
  </DesktopLayout>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useDisplay } from "vuetify";
import TopBar from "@/layout/desktop/TopBar.vue";
import CardDashboard from "@/components/CardDashboard.vue";
import ToggleButton from "@/components/ToggleButton.vue";

import MobileLayout from "@/layout/MobileLayout.vue";
import DesktopLayout from "@/layout/DesktopLayout.vue";
import BottomAlert from "@/components/alert/BottomAlert.vue";
import Notification from "@/screen/Notification.vue";
import { storeToRefs } from "pinia";
import TopBarVue from "../../layout/desktop/TopBar.vue";

// Inject your store
const store = inject("store");
const { mobile } = useDisplay();

// A dynamic key to force a re-render of components
const refreshKey = ref(0);
const refreshDesktopKey = ref(0);

const refreshPage = () => {
  refreshKey.value++;
  refreshDesktopKey.value++;
  // Increment the key to trigger re-render
};

// Method to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This will animate the scroll
  });
};

onMounted(async () => {
  await store.jupyterStore.fetchUser();
  await store.labStore.fetchPath();
  await store.jupyterStore.checkConnection();
});
</script>
