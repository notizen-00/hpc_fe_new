<template>
  <div>
    <v-list lines="two" class="text-start">
      <v-list-subheader>List Notification</v-list-subheader>

      <v-list-item
        variant="tonal"
        color="primary"
        class="bg-primary"
        v-for="(item, i) in getNotification"
        :key="i"
      >
        <template v-slot:prepend>
          <v-icon icon="fa-duotone fa-list"></v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle
          >{{ item.subtitle }}

          <div class="d-flex mt-3">
            <v-divider
              color="success"
              class="border-red bg-success"
              thickness="5"
            ></v-divider></div
        ></v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup>
import { inject, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = inject("store");

const { getNotification } = storeToRefs(store.notificationStore);


</script>
