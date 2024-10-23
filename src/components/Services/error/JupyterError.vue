<template>
  <div class="bg-white h-screen">
    <v-empty-state
      headline="Whoops, 404"
      v-if="getError.status == 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    ></v-empty-state>
    <v-empty-state
      headline="Forbidden"
      v-if="getError.status == 403"
      title="You don't have permission to access this page"
      text="Check your vpn connection or contact IT Support !"
      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnSwOTsaCOyciwjdZsQuY0mIOq3dXwxlLfsg&s"
    ></v-empty-state>
    <v-empty-state
      headline="Server Error"
      v-if="getError.status == 500"
      title="Server Maintenance in Progress"
      text="We are currently performing scheduled maintenance. Please be patient as we work to improve our services."
      image="https://cdn-icons-png.flaticon.com/512/16783/16783835.png"
    >
      <template #footer>
        <p>
          If the issue persists, please check your VPN connection or contact IT
          Support for assistance.
        </p>
        <p>Thank you for your understanding!</p>
        <p>We apologize for any inconvenience this may cause.</p>
      </template>
    </v-empty-state>
    <v-empty-state
      headline="Disconnected "
      v-else
      title="Check your vpn connection"
      text="Check your vpn connection or contact IT Support !"
      image="https://cdn-icons-png.flaticon.com/512/16783/16783835.png"
    >
      <template #footer>
        <p>
          If the issue persists, please check your VPN connection or contact IT
          Support for assistance.
        </p>
        <p>Thank you for your understanding!</p>
        <p>We apologize for any inconvenience this may cause.</p>
      </template>
    </v-empty-state>
  </div>
</template>
<script setup>
import { inject } from "vue";
import { storeToRefs } from "pinia";

const store = inject("store");

const { getError } = storeToRefs(store.jupyterStore);
</script>
