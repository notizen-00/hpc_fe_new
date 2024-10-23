<template>
  <v-layout class="rounded-xl">
    <v-app-bar density="prominent" class="rounded-b-xl">
      <template v-slot:prepend>
        <!-- <v-avatar color="black" size="large">
          <span class="text-h5">{{
            getUser.name.slice(0, 2).toUpperCase()
          }}</span>
        </v-avatar> -->
        <Profile></Profile>
      </template>
      <v-app-bar-title>
        <span class="text-black text-md absolute top-4">{{
          getUser.name
        }}</span>
        <br />
        <span class="text-black text-sm absolute bottom-17">{{
          getUser.email
        }}</span>
        <br />

        <ip-check></ip-check>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn
          absolute
          class="-top-8"
          icon
          color="gray"
          variant="tonal"
          @click.prevent=""
        >
          <v-icon>fa-duotone fa-bell</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="w-full mt-24">
      <slot name="default" />
    </div>
  </v-layout>
</template>
<script setup>
import Profile from "@/components/Profile.vue";
import { storeToRefs } from "pinia";
import { ref, reactive, inject, onMounted } from "vue";
import IpCheck from "@/components/IpCheck.vue";
const store = inject("store");
const { getUser, isLogin, getToken, getError, getSnackbar } = storeToRefs(
  store.authStore
);
</script>
